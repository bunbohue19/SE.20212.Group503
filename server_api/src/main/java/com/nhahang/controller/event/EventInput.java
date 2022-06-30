package com.nhahang.controller.event;


import java.sql.Timestamp;
import java.util.List;

import com.nhahang.model.DishModel;



public class EventInput {

	private String eventName;
	private String description;
	private Timestamp beginTime;
	private Timestamp endTime;
	private List<DishModel> discount;
	
	
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
