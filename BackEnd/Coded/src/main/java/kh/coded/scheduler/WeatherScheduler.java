package kh.coded.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kh.coded.services.WeatherService;

@Component
public class WeatherScheduler {
	
	@Autowired
	private WeatherService weatherService;
	
	@Scheduled(cron = "0 0 4 * * ?")
	public void todayDataCalling() {
		weatherService.setFullTodayWeather();
	}
	
	@Scheduled(cron = "0 5 6 * * ?")
	public void weeklyDataCalling() {
		weatherService.setFullWeekleyWeather();
	}
}
