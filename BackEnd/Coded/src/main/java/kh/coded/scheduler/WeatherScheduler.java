package kh.coded.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kh.coded.services.WeatherService;

@Component
public class WeatherScheduler {
	
	@Autowired
	private WeatherService weatherService;
	
	@Scheduled(cron = "0 15 2 * * ?")
	public void dataCalling() {
		weatherService.setFullTodayWeather();
	}
}
