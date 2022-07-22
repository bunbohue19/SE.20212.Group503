package com.nhahang.model;

public class CustomerModel {
	private Integer customerId;
	private String phone;
	private String customerName;
	private String customerStatus;
	private Long rankPoint ;
	private Long usablePoint;
	private String rank;
	
	
	
	public Integer getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerStatus() {
		return customerStatus;
	}
	public void setCustomerStatus(String customerStatus) {
		this.customerStatus = customerStatus;
	}
	public Long getRankPoint() {
		return rankPoint;
	}
	public void setRankPoint(Long rankPoint) {
		this.rankPoint = rankPoint;
	}
	public Long getUsablePoint() {
		return usablePoint;
	}
	public void setUsablePoint(Long usablePoint) {
		this.usablePoint = usablePoint;
	}
	public String getRank() {
		return rank;
	}
	public void setRank(String rank) {
		this.rank = rank;
	}
	
}
