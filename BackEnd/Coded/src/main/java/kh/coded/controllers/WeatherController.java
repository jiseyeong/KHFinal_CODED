package kh.coded.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.MemberDTO;
import kh.coded.dto.TodayWeatherDTO;
import kh.coded.dto.WeeklyWeatherDTO;
import kh.coded.security.JwtProvider;
import kh.coded.services.AddressCoordService;
import kh.coded.services.MemberService;
import kh.coded.services.WeatherService;

@RestController
@RequestMapping("/weather/")
public class WeatherController {

	@Autowired
	private WeatherService weatherService;
	@Autowired
	private AddressCoordService addressCoordService;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private MemberService memberService;

	@GetMapping("today")
	public ResponseEntity<?> getTodayInfo(
			@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="time") long time
			)
	{
		if(authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if(jwtProvider.validateToken(accessToken)) {
				MemberDTO member = memberService.selectByUserNo(jwtProvider.getLoginUserNo(accessToken));
				if(member != null) {
					Map<String, Object> data = new HashMap<>();

					TodayWeatherDTO today = weatherService.getTodayWeather(addressCoordService.getAddressCoord(member.getAddress1(), member.getAddress2()).getAddressID(), time);
					String message = weatherService.getMessage(today.getMax(), today.getMin());

					if(today != null & message != null) {
						data.put("today", today);
						data.put("message", message);
						return ResponseEntity.ok().body(data);
					}			
				}
			}
		}
		return ResponseEntity.badRequest().body("데이터를 찾지 못하였습니다.");
	}


	@GetMapping("weekly")
	public ResponseEntity<?> getWeeklyInfo(
			@RequestHeader(value="authorization") String authorization
			)
	{
		if(authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if(jwtProvider.validateToken(accessToken)) {
				MemberDTO member = memberService.selectByUserNo(jwtProvider.getLoginUserNo(accessToken));
				if(member != null) {
					List<Object> data = new ArrayList<>();

					List<WeeklyWeatherDTO> weekly = weatherService.getWeeklyWeatherList(addressCoordService.getAddressCoord(member.getAddress1(), member.getAddress2()).getAddressID());
					String message = null;

					if(weekly != null) {
						for(WeeklyWeatherDTO week : weekly) {
							Map<String, Object> innerData = new HashMap<>();
							message = weatherService.getMessage(week.getMax(), week.getMin());
							innerData.put("week", week);
							innerData.put("message", message);
							data.add(innerData);
						}
						return ResponseEntity.ok().body(data);
					}
				}
			}			
		}
		return ResponseEntity.badRequest().body("데이터를 찾지 못하였습니다.");
	}
}

