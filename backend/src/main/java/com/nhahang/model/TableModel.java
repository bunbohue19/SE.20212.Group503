package com.nhahang.model;

public class TableModel {
	private Integer TableID;
	private Integer numSeats;
	private String tableName;
	private String status;
	public Integer getTableID() {
		return TableID;
	}
	public void setTableID(Integer tableID) {
		TableID = tableID;
	}
	public Integer getNumSeats() {
		return numSeats;
	}
	public void setNumSeats(Integer numSeats) {
		this.numSeats = numSeats;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
