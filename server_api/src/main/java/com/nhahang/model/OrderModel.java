package com.nhahang.model;

import java.sql.Timestamp;
import java.util.List;

public class OrderModel {
	private Integer orderID;
	private Integer customerID;
	private String CustomerName;
	private String phone;
	private Timestamp ReservedTime;
	private Long TotalPrice;
	private Long TotalPay;
	private Long Charge;
	private List<TableModel> Tables;
	private List<DishModel> Dishes;
	private List<ComboModel> Combo;
	
	
	public List<ComboModel> getCombo() {
		return Combo;
	}
	public void setCombo(List<ComboModel> combo) {
		Combo = combo;
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
	public Integer getOrderID() {
		return orderID;
	}
	public void setOrderID(Integer orderID) {
		this.orderID = orderID;
	}
	public Integer getCustomerID() {
		return customerID;
	}
	public void setCustomerID(Integer customerID) {
		this.customerID = customerID;
	}
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
	public Timestamp getReservedTime() {
		return ReservedTime;
	}
	public void setReservedTime(Timestamp reservedTime) {
		ReservedTime = reservedTime;
	}
	public Long getTotalPrice() {
		return TotalPrice;
	}
	public void setTotalPrice(Long totalPrice) {
		TotalPrice = totalPrice;
	}
	public Long getTotalPay() {
		return TotalPay;
	}
	public void setTotalPay(Long totalPay) {
		TotalPay = totalPay;
	}
	public Long getCharge() {
		return Charge;
	}
	public void setCharge(Long charge) {
		Charge = charge;
	}

	
}
