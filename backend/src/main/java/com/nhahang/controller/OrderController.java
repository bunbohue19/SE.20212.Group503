package com.nhahang.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nhahang.model.OrderModel;
import com.nhahang.service.OrderService;

@RestController
public class OrderController {
	private OrderService service=new OrderService();
	
	@PutMapping("/order")
	public void createOrder(@RequestBody OrderModel OrderInput)
	{
		int a= service.InsertOrder(OrderInput);
	}
	
	//http:localhost:8081/order Get
	@GetMapping("/order")
	public List<OrderModel> getOrder()
	{
		return service.getOrder();
	}
	
	@GetMapping("/order/all")
	public List<OrderModel> getAllOrder()
	{
		return service.getAllOrder();
	}
	
	@PostMapping("/order")
	public void updateOrder(@RequestBody OrderModel OrderInput)
	{
		service.updateOrder(OrderInput);
	}

	@DeleteMapping("/order")
	public void deleteOrder(@RequestBody OrderModel OrderInput)
	{
		service.updateOrderStatus(OrderInput);
	}
}
