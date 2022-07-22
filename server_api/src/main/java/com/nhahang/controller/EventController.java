package com.nhahang.controller;


import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nhahang.model.EventModel;
import com.nhahang.service.EventService;



@RestController
public class EventController {
	private EventService service= new EventService();
	
	@PutMapping("/event")
	public EventModel createEvent(@RequestBody EventModel EventInput)
	{
		Integer id = service.InsertEvent(EventInput);
		return service.getEventById(id);
	}
	
	@GetMapping("/event")
	public List<EventModel> getAllEvent()
	{

		return service.getEvent();
	}

	@GetMapping("/event/active")
	public List<EventModel> getActiveEvent()
	{

		return service.getActiveEvent();
	}
	
	@PostMapping("/event")
	public void updateEvent(@RequestBody EventModel eventInput)
	{
		service.update(eventInput);
	}
	
	@DeleteMapping("/event")
	public void deletteEvent(@RequestBody EventModel eventInput)
	{
		service.delete(eventInput);
	}
}
