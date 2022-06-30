package com.nhahang.service;


import java.util.List;

import com.nhahang.controller.event.EventInput;
import com.nhahang.model.DishModel;
import com.nhahang.model.EventModel;
import com.nhahang.repository.EventRepository;


public class EventService {
	private EventRepository connect= new EventRepository();
	
	public List<EventModel> getEvent()
	{
		List<EventModel> result= connect.getEventTable();
		for(EventModel i: result)
		{
			i.setDiscount(connect.getDiscountTable(i.getEventID()));
		}
		return result;
	}
	
	public Integer InsertEvent(EventInput event)
	{

		Integer result=connect.InsertEventTable(event);
		

		for(DishModel i: event.getDiscount())
		{
			connect.InsertDiscountTable(result, i);
			
		}
		return result;
	}
	
	public EventModel getEventById(Integer ID)
	{
		EventModel result= connect.getEventTableById(ID);
		if(result!=null)
			result.setDiscount(connect.getDiscountTable(ID));
		
		return result;
	}

}
