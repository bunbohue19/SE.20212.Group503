If not exists(select name from master.sys.sql_logins where name= 'MyLogin')
CREATE LOGIN MyLogin WITH PASSWORD = '123';
go

create database Restaurant
go

use Restaurant
go

create user Group3 for login MyLogin
Grant control on  DATABASE::restaurant to Group3
GO


create table Customer (
	customerID int IDENTITY(1,1) unique,
	phone varchar(10) PRIMARY KEY,
	customerName varchar(30),
	customerStatus varchar(20) default 'normal',
	rankPoint bigint default 0,
	usablePoint bigint default 0,
	rank varchar(10) default 'Bronze'
);


create table Tble (
	tableID int IDENTITY(1,1) PRIMARY KEY,
	numSeats int,
	tableName varchar(10),
	tableStatus varchar(25) default 'free' -- free, busy, cancel, booking
);

create table Event (
	eventID int IDENTITY(1,1) PRIMARY KEY,
	eventName varchar(30),
	eventDescr varchar(200),
	eventStatus varchar(20) DEFAULT 'active',
	poster VARCHAR(1024),
	beginTime datetime,
	endTime datetime
);

create table Orders (
	orderID int IDENTITY(1,1) PRIMARY KEY,
	reservedTime datetime,
	totalCost bigInt default 0,
	phone varchar(10) FOREIGN KEY references Customer(phone),
	eventId int FOREIGN KEY references event(eventID),
	discount int default 0,
	paidPoint bigint default 0,
	orderStatus varchar(20) 
);

create table Item (
	ItemID int IDENTITY(1,1) primary key,
	ItemName varchar(30),
	ItemDescr varchar(100),
	poster VARCHAR(2000),
	ItemStatus varchar(20) default 'normal', 
	cost bigint,
	category int not null
);


create table DishInCombo (
	comboID int FOREIGN KEY references Item(ItemID),
	dishID int FOREIGN KEY references Item(ItemID),
	quantity int
	constraint PK_DishInCombo PRIMARY KEY (comboID, dishID)
);



create table ItemInOrder (
	orderID int FOREIGN KEY references Orders(orderID),
	ItemID int FOREIGN KEY  references Item(itemID) ,
	quantity int,
	constraint PK_DishInOrder PRIMARY KEY (orderID, itemID)
);


create table TablesInOrder (
	orderID int FOREIGN KEY references Orders(orderID),
	tableID int FOREIGN KEY references Tble(tableID),
	constraint PK_TablesInOrder PRIMARY KEY (orderID, tableID)
);


create table Discount (
	eventID int FOREIGN KEY references Event(eventID),
	rank varchar(10),
	discount int,
	constraint PK_Discount PRIMARY KEY (eventID, rank)
);
go


insert into Event(eventName, eventDescr, beginTime, endTime)
values ('nam', 'aaaaaaa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
go


insert into item(ItemName, ItemDescr, cost , category)
values ('rice', 'aaaaaaa', 5, 1),
('noodle', 'aaaaaaa', 6, 1),
('soup', 'aaaaaaa', 7, 2),
('pho', 'aaaaaaa', 8, 2),
('banh my', 'aaaaaaa', 9, 3),
('combo 1', 'aaaaaaa', 10, 0)
go

-- tu dong update rank cau customer
create trigger updateRank
on customer
for update
as
begin
	declare @point bigint, @id int 
	select @point= t.rankPoint, @id=t.phone from inserted as t
	if @point <10000000
		update Customer
		set rank='Bronze'
		where phone= @id
	else if @point < 30000000
		update Customer
		set rank='Silver'
		where phone= @id
	else if @point < 50000000
		update Customer
		set rank='Gold'
		where phone= @id
	else if @point>= 50000000
		update Customer
		set rank='Diamond'
		where phone= @id
end 
go


insert into Customer(phone, customerName)
values ('11112222','nam'),
('11112223','nhung'),
('11112224','hai'),
('11112225','sy'),
('11112226','loc'),
('11112227','dung'),
('11112228','huong'),
('11112229','thang')
go

--tu dong set discount cua order
create trigger setDiscount
on orders
for insert, update
As
begin 
	declare @phone int,@event int, @rank varchar(10), @order int, @point bigint, @total bigint, @totalPoint bigint, @status varchar(10)
	select @order= orderID, @phone=phone, @event= eventId, @point= paidPoint, @total=totalCost from inserted
	select @rank= rank, @totalPoint=usablePoint from Customer where phone= @phone
	select @status=eventStatus from Event
	if(@point is null or @totalPoint is null)
			select @point=0	
	else if(@totalPoint>=@total and @point>@total)
		select @point=@total
	else if(@totalPoint<@total and @point>@totalPoint)
		begin
			select @point= @totalPoint
		end 

	update orders
	set discount= (select discount from Discount where rank=@rank and eventId=@event),
		paidPoint=@point
	where orderID= @order
end
go

insert into Discount(eventID, rank, discount)
values (1, 'Bronze', 5),
(1, 'Silver', 10),
(1, 'Gold',15),
(1, 'Diamond', 20)
go

--set status and point cost
create trigger setPoint
on orders
for update
as
begin 
	declare @oldStatus varchar(20), @newStatus varchar(20), @total bigint, @point bigint, @phone varchar(10),
			@percent float, @rank varchar(20), @order int

	select top 1 @total=totalCost, @point=paidPoint, @newStatus=orderStatus, 
				@phone=phone, @order=orderID from inserted
	select top 1 @oldStatus= orderStatus from deleted
	select @rank=rank from Customer
	if @rank= 'Bronze'
		select @percent= 0.1
	else if @rank='Silver'
		select @percent= 0.15
	else if @rank='Gold'
		select @percent= 0.20
	else if @rank='Diamond'
		begin
		select @percent= 0.25
		end

	if @oldStatus='waiting' and @newStatus='paid' and @phone is not null
		begin
		update Customer
		set  usablePoint=usablePoint - @point+(@total-@point)*@percent,
		rankPoint=rankPoint+(@total-@point)*@percent
		where phone=@phone

		update Orders
		set reservedTime=CURRENT_TIMESTAMP
		where orderID=@order
		end
end
go
-- set status and point initial IN order
create trigger setOrder
on orders
for insert
as
begin 
	declare @order int, @time datetime
	select top 1 @order =orderID, @time= reservedTime from inserted
	update orders
	set 
		orderStatus=case when @time is null then 'waiting' else 'booking' end
	where orderID= @order
end
go

insert into orders(phone, eventId)
values ('11112222', 1)
go
insert into orders(phone, eventId)
values('11112222', null)
go
insert into orders(phone, eventId)
values(null, 1)
go
-- tu dong cap nhat total order
create trigger totalOrder
on iteminorder
for insert, update
As
begin 
	update Orders
	set totalCost= (select sum(t.quantity*Item.cost) from 
					(select * from ItemInOrder where orderid in (select top 1 orderid from inserted)) as t
					inner join Item on t.ItemID=Item.ItemID			
					group by t.orderID)
	where orderID in (select top 1 orderid from inserted)
end 
go

insert into ItemInOrder(orderID, ItemID, quantity)
values(1, 1, 2),
(1, 2, 1),
(1,4, 3)
go


insert into Tble(tableName, numSeats)
values('A0', 4),
('A1', 5),
('B0', 6),
('B1', 4),
('C0', 6)
go
--tu dong set trang thai table
create trigger updateTableStatus
on tablesInOrder
for insert
as
begin
	declare @orderStatus varchar(20)
	select @orderStatus= orderStatus from orders where orderID= (select top 1 orderID from inserted)
	if @orderStatus='waiting'
		update Tble 
		set tableStatus='busy'
		where tableID in (select tableID from inserted)
	else if @orderStatus='booking'
		update Tble 
		set tableStatus='booking'
		where tableID in (select tableID from inserted)
end
go
--
create trigger updateTableDelete
on tablesInOrder
for delete
as
begin
	update Tble 
	set tableStatus='free'
	where tableID in (select tableID from deleted) and tableStatus != 'cancel'
end
go
insert into TablesInOrder(orderID, tableID)
values (1, 1),
(1,2),
(1,3)
go
-- free table khi tra tien hoac huy don, thay doi trang thai ban tu book sang busy 
create trigger changeTable
on orders
for update
as
begin 
	declare @oldStatus varchar(20), @newStatus varchar(20), @order int
	select top 1 @newStatus=orderStatus, @order= orderID from inserted
	select top 1 @oldStatus= orderStatus from deleted
	if (@oldStatus='waiting' or @oldStatus='booking') and (@newStatus='paid' or @newStatus='cancel') 
		update Tble
		set tableStatus='free'
		where tableID in (select tableID from TablesInOrder where orderID=@order)
	else if @newStatus='waiting' or @oldStatus='booking'
		update Tble
		set tableStatus='busy'
		where tableID in (select tableID from TablesInOrder where orderID=@order)
end
go

insert into DishInCombo(comboID, dishID, quantity)
values(6,1,1),
(6, 3, 2),
(6, 5, 3)


