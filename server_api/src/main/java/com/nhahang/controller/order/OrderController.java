package com.nhahang.controller.order;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nhahang.model.OrderModel;
import com.nhahang.service.OrderService;

@RestController
public class OrderController {
	private OrderService service=new OrderService();
	
	@PutMapping("/order")
	public OrderModel createOrder(@RequestBody OrderInput OrderInput)
	{
		int a= service.InsertEvent(OrderInput);
		return service.getEventById(a);
	}
	
	//http:localhost:8081/order Get
	@GetMapping("/order")
	public List<OrderModel> getOrder()
	{
		return service.getOrder();
	}
	
	//lay max discount of event 
	//post /order update
	//get /order/dishes
	//get 
	
}
