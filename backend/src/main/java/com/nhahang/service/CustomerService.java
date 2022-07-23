package com.nhahang.service;

import java.util.List;

import com.nhahang.model.CustomerModel;
import com.nhahang.model.TableModel;
import com.nhahang.repository.CustomerRepository;
import com.nhahang.repository.TableRepository;

public class CustomerService {
	CustomerRepository connect=new CustomerRepository();
	public List<CustomerModel> getAllCustomer()
	{
		return connect.getAllCustomer();
	}
	
	public List<CustomerModel> getNormalCustomer()
	{
		return connect.getActiveCustomer();
	}
	

	public void UpdateCustomer(CustomerModel c)
	{
		connect.updateCustomer(c);
	}
	
	public void createCustomer(CustomerModel c)
	{
		connect.createCustomer(c);
	}
	
	public void deleteCustomer(CustomerModel c)
	{
		connect.deleteCustomer(c);
	}
}
