package com.nhahang.model;

import java.util.List;

public class DishModel{
	private Integer dishID;
	private String dishName;
	private Long Cost;
	private String description;
	private List<String> category;
	private Integer discount;
	private Integer quantity;
	private String status;
	
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getdishID() {
		return dishID;
	}
	public void setdishID(Integer dishID) {
		this.dishID = dishID;
	}
	public String getdishName() {
		return dishName;
	}
	public void setdishName(String dishName) {
		this.dishName = dishName;
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
	public List<String> getCategory() {
		return category;
	}
	public void setCategory(List<String> category) {
		this.category = category;
	}
	public Integer getDiscount() {
		return discount;
	}
	public void setDiscount(Integer discount) {
		this.discount = discount;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	
}
