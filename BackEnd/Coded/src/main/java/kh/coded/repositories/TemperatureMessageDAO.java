package kh.coded.repositories;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.TemperatureMessageDTO;

@Repository
public class TemperatureMessageDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public String selectMessageByCondition(int tempCondition, String tempRangeCondition) {
		Map<String, String> data = new HashMap<>();
		data.put("tempCondition", Integer.toString(tempCondition));
		data.put("tempRangeCondition", tempRangeCondition);
		return mybatis.selectOne("TemperatureMessage.selectMessageByCondition", data);
	}
}
