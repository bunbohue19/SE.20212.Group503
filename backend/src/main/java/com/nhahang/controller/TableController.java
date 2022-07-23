package com.nhahang.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nhahang.model.TableModel;
import com.nhahang.service.TableService;

@RestController
public class TableController {
	TableService service= new TableService();
	
	@PutMapping("/table")
	public void createTable(@RequestBody TableModel table)
	{
		service.createTable(table);
	}
	
	@PostMapping("/table")
	public void updateTable(@RequestBody TableModel table)
	{
		service.UpdateTable(table);
	}
	
	@GetMapping("/table")
	public List<TableModel> getTable()
	{
		return service.getAllTable();
	}
	
	@GetMapping("/table/free")
	public List<TableModel> getFreeTable()
	{
		return service.getFreeTable();
	}
	
	@DeleteMapping("/table")
	public void deleteTable(@RequestBody TableModel table)
	{
		service.DeleteTable(table);
	}
}
