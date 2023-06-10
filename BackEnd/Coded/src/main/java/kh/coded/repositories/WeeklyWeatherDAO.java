package kh.coded.repositories;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.WeeklyWeatherDTO;

@Repository
public class WeeklyWeatherDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public void insert(WeeklyWeatherDTO dto) {
		mybatis.insert("WeeklyWeather.insert", dto);
	}
	
	public WeeklyWeatherDTO selectByAddressIdAndDDay(int addressId, int dDay) {
		Map<String, Integer> data = new HashMap<>();
		data.put("addressId", addressId);
		data.put("dDay", dDay);
		return mybatis.selectOne("WeeklyWeather.selectByAddressIdAndDDay", data);
	}
	
	public void updateAll(WeeklyWeatherDTO dto) {
		mybatis.update("WeeklyWeather.updateAll", dto);
	}
	
//	public List<WeeklyWeatherDTO> selectByAddressIdOrderByDDay(int addressId){
//		return mybatis.selectList("WeeklyWeather.selectByAddressIdOrderByDDay", addressId);
//	}
	
}
