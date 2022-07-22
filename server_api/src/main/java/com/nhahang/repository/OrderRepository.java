package com.nhahang.repository;

import java.util.List;


import com.nhahang.model.DishModel;
import com.nhahang.model.OrderModel;
import com.nhahang.model.TableModel;
import com.nhahang.repository.mapping.DishMap;
import com.nhahang.repository.mapping.OrderMap;
import com.nhahang.repository.mapping.TableMap;

public class OrderRepository {
	public List<OrderModel> getOrders()
	{
		OrderMap m=new OrderMap();
		String sql="select * from Orders where orderStatus= 'waiting'";
		List<OrderModel> result= GeneralConnect.select(sql, m);
		return result;
	}
	
	public List<OrderModel> getAllOrders()
	{
		OrderMap m=new OrderMap();
		String sql="select * from Orders ";
		List<OrderModel> result= GeneralConnect.select(sql, m);
		return result;
	}
	
	public OrderModel getOrderById(int orderId)
	{
		OrderMap m=new OrderMap();
		String sql="select * from Orders where OrderID = ? and orderStatus= 'waiting'";
		List<OrderModel> result= GeneralConnect.select(sql, m, orderId);
		if(result.isEmpty())
		{
			return null;
		}
		return result.get(0);
	}
	
	public List<DishModel> getItemInOrder(int orderId)
	{
		DishMap n=new DishMap();
		String sql = "select * from (select * from ItemInOrder where orderid= ? ) as s"
				    +" inner join Item on s.itemId= Item.ItemId";
		List<DishModel> result=GeneralConnect.select(sql, n,orderId);
		return result;
	}
	
	public List<TableModel> getTableInOrder(int orderId)
	{
		String sql = "select * from (select * from TablesInOrder where orderid= ? ) as s "
				+ "inner join Tble on tble.tableid= s.tableid";
		TableMap t= new TableMap();
		List<TableModel> result=GeneralConnect.select(sql, t,orderId);
		return result;
	}


	
	public Integer insertOrders(OrderModel order)
	{
		//them employee sau nay
		String sql="Insert into Orders(phone, reservedTime) "
				+ "values (?, ?)";
		Integer result=GeneralConnect.insert(sql, order.getPhone(), order.getReservedTime());
		return result;
	}
	
	public void  updateOrders(OrderModel order)
	{
		String sql="Update Orders "
				+ "set eventId=?, phone=?, reservedTime = ?, paidPoint= ? "
				+"where orderId=? ";
		GeneralConnect.update(sql,order.getEventId(), order.getPhone() ,order.getReservedTime(), 
						 order.getPaidPoint(),order.getOrderID());
	}
	
	public void  updateOrdersStatus(OrderModel order)
	{
		String sql="Update Orders "
				+ "set orderStatus= ? "
				+"where orderId=? ";
		GeneralConnect.update(sql, order.getStatus() ,order.getOrderID());
	}
	
	public void insertItemInOrder(int orderId, List<DishModel> dish)
	{
		if(dish==null)
		{
			return;
		}
		else if(dish.isEmpty())
		{
			return;
		}
		String sql="delete from ItemInOrder"
				+ " where orderId=?";
		GeneralConnect.update(sql,orderId);
		sql= "insert into ItemInOrder(orderID, itemID, quantity) values ";
		for(DishModel i: dish)
		{
			sql=sql+"("+orderId+" ,"+i.getID()+" ,"+i.getQuantity()+" ),";
		}
		sql=sql.substring(0, sql.length()-1);
		GeneralConnect.insert(sql);

	}
		

	public void insertTablesInOrder(int orderId, List<TableModel> table)
	{
		if(table==null)
		{
			return;
		}
		else if(table.isEmpty())
		{
			return;
		}
		String sql="delete from TablesInOrder"
				+ " where orderId=?";
		GeneralConnect.update(sql,orderId);
		
		sql= "insert into TablesInOrder(orderID, tableID) values ";
		for(TableModel i: table)
		{
			sql=sql+"("+orderId+" , "+i.getTableID()+"),";
		}
		sql=sql.substring(0, sql.length()-1);
		GeneralConnect.insert(sql);

	}
}
