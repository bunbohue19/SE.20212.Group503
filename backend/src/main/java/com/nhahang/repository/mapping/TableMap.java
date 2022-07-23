package com.nhahang.repository.mapping;

import java.sql.ResultSet;

import com.nhahang.model.TableModel;

public class TableMap  implements GeneralMap<TableModel>{
	@Override
	public TableModel map(ResultSet s) {

		try {
			TableModel table= new TableModel();
			table.setTableID(s.getInt("tableid"));
			table.setTableName(s.getString("tablename"));
			table.setNumSeats(s.getInt("numSeats"));
			table.setStatus(s.getString("tablestatus"));
			return table;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getCause());
			return null;
		}
	}

}
