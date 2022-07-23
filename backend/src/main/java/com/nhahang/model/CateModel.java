package com.nhahang.model;

import java.util.List;

public class CateModel {
	private List<DishModel> combo;
	private List<DishModel> appetizer;
	private List<DishModel> mainCourse;
	private List<DishModel> dessert;
	private List<DishModel> drinks;
	public List<DishModel> getCombo() {
		return combo;
	}
	public void setCombo(List<DishModel> combo) {
		this.combo = combo;
	}
	public List<DishModel> getAppetizer() {
		return appetizer;
	}
	public void setAppetizer(List<DishModel> appetizer) {
		this.appetizer = appetizer;
	}
	public List<DishModel> getMainCourse() {
		return mainCourse;
	}
	public void setMainCourse(List<DishModel> mainCourse) {
		this.mainCourse = mainCourse;
	}
	public List<DishModel> getDessert() {
		return dessert;
	}
	public void setDessert(List<DishModel> dessert) {
		this.dessert = dessert;
	}
	public List<DishModel> getDrinks() {
		return drinks;
	}
	public void setDrinks(List<DishModel> drinks) {
		this.drinks = drinks;
	}
	
	
}
