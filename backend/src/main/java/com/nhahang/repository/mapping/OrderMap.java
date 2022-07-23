package com.nhahang.repository.mapping;

import java.sql.ResultSet;

import com.nhahang.model.OrderModel;

public class OrderMap implements GeneralMap<OrderModel>{
	@Override
	public OrderModel map(ResultSet s) {
		try {
			OrderModel order= new OrderModel();
			order.setOrderID(s.getInt("OrderID"));
			order.setPhone(s.getString("phone"));
			order.setReservedTime(s.getTimestamp("ReservedTime"));
			order.setTotalCost(s.getLong("totalCost"));
			order.setStatus(s.getString("orderStatus"));
			order.setDiscount(s.getInt("discount"));
			order.setPaidPoint(s.getLong("paidPoint"));
			order.setEventId((Integer) s.getObject("eventId"));
			return order;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
	}

}
