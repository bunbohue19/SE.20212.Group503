package com.nhahang.repository;

import java.util.List;

import com.nhahang.controller.order.OrderInput;
import com.nhahang.model.ComboModel;
import com.nhahang.model.DishModel;
import com.nhahang.model.OrderModel;
import com.nhahang.model.TableModel;
import com.nhahang.repository.mapping.ComboMap;
import com.nhahang.repository.mapping.DishMap;
import com.nhahang.repository.mapping.OrderMap;
import com.nhahang.repository.mapping.TableMap;

public class OrderRepository {
	public List<OrderModel> getFOrderTable()
	{
		OrderMap m=new OrderMap();
		String sql="select * from FOrder";
		List<OrderModel> result= GeneralConnect.select(sql, m);
		return result;
	}
	
	public OrderModel getFOrderTableById(int orderId)
	{
		OrderMap m=new OrderMap();
		String sql="select * from FOrder where OrderID = ?";
		List<OrderModel> result= GeneralConnect.select(sql, m, orderId);
		if(result.isEmpty())
		{
			return null;
		}
		return result.get(0);
	}
	
	public List<DishModel> getDishInOrder(int orderId)
	{
		DishMap n=new DishMap();
		String sql = "select * from (select * from dishInOrder where orderid= ? ) as s "
				+ "inner join dish on dish.dishid= s.dishid";
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
	
	public List<ComboModel> getComboInOrder(int orderId)
	{
		String sql = "select * from (select * from ComboInOrder where orderid= ? ) as s "
				+ "inner join combo on combo.comboid= s.comboid";
		ComboMap c=new ComboMap();
		List<ComboModel> result=GeneralConnect.select(sql, c,orderId);
		return result;
	}	
	
	public Integer insertFOrderTable(OrderInput order)
	{
		String sql="Insert into FOrder(customerName, phone) "
				+ "values (?, ?)";
		Integer result=GeneralConnect.insert(sql, order.getCustomerName(), order.getPhone());
		return result;
	}
	
	public void insertDishInOrder(int orderId, DishModel dish)
	{
		String sql= "insert into DishInOrder(orderID, dishID, quantity) values "
					+"(?, ? ,?)";
		GeneralConnect.insert(sql,orderId, dish.getdishID(), dish.getQuantity());

	}
	
	
	public void insertComboInOrder(int orderId, ComboModel combo)
	{
		String sql= "insert into ComboInOrder(orderID, comboID, quantity) values "
					+"(?, ? ,?)";
		GeneralConnect.insert(sql,orderId, combo.getComboID(), combo.getQuantity());

	}
	
	public void insertTablesInOrder(int orderId, TableModel table)
	{
		String sql= "insert into TablesInOrder(orderID, tableID) values "
					+"(?, ?)";
		GeneralConnect.insert(sql,orderId, table.getTableID());

	}
}
