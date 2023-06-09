package kh.coded.repositories;

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
}
