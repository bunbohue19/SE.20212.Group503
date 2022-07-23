package com.nhahang.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nhahang.model.CustomerModel;
import com.nhahang.service.CustomerService;

@RestController
public class CustomerController {
	CustomerService service= new CustomerService();
	
	@PutMapping("/customer")
	public void createcustomer(@RequestBody CustomerModel customer)
	{
		service.createCustomer(customer);
	}
	
	@PostMapping("/customer")
	public void updatecustomer(@RequestBody CustomerModel customer)
	{
		service.UpdateCustomer(customer);
	}
	
	@GetMapping("/customer")
	public List<CustomerModel> getcustomer()
	{
		return service.getAllCustomer();
	}
	
	@GetMapping("/customer/active")
	public List<CustomerModel> getFreecustomer()
	{
		return service.getNormalCustomer();
	}
	
	@DeleteMapping("/customer")
	public void deletecustomer(@RequestBody CustomerModel customer)
	{
		service.deleteCustomer(customer);
	}

}
