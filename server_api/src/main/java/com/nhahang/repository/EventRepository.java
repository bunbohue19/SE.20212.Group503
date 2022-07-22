package com.nhahang.repository;

import java.util.List; 
import com.nhahang.model.EventModel;
import com.nhahang.model.DiscountModel;
import com.nhahang.repository.mapping.DiscountMap;
import com.nhahang.repository.mapping.EventMap;

public class EventRepository {
	public  List<EventModel> getEvents()
	{
		EventMap m=new EventMap();
		String sql="select * from Event";
		List<EventModel> result;
		result=GeneralConnect.select(sql, m);
		return result;
	}
	
	public  List<EventModel> getActiveEvents()
	{
		EventMap m=new EventMap();
		String sql="select * from Event where eventStatus='active'";
		List<EventModel> result;
		result=GeneralConnect.select(sql, m);
		return result;
	}
	
	public  EventModel getEventById(Integer Id)
	{

		EventMap m=new EventMap();
		String sql="select * from Event where eventID = ? and eventStatus='active'";
		List<EventModel> result;
		result=GeneralConnect.select(sql, m, Id);
		if(result.isEmpty())
		{
			return null;
		}
		return result.get(0);
	}
	
	public  List<DiscountModel> getDiscount(int eventid)
	{
		String sql = "select * from discount where eventid= ? ";
		DiscountMap n=new DiscountMap();
		List<DiscountModel> result;
		
		result=GeneralConnect.select(sql, n, eventid);		
		return result;
	}
	
	public Integer InsertEvent(EventModel event)
	{
		String sql="Insert into Event( eventName, eventDescr, beginTime, endTime, poster) "
			+ "values (?, ?, ?, ?, ?)";
		Integer result;
		result=GeneralConnect.insert(sql, event.getName(),event.getDescription(),event.getBeginTime(),event.getEndTime(), event.getPoster());		
		return result;
	}
	
	public void InsertDiscount(int eventId, List<DiscountModel> discount)
	{
		if(discount==null)
		{
			return;
		}
		else if(discount.isEmpty())
		{
			return;
		}
		
		String sql="delete from Discount"
				+ " where eventId = ?";
		GeneralConnect.update(sql,eventId);
		
		sql= "insert into Discount(eventId, rank, discount) values ";
		for(DiscountModel i: discount)
		{
			sql=sql+"("+eventId+" ,'"+i.getRank()+"' ,"+i.getDiscountRate()+" ),";
			
		}
		sql=sql.substring(0, sql.length()-1);
		GeneralConnect.insert(sql);
	}
	
	public void updateEvent(EventModel event)
	{	
		String sql= "Update Event "
				+"set eventName= ?, eventDescr= ?,beginTime=?, endTime= ?, poster= ?"
				+ " where eventId=?";
		GeneralConnect.update(sql, event.getName(), event.getDescription(), event.getBeginTime(), event.getEndTime(), event.getPoster(), event.getId());
	}
	
	public void deleteEvent(EventModel event)
	{	
		String sql= "Update Event "
				+"set eventStatus='cancel'"
				+ " where eventId=?";
		GeneralConnect.update(sql, event.getId());
	}
}
