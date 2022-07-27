package com.nhahang.repository;

import java.util.List;

import com.nhahang.model.TableModel;
import com.nhahang.repository.mapping.TableMap;


public class TableRepository {
	public List<TableModel> getAllTable()
	{
		TableMap m=new TableMap();
		String sql="select * from Tble";
		List<TableModel> result= GeneralConnect.select(sql, m);
		return result;
	}
	
	public List<TableModel> getFreeTable()
	{
		TableMap m=new TableMap();
		String sql="select * from Tble where tableStatus ='free'";
		List<TableModel> result= GeneralConnect.select(sql, m);
		return result;
	}
	
	public TableModel getTableByID(int TableId)
	{
		TableMap m=new TableMap();
		String sql="select * from Tble where tableId= ?";
		List<TableModel> result= GeneralConnect.select(sql, m, TableId);
		if(result.isEmpty())
		{
			return null;
		}
		return result.get(0);
	}
	
	public int  createTable(TableModel table)
	{
		String sql= "insert into Tble(tableName, numSeats) values "
					+"(? ,?) ";
		return GeneralConnect.insert(sql,table.getTableName(), table.getNumSeats());
	}
	
	public void updateTable(TableModel table)
	{
		String sql="update Tble "
					+"set tableName= ?,numSeats=? "
					+" where tableId= ? ";
		GeneralConnect.update(sql, table.getTableName(), table.getNumSeats(), table.getTableID());
	}
	
	public void deleteTable(TableModel table)
	{
		String sql="update Tble "
				+"set tableStatus= ? "
				+" where tableId= ? ";
	GeneralConnect.update(sql, table.getStatus(), table.getTableID());
	}
	
}
