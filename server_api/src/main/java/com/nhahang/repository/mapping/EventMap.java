package com.nhahang.repository.mapping;

import java.sql.ResultSet;

import com.nhahang.model.EventModel;

public class EventMap  implements GeneralMap<EventModel>{
	@Override
	public EventModel map(ResultSet s) {
		try {
			EventModel event= new EventModel();
			event.setEventID(s.getInt("eventID"));
			event.setEventName(s.getString("EventName"));
			event.setDescription(s.getString("eventDescr"));
			event.setBeginTime(s.getTimestamp("beginTime"));
			event.setEndTime(s.getTimestamp("endtime"));
			event.setStatus(s.getString("eventStatus"));
			
			return event;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getCause());
			return null;
		}
	}

}