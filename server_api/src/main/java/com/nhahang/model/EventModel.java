package com.nhahang.model;

import java.sql.Date;

import java.sql.Timestamp;
import java.util.List;

public class EventModel {
	private Integer eventID;
	private String eventName;
	private String description;
	private Timestamp beginTime;
	private Timestamp endTime;
	private List<DishModel> discount;
	private String status;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getEventID() {
		return eventID;
	}
	public void setEventID(Integer eventID) {
		this.eventID = eventID;
	}
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
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
	public List<DishModel> getDiscount() {
		return discount;
	}
	public void setDiscount(List<DishModel> discount) {
		this.discount = discount;
	}
	
}


