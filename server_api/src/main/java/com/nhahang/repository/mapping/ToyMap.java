package com.nhahang.repository.mapping;

import java.sql.ResultSet;

import com.nhahang.model.ToyModel;

public class ToyMap implements GeneralMap<ToyModel>{
	@Override
	public ToyModel map(ResultSet s) {
	
		try {
			ToyModel toy= new ToyModel();
			toy.setToyID(s.getInt("toyid"));
			toy.setToyName(s.getString("toyname"));
			toy.setQuantity(s.getInt("quantity"));
	
			return toy;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getCause());
			return null;
		}
	}

}
