package com.nhahang.service;

import java.util.List;

import com.nhahang.model.EmployeeModel;
import com.nhahang.repository.GeneralConnect;
import com.nhahang.repository.mapping.EmployeeMap;

public class AccountService {
	
	private static EmployeeModel checkID(int id)
	{
		EmployeeMap m=new EmployeeMap();
		String sql="select * from Employee where eid= ?";
		List<EmployeeModel> result;
		result=GeneralConnect.select(sql, m, id);
		if(result.isEmpty())
		{
			return null;
		}
		else
		{
			return result.get(0);
		}
	}
	
	public static int check(int id, String password) {
		
		EmployeeModel account=checkID(id);
		if(account!=null)
		{
			if(account.getPassword().equals(password))
			{
				return 0;
			}
			else
			{
				return 1;
			}
		}
		return -1;
	}

}
