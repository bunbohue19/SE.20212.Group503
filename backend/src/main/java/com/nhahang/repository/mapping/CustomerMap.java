package com.nhahang.repository.mapping;

import java.sql.ResultSet;

import com.nhahang.model.CustomerModel;

public class CustomerMap implements GeneralMap<CustomerModel>{
	@Override
	public CustomerModel map(ResultSet s) {
		try {
			CustomerModel customer= new CustomerModel();
			customer.setCustomerId(s.getInt("customerId"));
			customer.setPhone(s.getString("phone"));
			customer.setCustomerName(s.getString("customerName"));
			customer.setCustomerStatus(s.getString("customerStatus"));
			customer.setRankPoint(s.getLong("rankPoint"));
			customer.setUsablePoint(s.getLong("usablePoint"));
			customer.setRank(s.getString("rank"));
			return customer;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getCause());
			return null;
		}
	}

}
