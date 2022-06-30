package com.nhahang.repository.mapping;

import java.sql.ResultSet;

import com.nhahang.model.ComboModel;

public class ComboMap implements GeneralMap<ComboModel>{
	@Override
	public ComboModel map(ResultSet s) {
		try {
			ComboModel combo= new ComboModel();
			combo.setComboID(s.getInt("ComboID"));
			combo.setComboName(s.getString("comboName"));
			combo.setComboPrice(s.getLong("ComboPrice"));
			combo.setDescription(s.getString("comboDescription"));
			try {
				
				combo.setQuantity(s.getInt("quantity"));
			} catch (Exception e) {
				// TODO: handle exception
			}
			return combo;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getCause());
			return null;
		}
	}

}

