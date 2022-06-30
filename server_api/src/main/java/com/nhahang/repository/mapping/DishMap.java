package com.nhahang.repository.mapping;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.nhahang.model.DishModel;

public class DishMap implements GeneralMap<DishModel>{
	@Override
	public DishModel map(ResultSet s) {
		try {
			DishModel dish= new DishModel();
			dish.setdishID(s.getInt("dishID"));
			dish.setdishName(s.getString("dishname"));
			dish.setCost(s.getLong("cost"));
			dish.setDescription(s.getString("dishDescr"));
			dish.setStatus(s.getString("dishStatus"));
			try {
				dish.setDiscount(s.getInt("discount"));
			} catch (SQLException e) {
			} 
			
			try {
				dish.setQuantity(s.getInt("quantity"));
			} catch (SQLException e) {
			} 
		
			return dish;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
	}

}
