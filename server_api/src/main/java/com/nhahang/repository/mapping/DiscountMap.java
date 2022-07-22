package com.nhahang.repository.mapping;

import java.sql.ResultSet;

import com.nhahang.model.DiscountModel;

public class DiscountMap  implements GeneralMap<DiscountModel>{
	@Override
	public DiscountModel map(ResultSet s) {
		try {
			DiscountModel d= new DiscountModel();
			d.setDiscountRate(s.getInt("discount"));
			d.setRank(s.getString("rank"));
			return d;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getCause());
			return null;
		}
	}
}
