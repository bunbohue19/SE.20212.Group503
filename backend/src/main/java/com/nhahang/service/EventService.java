package com.nhahang.service;


import java.util.List;
import com.nhahang.model.EventModel;
import com.nhahang.repository.EventRepository;
import com.nhahang.repository.GeneralConnect;


public class EventService {
	private EventRepository connect= new EventRepository();
	
	public List<EventModel> getEvent()
	{
		List<EventModel> result= connect.getEvents();
		for(EventModel i: result)
		{
			i.setDiscount(connect.getDiscount(i.getId()));
		}
		return result;
	}
	
	public List<EventModel> getActiveEvent()
	{
		List<EventModel> result= connect.getActiveEvents();
		for(EventModel i: result)
		{
			i.setDiscount(connect.getDiscount(i.getId()));
		}
		return result;
	}
	
	public Integer InsertEvent(EventModel event)
	{

		Integer result=connect.InsertEvent(event);		
		connect.InsertDiscount(result, event.getDiscount());
		return result;
	}
	
	public EventModel getEventById(Integer ID)
	{
		EventModel result= connect.getEventById(ID);
		if(result!=null)
			result.setDiscount(connect.getDiscount(ID));
		
		return result;
	}
	
	public void update(EventModel event)
	{
		connect.updateEvent(event);
		connect.InsertDiscount(event.getId(), event.getDiscount());
	}
	
	public void delete(EventModel event)
	{
		connect.deleteEvent(event);
	}
}
