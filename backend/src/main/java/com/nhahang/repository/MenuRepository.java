package com.nhahang.repository;


import java.util.List;

import com.nhahang.model.CateModel;
import com.nhahang.model.DishModel;
import com.nhahang.repository.mapping.DishMap;

public class MenuRepository {
	public CateModel getItemWithCata()
	{
		CateModel c= new CateModel();
		DishMap d= new DishMap();
		String sql= "Select * from Item where category= ? and itemStatus='normal' ";
		List<DishModel> result=GeneralConnect.select(sql, d, 0);
		if(result.isEmpty() !=true)
		{
			for(DishModel j: result)
			{
				j.setDishInCombo(getItemInCombo(j.getID()));
			}
		}
		c.setCombo(result);
		c.setAppetizer(GeneralConnect.select(sql, d, 1));
		c.setMainCourse(GeneralConnect.select(sql, d, 2));
		c.setDessert(GeneralConnect.select(sql, d, 3));
		c.setDrinks(GeneralConnect.select(sql, d, 4));
		return c;
	}
	
	public CateModel getAllItemWithCata()
	{
		CateModel c= new CateModel();
		DishMap d= new DishMap();
		String sql= "Select * from Item where category= ? ";
		List<DishModel> result=GeneralConnect.select(sql, d, 0);
		if(result.isEmpty() !=true)
		{
			for(DishModel j: result)
			{
				j.setDishInCombo(getItemInCombo(j.getID()));
			}
		}
		c.setCombo(result);
		c.setAppetizer(GeneralConnect.select(sql, d, 1));
		c.setMainCourse(GeneralConnect.select(sql, d, 2));
		c.setDessert(GeneralConnect.select(sql, d, 3));
		c.setDrinks(GeneralConnect.select(sql, d, 4));
		return c;
	}
	
	public List<DishModel> getActiveItem()
	{
		DishMap d= new DishMap();
		String sql= "Select * from Item where itemStatus='normal' ";
		List<DishModel> result;

		result=GeneralConnect.select(sql, d);
		return result;
	}
	
	public List<DishModel> getItemInCombo(int ComboId)
	{

		DishMap d= new DishMap();
		String sql= "Select * from DishInCombo as t "
				+ "inner join item on item.itemid=t.dishid "
				+ "where comboId = "+ComboId+" and itemStatus='normal'";
		List<DishModel> result=GeneralConnect.select(sql, d);
		return result;
	}
	
	public Integer createItem(DishModel dish)
	{
		String sql= "insert into Item(ItemName, ItemDescr, poster, cost, category) values "
					+"(? ,? ,? ,?,?)";
		return GeneralConnect.insert(sql, dish.getName(), dish.getDescription(), dish.getPoster(), dish.getCost(), dish.getCatagory());
	}
	public void insertIteminCombo(int comboId, List<DishModel> dishes)
	{
		if(dishes==null)
		{
			return;
		}
		else if(dishes.isEmpty())
		{
			return;
		}
		String sql="delete from DishInCombo "
				+ " where comboId=?";
		GeneralConnect.update(sql,comboId);
		
		sql= "insert into DishInCombo(comboID, dishID, quantity) values ";
		for(DishModel i: dishes)
		{
			sql=sql+"("+comboId+" , "+i.getID()+", "+i.getQuantity()+"),";
		}
		sql=sql.substring(0, sql.length()-1);
		GeneralConnect.update(sql);
	}
	
	public void updateDish(DishModel dish)
	{
		String sql="update item "
				+ "set ItemName=?, ItemDescr=?, poster=?, cost=?, category=? "
				+ "where itemId=?";
		GeneralConnect.update(sql, dish.getName(), dish.getDescription(), dish.getPoster(), dish.getCost(), dish.getCatagory(), dish.getID());
	}
	
	public void updateStatus(DishModel dish)
	{
		String sql="update item "
				+ "set ItemStatus=? "
				+ "where itemId=?";
		GeneralConnect.update(sql, dish.getStatus(), dish.getID());
	}
	
}
