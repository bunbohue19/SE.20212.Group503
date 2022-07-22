package com.nhahang.repository;

import java.util.List;

import com.nhahang.model.CustomerModel;
import com.nhahang.repository.mapping.CustomerMap;

public class CustomerRepository {
	public CustomerModel findCustomerByPhone(String phone)
	{
		String sql = "Select * from Customer where phone= ?";
		CustomerMap c= new CustomerMap();
		List<CustomerModel> result=GeneralConnect.select(sql, c, phone);
		if(result.isEmpty())
		{
			return null;
		}
		return result.get(0);
	}
	
	public List<CustomerModel> getAllCustomer()
	{
		CustomerMap m=new CustomerMap();
		String sql="select * from Customer";
		List<CustomerModel> result= GeneralConnect.select(sql, m);
		return result;
	}
	

	public List<CustomerModel> getActiveCustomer()
	{
		CustomerMap m=new CustomerMap();
		String sql="select * from Customer where customerStatus= 'normal'";
		List<CustomerModel> result= GeneralConnect.select(sql, m);
		return result;
	}
	
	public void createCustomer(CustomerModel c)
	{
		String sql= "insert into Customer(phone, customerName) values "
					+"(? ,?) ";
		GeneralConnect.update(sql, c.getPhone(), c.getCustomerName());
	}
	
	public void updateCustomer(CustomerModel c)
	{
		String sql="update Customer "
					+"set phone= ?, customerName=? "
					+" where customerId= ? ";
		GeneralConnect.update(sql,c.getPhone(), c.getCustomerName() ,c.getCustomerId());
	}
	
	public void deleteCustomer(CustomerModel c)
	{
		String sql="update Customer "
				+"set customerStatus= 'cancel' "
				+" where customerId= ? ";
	GeneralConnect.update(sql,  c.getCustomerId());
	}
	
}
