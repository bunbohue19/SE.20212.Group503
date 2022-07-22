package com.nhahang.service;

import java.util.List;

import com.nhahang.model.CateModel;
import com.nhahang.model.DishModel;
import com.nhahang.repository.GeneralConnect;
import com.nhahang.repository.MenuRepository;
import com.nhahang.repository.mapping.DishMap;


public class MenuService {
	MenuRepository connect= new MenuRepository();
	
	public CateModel getItemWithCata()
	{
		return connect.getItemWithCata();
	}
	
	public CateModel getAllItemWithCata()
	{
		return connect.getAllItemWithCata();
	}
	
	public List<DishModel> getActiveItem()
	{
		return connect.getActiveItem();
	}
	
	public void createItem(DishModel dish)
	{
		int i=connect.createItem(dish);
		if(dish.getCatagory()==0)
		{
			connect.insertIteminCombo(i, dish.getDishInCombo());
		}
	}
	
	public void updateItem(DishModel dish)
	{
		connect.updateDish(dish);
		if(dish.getCatagory()==0)
		{
			connect.insertIteminCombo(dish.getID(), dish.getDishInCombo());
		}
	}
	
	public void updateStatus(DishModel dish)
	{
		connect.updateStatus(dish);
	}
}
