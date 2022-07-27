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
	phone varchar(15) PRIMARY KEY,
	customerName varchar(30),
	customerStatus varchar(20) default 'normal',
	rankPoint bigint default 0,
	usablePoint bigint default 0,
	rank varchar(10) default 'Bronze'
);


create table Tble (
	tableID int IDENTITY(1,1) PRIMARY KEY,
	numSeats int,
	tableName varchar(30),
	tableStatus varchar(25) default 'free' -- free, busy, cancel, booking
);

create table Event (
	eventID int IDENTITY(1,1) PRIMARY KEY,
	eventName varchar(30),
	eventDescr varchar(2000),
	eventStatus varchar(20) DEFAULT 'active',
	poster VARCHAR(2000),
	beginTime datetime,
	endTime datetime
);

create table Orders (
	orderID int IDENTITY(1,1) PRIMARY KEY,
	reservedTime datetime,
	totalCost bigInt default 0,
	phone varchar(15) FOREIGN KEY references Customer(phone),
	eventId int FOREIGN KEY references event(eventID),
	discount int default 0,
	paidPoint bigint default 0,
	orderStatus varchar(20) 
);

create table Item (
	ItemID int IDENTITY(1,1) primary key,
	ItemName varchar(30),
	ItemDescr varchar(2000),
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


insert into Event(eventName, eventDescr, beginTime, endTime, poster)
values ('Summer Event', 'As the long and hard school and work year comes to an end, it’s time to celebrate!', '2022-07-24 08:37:41.823', '2022-07-28 08:37:41.823'
, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2Fistockphoto-1183153837-170667a.jpg?alt=media&token=348c6eee-4e0e-4159-bcfe-a007455cb29a')
go


insert into item(ItemName, ItemDescr, cost , category, poster)
values ('fried rice', 'a dish of cooked rice that has been stir-fried and
mixed with other eggs, vegetables, seafood, or meat', 25000, 2, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2Fimage8-1607667365-730-width640height450.jpg?alt=media&token=545bf0de-58eb-42ba-ac48-0f3e9e8c2832'),
('pizza', 'dish of Italian that consisting of a flattened disk of bread dough 
topped with combination of olive oil, oregano, tomato, olives and cheese', 100000, 1, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2FVeggie-mania.jpg?alt=media&token=dd11f963-fdd1-4db3-a292-2bb2460ba970'),
('soup', 'liquid food that served warm or hot is made by 
combining ingredients of meat or vegetables with stock, milk, or water', 30000, 1, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2FHungarian_goulash_soup.jpg?alt=media&token=f6f78754-0764-4fea-9fde-79741c69847c'),
('pho', 'pho is a Vietnamese soup dish consisting of broth, rice noodles, herbs, and beef', 50000, 2, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2Ffile_anh__1325.jpg?alt=media&token=727c7123-be98-4df1-9f8d-86e1ee4c2126'),
('banh my', 'A typical Vietnamese sandwich is a fusion of 
cha lua (pork sausage), coriander leaf (cilantro), cucumber, pickled carrots,
and pickled daikon combined with condiments from French cuisine such as pâté, along with red chili and buttery mayonnaise', 20000, 3, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2FBanhMi_NgonVietnam01-1200x750.jpg?alt=media&token=a567aeb4-d3d9-4ac6-a6f5-94d60453153c'),
('ice cream','ice cream is made from milk and is flavoured with sugar, vanilla, strawberries and peaches', 20000, 3, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2FStrawberry-IceCream-590x436.jpg?alt=media&token=4814aa01-b970-4495-92b1-86ddea1bd891'),
('egg coffee','A Vietnamese drink traditionally prepared with egg yolks, sugar, condensed milk and robusta coffee. 
The drink is made by beating egg yolks with sugar and coffee, then extracting the coffee into the half of the cup',30000,4, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2FP2136752.jpg?alt=media&token=3657dccf-51a2-4d63-b5a3-04fd61d44348'),
('watermelon juice','It’s sweet and juicy, making it the perfect treat to quench your thirst during the summer heat.',20000,4, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2Fwatermelon-juice.jpg?alt=media&token=38dcfe23-c71f-4256-8398-50bd46db18dc'),
('Vietnamese famous dishes', 'Vietnamese food is known to be both healthy and robust in flavour, thanks its generous combination of fresh herbs and greens, paired with rice, noodles, seafood, pork and beef. 
This combo contain the most typical Vietnamese dishes', 100000, 0, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2F74601400.jpg?alt=media&token=1f8bd1d2-d3e1-40d2-81f4-05edb14e3305'),
('Family combo','A combo can satisfy every one in your family', 100000, 0, 'https://firebasestorage.googleapis.com/v0/b/se20212group503.appspot.com/o/images%2F74601400.jpg?alt=media&token=1f8bd1d2-d3e1-40d2-81f4-05edb14e3305')
go

insert into DishInCombo(comboID, dishID, quantity)
values(9,3,1),
(9, 4, 1),
(9, 5, 1),
(9, 7,1),
(10,1,1),
(10, 2,1),
(10, 6,1),
(10, 8,1)
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
values ('0367887880','nam'),
('0857778492','nhung'),
('0377911227','hai'),
('0823573386','sy'),
('0906253364','loc'),
('0961345234','dung'),
('0368668113','huong'),
('0338952133','thang')
go

--tu dong set discount cua order
create trigger setDiscount
on orders
for insert, update
As
begin 
	declare @phone varchar(15),@event int, @rank varchar(10), @order int, @point bigint, @total bigint, @totalPoint bigint, @status varchar(10)
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
	declare @oldStatus varchar(20), @newStatus varchar(20), @total bigint, @point bigint, @phone varchar(15),
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
values ('0338952133', 1)
go
insert into orders(phone, eventId)
values('0857778492', null)
go
insert into orders(phone, eventId)
values(null, 1)
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
insert into ItemInOrder(orderID, ItemID, quantity)
values(2, 9, 1)
go
insert into ItemInOrder(orderID, ItemID, quantity)
values(3, 10, 1)
go
insert into ItemInOrder(orderID, ItemID, quantity)
values(4, 9, 1),
(4, 8, 1)
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
(1,2)

go
insert into TablesInOrder(orderID, tableID)
values(2,3),
(2, 4) 

go
insert into TablesInOrder(orderID, tableID)
values(3, 5)
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



