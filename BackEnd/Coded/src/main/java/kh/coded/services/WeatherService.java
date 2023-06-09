package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.repositories.AddressCoordDAO;
import kh.coded.repositories.TemperatureMessageDAO;

@Service
public class WeatherService {
	@Autowired
	private AddressCoordDAO addressCoordDAO;
	@Autowired
	private TemperatureMessageDAO tempMessageDAO;
	
	private int[] tempConditions = {
			4, //0
			8, //1
			11, //2
			16, //3 
			19, //4
			22, //5
			27, //6
			28 //7
	};
	
	
	public String getMessage(int curr, int max, int min) {
		int condition = 0;
		String rangeCondition = (max - min) >= 10 ? "T" : "F"; // 비교 연산 결과 불린 연산값이 돌아감.
		if(curr < tempConditions[0]) {
			condition = tempConditions[0];
		}else if(curr > tempConditions[7]) {
			condition = tempConditions[7];
		}else {
			for(int i = 0; i < tempConditions.length-1; i++) {
				if(curr >= tempConditions[i] && curr < tempConditions[i+1]) {
					condition = tempConditions[i+1];
				}
			}
		}
		return tempMessageDAO.selectMessageByCondition(condition, rangeCondition);
	}
	
}
