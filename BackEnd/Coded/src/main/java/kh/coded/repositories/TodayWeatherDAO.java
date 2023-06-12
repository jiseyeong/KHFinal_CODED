package kh.coded.repositories;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.TodayWeatherDTO;

@Repository
public class TodayWeatherDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public void insert(TodayWeatherDTO dto) {
		mybatis.insert("TodayWeather.insert", dto);
	}
	
	public TodayWeatherDTO selectByAddressId(int addressId, int time) {
		Map<String, Integer> data = new HashMap<>();
		data.put("addressId", addressId);
		data.put("time", time);
		return mybatis.selectOne("TodayWeather.selectByAddressId",data);
	}
	
	public void updateAll(TodayWeatherDTO dto) {
		mybatis.update("TodayWeather.updateAll", dto);
	}
	
	public void updatePart(TodayWeatherDTO dto) {
		mybatis.update("TodayWeather.updatePart", dto);
	}
}
