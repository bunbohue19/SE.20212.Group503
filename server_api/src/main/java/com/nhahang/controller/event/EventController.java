package com.nhahang.controller.event;


import java.sql.Timestamp;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nhahang.model.EventModel;
import com.nhahang.service.EventService;



@RestController
public class EventController {
	private EventService service= new EventService();
	
	@PutMapping("/event/create")
	public EventModel createEvent(@RequestBody EventInput EventInput)
	{
		Integer id = service.InsertEvent(EventInput);
		return service.getEventById(id);
	}
	
	@GetMapping("/event")
	public List<EventModel> get()
	{

		return service.getEvent();
	}
	
	
}
