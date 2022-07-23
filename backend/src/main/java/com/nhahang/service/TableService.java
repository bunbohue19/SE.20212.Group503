package com.nhahang.service;

import java.util.List; 
import com.nhahang.model.TableModel;
import com.nhahang.repository.TableRepository;


public class TableService {
	TableRepository connect=new TableRepository();
	public List<TableModel> getAllTable()
	{
		return connect.getAllTable();
	}
	
	public List<TableModel> getFreeTable()
	{
		return connect.getFreeTable();
	}
	
	public void UpdateTable(TableModel table)
	{
		connect.updateTable(table);
	}
	
	public void createTable(TableModel table)
	{
		connect.createTable(table);
	}
	
	public void DeleteTable(TableModel table)
	{
		connect.deleteTable(table);
	}
	
	
}
