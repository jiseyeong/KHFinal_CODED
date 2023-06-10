package kh.coded.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import kh.coded.dto.AddressCoordDTO;
import kh.coded.dto.TodayWeatherDTO;
import kh.coded.dto.WeeklyWeatherDTO;
import kh.coded.repositories.AddressCoordDAO;
import kh.coded.repositories.TemperatureMessageDAO;
import kh.coded.repositories.TodayWeatherDAO;
import kh.coded.repositories.WeeklyWeatherDAO;

@Service
public class WeatherService {
	@Autowired
	private TemperatureMessageDAO tempMessageDAO;
	@Autowired
	private TodayWeatherDAO todayWeatherDAO;
	@Autowired
	private WeeklyWeatherDAO weeklyWeatherDAO;
	@Autowired
	private AddressCoordDAO addressCoordDAO;
	
	@Value("${wether.api.decoding.key}")
	private String weatherAPIKey;
	

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

	public TodayWeatherDTO getTodayWeather(int addressId) {
		return todayWeatherDAO.selectByAddressId(addressId);
	}

	public WeeklyWeatherDTO getWeeklyWeather(int addressId, int dDay) {
		return weeklyWeatherDAO.selectByAddressIdAndDDay(addressId, dDay);
	}
	
	@Transactional
	public void setFullTodayWeather(){
		Calendar cal = Calendar.getInstance();
		Date now = null;
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat hourFormatter = new SimpleDateFormat("HH");
		SimpleDateFormat minuteFormatter = new SimpleDateFormat("mm");
		if((Integer.parseInt(hourFormatter.format(cal.getTime())) >= 2 && Integer.parseInt(minuteFormatter.format(cal.getTime())) > 40)
			|| Integer.parseInt(hourFormatter.format(cal.getTime())) >= 3) {
			now = cal.getTime();
		}else {
			cal.add(Calendar.DAY_OF_YEAR, -1);
			now = cal.getTime();
		}
		String day = formatter.format(now);
		List<AddressCoordDTO> coordList = addressCoordDAO.selectAll();
		
		RestTemplate restTemplate = new RestTemplate();
		SimpleDateFormat tempForm = new SimpleDateFormat("HHmm");
		
		try {
			for(AddressCoordDTO coord : coordList) {						
				UriComponents uri = UriComponentsBuilder.fromHttpUrl("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst")
						.queryParam("serviceKey", weatherAPIKey)
						.queryParam("numOfRows", 300)
						.queryParam("pageNo", 1)
						.queryParam("base_date", day)
						.queryParam("base_time", "0200")
						.queryParam("nx", coord.getX())
						.queryParam("ny", coord.getY())
						.build();
				
				HttpHeaders header = new HttpHeaders();
				header.setContentType(MediaType.APPLICATION_JSON);
				HttpEntity<HttpHeaders> entity = new HttpEntity<>(header);
				
				String response = restTemplate.getForObject(uri.toUri(), String.class);
				org.json.JSONObject json = XML.toJSONObject(response);

				
				List<TodayWeatherDTO> todayList = new ArrayList<>();
				for(int i = 0; i < 24; i++) {
					todayList.add(new TodayWeatherDTO(0, coord.getAddressID(), 0, 0, 0, 0, i));
				}
				JSONArray jsonArray = json.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");
				for(int i = 0; i < jsonArray.length(); i++) {
					String category = jsonArray.getJSONObject(i).getString("category");
					if(category.equals("TMP")) {
						//1시간 온도
						//fcstTime 은 0400 등으로 들어있다보니, 400으로 인식될것임
						int index = jsonArray.getJSONObject(i).getInt("fcstTime")/100;
						todayList.get(index).setRecent(jsonArray.getJSONObject(i).getInt("fcstValue"));
					}
					else if(category.equals("SKY")) {
						//1시간 기상 상태 코드
						int index = jsonArray.getJSONObject(i).getInt("fcstTime")/100;
						todayList.get(index).setWeatherCode(jsonArray.getJSONObject(i).getInt("fcstValue"));
					}
					else if(category.equals("TMN")) {
						//일일 최저 기온
						for(int j = 0; j < 23; j++) {
							todayList.get(j).setMin(jsonArray.getJSONObject(i).getInt("fcstValue"));
						}
					}else if(category.equals("TMX")) {
						//일일 최고 기온
						for(int j = 0; j < 23; j++) {
							todayList.get(j).setMax(jsonArray.getJSONObject(i).getInt("fcstValue"));
						}
					}
				}
				for(TodayWeatherDTO today : todayList) {
					todayWeatherDAO.updateAll(today);
				}
			}
		}catch(Exception e) {
			e.printStackTrace();
			this.setFullTodayWeather();
		}
		
	}
}
