package com.nhahang.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nhahang.model.CateModel;
import com.nhahang.model.DishModel;
import com.nhahang.service.MenuService;

@RestController
public class MenuController {
	MenuService service = new MenuService();
	
	@GetMapping("/menu")
	public CateModel getmenu()
	{
		return service.getItemWithCata();
	}
	
	@GetMapping("/menu/all")
	public CateModel getAllMenu()
	{
		return service.getAllItemWithCata();
	}
	
	@GetMapping("/menu/order")
	public List<DishModel> getOrderMenu()
	{
		return service.getActiveItem();
	}
	
	@PutMapping("/menu")
	public void createItem(@RequestBody DishModel dish)
	{
		service.createItem(dish);
	}
	
	@PostMapping("/menu")
	public void updateItem(@RequestBody DishModel dish)
	{
		service.updateItem(dish);
	}
	
	@DeleteMapping("/menu")
	public void deleteItem(@RequestBody DishModel dish)
	{
		service.updateStatus(dish);
	}
}
