package com.nhahang.repository;

import java.util.List;

import com.nhahang.controller.event.EventInput;
import com.nhahang.model.DishModel;
import com.nhahang.model.EventModel;
import com.nhahang.repository.mapping.DishMap;
import com.nhahang.repository.mapping.EventMap;

public class EventRepository {
	public  List<EventModel> getEventTable()
	{
		EventMap m=new EventMap();
		String sql="select * from Event";
		List<EventModel> result;
		result=GeneralConnect.select(sql, m);
		return result;
	}
	
	public  EventModel getEventTableById(Integer Id)
	{
		EventMap m=new EventMap();
		String sql="select * from Event where eventID = ?";
		List<EventModel> result;
		result=GeneralConnect.select(sql, m, Id);
		if(result.isEmpty())
		{
			return null;
		}
		return result.get(0);
	}
	
	public  List<DishModel> getDiscountTable(int eventid)
	{
		String sql = "select * from (select * from discount where eventid= ? ) as s "
				+ "inner join dish on dish.dishid= s.dishid";
		DishMap n=new DishMap();
		List<DishModel> result;
		
		result=GeneralConnect.select(sql, n, eventid);		
		return result;
	}
	
	public Integer InsertEventTable(EventInput event)
	{
		String sql="Insert into Event( eventName, eventDescr, eventStatus, beginTime, endTime) "
			+ "values (?, ?, ?, ?, ?)";
		Integer result;
		result=GeneralConnect.insert(sql, event.getEventName(),event.getDescription(),"active",event.getBeginTime(),event.getEndTime());		
		return result;
	}
	
	public void InsertDiscountTable(int eventId, DishModel dish)
	{
		String sql= "insert into Discount(eventId, dishId, discount) values "
					+"(?, ?, ?)";
		GeneralConnect.insert(sql,eventId, dish.getdishID(), dish.getDiscount());
	}
}
