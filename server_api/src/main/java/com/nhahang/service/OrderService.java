package com.nhahang.service;

import java.util.List;
import com.nhahang.model.CustomerModel;
import com.nhahang.model.OrderModel;
import com.nhahang.repository.CustomerRepository;
import com.nhahang.repository.EventRepository;
import com.nhahang.repository.OrderRepository;


public class OrderService {
	private OrderRepository connect= new OrderRepository();
	
	public Integer InsertOrder(OrderModel order)
	{	
		CustomerRepository c= new CustomerRepository();
		if(order.getPhone() !=null)
		{
			if (c.findCustomerByPhone(order.getPhone())==null)
			{				
				order.setPhone(null);
			}
		}
		Integer result =connect.insertOrders(order);
		connect.insertTablesInOrder(result, order.getTables());
		return result;
	}
	
	public void updateOrder(OrderModel order)
	{
		EventRepository e= new EventRepository();
		CustomerRepository c= new CustomerRepository();
		if(order.getEventId() != null)
		{
			if(e.getEventById(order.getEventId())== null)
			{
				order.setEventId(null);
			}
		}
		
		if(order.getPhone() !=null)
		{
			if (c.findCustomerByPhone(order.getPhone())==null)
			{				
				order.setPhone(null);
			}
		}

		connect.updateOrders(order);
		connect.insertTablesInOrder(order.getOrderID(), order.getTables());		
		connect.insertItemInOrder(order.getOrderID(), order.getDishes());
		
	}
	
	public void updateOrderStatus(OrderModel order)
	{
		connect.updateOrdersStatus(order);
	}
	
	public List<OrderModel> getOrder()
	{	
		List<OrderModel> result= connect.getOrders();
		for(OrderModel i: result)
		{
			i.setDishes(connect.getItemInOrder(i.getOrderID()));
			i.setTables(connect.getTableInOrder(i.getOrderID()));
		}
		return result;
	}
	
	public List<OrderModel> getAllOrder()
	{	
		List<OrderModel> result= connect.getAllOrders();
		for(OrderModel i: result)
		{
			i.setDishes(connect.getItemInOrder(i.getOrderID()));
			i.setTables(connect.getTableInOrder(i.getOrderID()));
		}
		return result;
	}

}
