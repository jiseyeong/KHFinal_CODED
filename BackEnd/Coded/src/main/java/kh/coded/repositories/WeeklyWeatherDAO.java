package kh.coded.repositories;

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
}
