package com.nhahang.model;

import java.sql.Date;

import java.sql.Timestamp;
import java.util.List;

public class EventModel {
	private Integer id;
	private String 	name;
	private String description;
	private Timestamp beginTime;
	private Timestamp endTime;
	private List<DiscountModel> discount;
	private String status;
	private String poster;
	
	
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Timestamp getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(Timestamp beginTime) {
		this.beginTime = beginTime;
	}
	public Timestamp getEndTime() {
		return endTime;
	}
	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}
	public List<DiscountModel> getDiscount() {
		return discount;
	}
	public void setDiscount(List<DiscountModel> discount) {
		this.discount = discount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	

}


