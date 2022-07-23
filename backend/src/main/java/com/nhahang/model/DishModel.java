package com.nhahang.model;

import java.util.List;

public class DishModel{
	private Integer ID;
	private String Name;
	private Long Cost;
	private String description;
	private Integer quantity;
	private String status;
	private String poster;
	private Integer catagory;
	private List<DishModel> dishInCombo;
	
	
	
	public List<DishModel> getDishInCombo() {
		return dishInCombo;
	}
	public void setDishInCombo(List<DishModel> dishInCombo) {
		this.dishInCombo = dishInCombo;
	}
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	public Integer getCatagory() {
		return catagory;
	}
	public void setCatagory(Integer catagory) {
		this.catagory = catagory;
	}
	public Integer getID() {
		return ID;
	}
	public void setID(Integer ID) {
		this.ID = ID;
	}
	public String getName() {
		return Name;
	}
	public void setName(String dishName) {
		this.Name = dishName;
	}
	public Long getCost() {
		return Cost;
	}
	public void setCost(Long cost) {
		Cost = cost;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}


	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	

	
}
