package com.nhahang.service;

import java.util.List;

import com.nhahang.controller.order.OrderInput;
import com.nhahang.model.ComboModel;
import com.nhahang.model.DishModel;
import com.nhahang.model.EventModel;
import com.nhahang.model.OrderModel;
import com.nhahang.model.TableModel;
import com.nhahang.repository.GeneralConnect;
import com.nhahang.repository.OrderRepository;
import com.nhahang.repository.mapping.ComboMap;
import com.nhahang.repository.mapping.DishMap;
import com.nhahang.repository.mapping.EventMap;
import com.nhahang.repository.mapping.OrderMap;
import com.nhahang.repository.mapping.TableMap;

public class OrderService {
	private OrderRepository connect= new OrderRepository();
	
	public Integer InsertEvent(OrderInput order)
	{
		Integer result =connect.insertFOrderTable(order);

		try
		{
			for(DishModel i: order.getDishes())
			{
				connect.insertDishInOrder(result, i);
			
			}

		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try
		{
			for(ComboModel i: order.getCombo())
			{
				connect.insertComboInOrder(result, i);
			
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try
		{
			for(TableModel i: order.getTables())
			{
				connect.insertTablesInOrder(result, i);
			
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

		
		return result;
	}
	
	public List<OrderModel> getOrder()
	{	
		List<OrderModel> result= connect.getFOrderTable();
		for(OrderModel i: result)
		{
			i.setDishes(connect.getDishInOrder(i.getOrderID()));
			i.setTables(connect.getTableInOrder(i.getOrderID()));
			i.setCombo(connect.getComboInOrder(i.getOrderID()));
		}
		return result;
	}
	
	public OrderModel getEventById(Integer ID)
	{
		OrderModel result= connect.getFOrderTableById(ID);
		if(result==null)
		{
			return null;
		}
		result.setDishes(connect.getDishInOrder(ID));
		result.setTables(connect.getTableInOrder(ID));
		result.setCombo(connect.getComboInOrder(ID));
		return result;
	}
	 
}
