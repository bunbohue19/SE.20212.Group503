package com.nhahang.model;

import java.sql.Timestamp;
import java.util.List;

public class OrderModel {
	private Integer orderID;
	private String phone;
	private Integer eventId;
	private Integer discount;
	private Timestamp reservedTime;
	private Long totalCost;
	private String status; 
	private Long paidPoint;
	private List<TableModel> tables;
	private List<DishModel> dishes;
	public Integer getOrderID() {
		return orderID;
	}
	public void setOrderID(Integer orderID) {
		this.orderID = orderID;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Integer getEventId() {
		return eventId;
	}
	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}
	public Integer getDiscount() {
		return discount;
	}
	public void setDiscount(Integer discount) {
		this.discount = discount;
	}
	public Timestamp getReservedTime() {
		return reservedTime;
	}
	public void setReservedTime(Timestamp reservedTime) {
		this.reservedTime = reservedTime;
	}
	public Long getTotalCost() {
		return totalCost;
	}
	public void setTotalCost(Long totalCost) {
		this.totalCost = totalCost;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Long getPaidPoint() {
		return paidPoint;
	}
	public void setPaidPoint(Long paidPoint) {
		this.paidPoint = paidPoint;
	}
	public List<TableModel> getTables() {
		return tables;
	}
	public void setTables(List<TableModel> tables) {
		this.tables = tables;
	}
	public List<DishModel> getDishes() {
		return dishes;
	}
	public void setDishes(List<DishModel> dishes) {
		this.dishes = dishes;
	}
	
	
	


}
