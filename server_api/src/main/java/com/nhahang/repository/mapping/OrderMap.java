package com.nhahang.repository.mapping;

import java.sql.ResultSet;

import com.nhahang.model.OrderModel;

public class OrderMap implements GeneralMap<OrderModel>{
	@Override
	public OrderModel map(ResultSet s) {
		try {
			OrderModel order= new OrderModel();
			order.setOrderID(s.getInt("OrderID"));
			order.setCustomerName(s.getString("CustomerName"));
			order.setPhone(s.getString("phone"));
			order.setCustomerID(s.getInt("CustomerID"));
			order.setReservedTime(s.getTimestamp("ReservedTime"));
			//order.setTotalPay(s.getLong("totalpay"));
			order.setTotalPrice(s.getLong("totalCost"));
			/*if(order.getTotalPay()==null)
			{
				order.setCharge(order.getTotalPay()-order.getTotalPrice());
			}*/
			return order;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
	}

}
