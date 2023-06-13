package kh.coded.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.TodayWeatherDTO;
import kh.coded.dto.WeeklyWeatherDTO;
import kh.coded.services.AddressCoordService;
import kh.coded.services.WeatherService;

@RestController
@RequestMapping("/weather/")
public class WeatherController {
	
	@Autowired
	private WeatherService weatherService;
	@Autowired
	private AddressCoordService addressCoordService;
	
	@GetMapping("today")
	public ResponseEntity<?> getTodayInfo(
			@RequestParam(value="address1") String address1,
			@RequestParam(value="address2") String address2,
			@RequestParam(value="time") int time
			){
		Map<String, Object> data = new HashMap<>();
		
		TodayWeatherDTO today = weatherService.getTodayWeather(addressCoordService.getAddressCoord(address1, address2).getAddressID(), time);
		String message = weatherService.getMessage(today.getMax(), today.getMin());

		if(today != null & message != null) {
			data.put("today", today);
			data.put("message", message);
			return ResponseEntity.ok().body(data);
		}
		return ResponseEntity.badRequest().body("데이터를 찾지 못하였습니다.");
	}
	
	@GetMapping("weekly")
	public ResponseEntity<?> getWeeklyInfo(
			@RequestParam(value="address1") String address1,
			@RequestParam(value="address2") String address2
			){
		Map<String, Object> data = new HashMap<>();
		
		List<WeeklyWeatherDTO> weekly = weatherService.getWeeklyWeatherList(addressCoordService.getAddressCoord(address1, address2).getAddressID());
		String message = null;
		
		if(weekly != null) {
			int index = 1;
			for(WeeklyWeatherDTO week : weekly) {
				Map<String, Object> innerData = new HashMap<>();
				message = weatherService.getMessage(week.getMax(), week.getMin());
				innerData.put("week", week);
				innerData.put("message", message);
				data.put("inner"+index++, innerData);
			}
			return ResponseEntity.ok().body(data);
		}
		return ResponseEntity.badRequest().body("데이터를 찾지 못하였습니다.");
	}
	
}
