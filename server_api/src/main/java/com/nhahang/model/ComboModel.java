package com.nhahang.model;

public class ComboModel {
	private Integer comboID;
	private String comboName;
	private Long comboPrice;
	private String description;
	private Integer quantity;
	
	
	
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Integer getComboID() {
		return comboID;
	}
	public void setComboID(Integer comboID) {
		this.comboID = comboID;
	}
	public String getComboName() {
		return comboName;
	}
	public void setComboName(String comboName) {
		this.comboName = comboName;
	}
	public Long getComboPrice() {
		return comboPrice;
	}
	public void setComboPrice(Long comboPrice) {
		this.comboPrice = comboPrice;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}	
}
