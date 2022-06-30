package com.nhahang.repository.mapping;

import java.sql.ResultSet;

import com.nhahang.model.CustomerModel;

public class CustomerMap implements GeneralMap<CustomerModel>{
	@Override
	public CustomerModel map(ResultSet s) {
		try {
			CustomerModel customer= new CustomerModel();
			customer.setCustomerID(s.getInt("customerID"));
			customer.setCustomerName(s.getString("customername"));
			customer.setEmail(s.getString("email"));
			customer.setPhone(s.getString("phone"));
			customer.setPoint(s.getLong("point"));
			
			return customer;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getCause());
			return null;
		}
	}

}
