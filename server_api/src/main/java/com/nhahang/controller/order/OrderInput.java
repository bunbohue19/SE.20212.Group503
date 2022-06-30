package com.nhahang.controller.order;

import java.util.List;

import com.nhahang.model.ComboModel;
import com.nhahang.model.DishModel;
import com.nhahang.model.TableModel;

public class OrderInput {
	private String CustomerName;
	private String phone;
	private List<TableModel> Tables;
	private List<DishModel> Dishes;
	private List<ComboModel> Combo;
	public String getCustomerName() {
		return CustomerName;
	}
	public void setCustomerName(String customerName) {
		CustomerName = customerName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public List<TableModel> getTables() {
		return Tables;
	}
	public void setTables(List<TableModel> tables) {
		Tables = tables;
	}
	public List<DishModel> getDishes() {
		return Dishes;
	}
	public void setDishes(List<DishModel> dishes) {
		Dishes = dishes;
	}
	public List<ComboModel> getCombo() {
		return Combo;
	}
	public void setCombo(List<ComboModel> combo) {
		Combo = combo;
	}
	
	

	
}
