package com.nhahang.repository.mapping;

import java.sql.ResultSet;

public interface GeneralMap<T> {
	public T map(ResultSet s);
}
