package com.nhahang.repository.mapping;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.nhahang.model.DishModel;

public class DishMap implements GeneralMap<DishModel>{
	@Override
	public DishModel map(ResultSet s) {
		try {
			System.out.println(1);
			DishModel dish= new DishModel();
			dish.setID(s.getInt("ItemID"));
			dish.setName(s.getString("ItemName"));
			dish.setCost(s.getLong("cost"));
			dish.setDescription(s.getString("ItemDescr"));
			dish.setStatus(s.getString("ItemStatus"));
			dish.setPoster(s.getString("poster"));
			dish.setCatagory(s.getInt("category"));
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
