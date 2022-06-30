package com.nhahang.repository.mapping;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.nhahang.model.EmployeeModel;

public class EmployeeMap implements GeneralMap<EmployeeModel>{
	@Override
	public EmployeeModel map(ResultSet s) {
		try {
			EmployeeModel account= new EmployeeModel();
			account.setId(s.getLong("eid"));
			//account.setAddress(s.getString("address"));
			account.setEmail(s.getString("email"));
			//account.setPhone(s.getString("phone"));
			account.setName(s.getString("name"));
			account.setPassword(s.getString("password"));
			//account.setIsManager(s.getBoolean("isManager"));
			return account;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			return null;
		}
	}
}
