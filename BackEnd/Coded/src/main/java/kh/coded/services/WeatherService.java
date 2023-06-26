package kh.coded.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
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

	@Value("${weatherShort.api.decoding.key}")
	private String weatherShortAPIKey;
	@Value("${weatherLong.api.decoding.key}")
	private String weatherLongAPIKey;
	
	private final String skyCodeKey = "SKY";
	private final String ptyCodeKey = "PTY";


	private final int[] tempConditions = {
			4, //0
			8, //1
			11, //2
			16, //3 
			19, //4
			22, //5
			27, //6
			28 //7
	};
	private final int WEEKLY_SET_TIME = 9;


	public String getMessage(int max, int min) {
		int condition = 0;
		String rangeCondition = (max - min) >= 10 ? "T" : "F"; // 비교 연산 결과 불린 연산값이 돌아감.
		if(max < tempConditions[0]) {
			condition = tempConditions[0];
		}else if(max >= tempConditions[7]) {
			condition = tempConditions[7];
		}else {
			for(int i = 0; i < tempConditions.length-1; i++) {
				if(max >= tempConditions[i] && max < tempConditions[i+1]) {
					condition = tempConditions[i+1];
				}
			}
		}
		return tempMessageDAO.selectMessageByCondition(condition, rangeCondition);
	}

	public TodayWeatherDTO getTodayWeather(int addressId, long time) {
		Calendar calandar = Calendar.getInstance();
		calandar.setTimeInMillis(time);
		int hour = calandar.get(Calendar.HOUR_OF_DAY);
		return todayWeatherDAO.selectByAddressId(addressId, hour);
	}

	public WeeklyWeatherDTO getWeeklyWeather(int addressId, int dDay) {
		return weeklyWeatherDAO.selectByAddressIdAndDDay(addressId, dDay);
	}

	public List<WeeklyWeatherDTO> getWeeklyWeatherList(int addressId){
		return weeklyWeatherDAO.selectByAddressId(addressId);
	}

	private Map<String, Integer> parseWeatherCode(String weather){
		Map<String, Integer> result = new HashMap<>();
		
		if(weather.equals("맑음")) {
			result.put(skyCodeKey, 1);
			result.put(ptyCodeKey, 0);
		}else {
			if(weather.contains("구름")) {
				result.put(skyCodeKey, 3);
			}else if(weather.contains("흐")) {
				result.put(skyCodeKey, 4);
			}else {
				result.put(skyCodeKey, 1);
			}
			if(weather.contains("비/눈")) {
				result.put(ptyCodeKey, 2);
			}else if(weather.contains("비")) {
				result.put(ptyCodeKey, 1);
			}else if(weather.contains("눈")) {
				result.put(ptyCodeKey, 3);
			}else if(weather.contains("소나기")) {
				result.put(ptyCodeKey, 4);
			}else {
				result.put(ptyCodeKey, 0);
			}
		}
		return result;
	}

	@Transactional
	public void setFullTodayWeather(){
		Calendar cal = Calendar.getInstance();
		Date now = null;
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat hourFormatter = new SimpleDateFormat("HH");
		SimpleDateFormat minuteFormatter = new SimpleDateFormat("mm");
		SimpleDateFormat dayFormatter = new SimpleDateFormat("dd");
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

		try {
			for(AddressCoordDTO coord : coordList) {
				List<TodayWeatherDTO> todayList = new ArrayList<>();
				WeeklyWeatherDTO nextDay = new WeeklyWeatherDTO(0, coord.getAddressID(), 0, 0, 1, 0,0);
				WeeklyWeatherDTO twoDay = new WeeklyWeatherDTO(0, coord.getAddressID(), 0, 0, 2, 0, 0);
				for(int i = 0; i < 24; i++) {
					//TodayWeatherID, AddressID, Recent, Min, Max, Time, SKYCode, PTYCode
					todayList.add(new TodayWeatherDTO(0, coord.getAddressID(), 0, 0, 0, i, 0, 0));
				}
				JSONArray jsonArray = null;
				while(true) {
					try {
						UriComponents uri = UriComponentsBuilder.fromHttpUrl("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst")
								.queryParam("serviceKey", weatherShortAPIKey)
								.queryParam("numOfRows", 2000)
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
						

						jsonArray = json.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");
						break;
					}catch(Exception e) {
						System.out.println(coord.getAddressID());
						e.printStackTrace();
					}
				}
				
				for(int i = 0; i < jsonArray.length(); i++) {
					String category = jsonArray.getJSONObject(i).getString("category");
					Date date = formatter.parse(Integer.toString(jsonArray.getJSONObject(i).getInt("fcstDate")));
					int diff = Math.abs(Integer.parseInt(dayFormatter.format(date)) - Integer.parseInt(dayFormatter.format(new Date())));
					if(category.equals("TMP")) {
						//1시간 온도
						//fcstTime 은 0400 등으로 들어있다보니, 400으로 인식될것임
						int index = jsonArray.getJSONObject(i).getInt("fcstTime")/100;
						if(index <= 2) {
							if(diff == 1) {
								todayList.get(index).setRecent(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}
						}else {
							if(diff == 0) {
								todayList.get(index).setRecent(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}
						}

					}
					else if(category.equals("SKY")) {
						//1시간 기상 상태 코드
						int index = jsonArray.getJSONObject(i).getInt("fcstTime")/100;
						if(index <= 2) {
							if(diff == 1) {
								todayList.get(index).setSkyCode(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}

						}else if(diff == 0){
							todayList.get(index).setSkyCode(jsonArray.getJSONObject(i).getInt("fcstValue"));
						}

						if(index == WEEKLY_SET_TIME) {
							if(diff == 1) {
								nextDay.setSkyCode(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}else if (diff == 2) {
								twoDay.setSkyCode(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}
						}
					}else if(category.equals("PTY")) {
						int index = jsonArray.getJSONObject(i).getInt("fcstTime")/100;
						if(index <= 2) {
							if(diff == 1) {
								todayList.get(index).setPtyCode(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}
						}else {
							if(diff == 0) {
								todayList.get(index).setPtyCode(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}
						}

						if(index == WEEKLY_SET_TIME) {
							if(diff == 1) {
								nextDay.setPtyCode(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}else if (diff == 2) {
								twoDay.setPtyCode(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}
						}
					}
					else if(category.equals("TMN")) {
						//일일 최저 기온
						if(diff == 0) {
							for(int j = 0; j < 23; j++) {
								todayList.get(j).setMin(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}
						}else if(diff == 1){
							nextDay.setMin(jsonArray.getJSONObject(i).getInt("fcstValue"));
						}else if(diff == 2) {
							twoDay.setMin(jsonArray.getJSONObject(i).getInt("fcstValue"));
						}

					}else if(category.equals("TMX")) {
						//일일 최고 기온
						if(diff == 0) {
							for(int j = 0; j < 23; j++) {
								todayList.get(j).setMax(jsonArray.getJSONObject(i).getInt("fcstValue"));
							}
						}else if(diff == 1) {
							nextDay.setMax(jsonArray.getJSONObject(i).getInt("fcstValue"));
						}else if(diff == 2) {
							twoDay.setMax(jsonArray.getJSONObject(i).getInt("fcstValue"));
						}

					}
				}
				for(TodayWeatherDTO today : todayList) {
					todayWeatherDAO.updateAll(today);
				}
				weeklyWeatherDAO.updateAll(nextDay);
				weeklyWeatherDAO.updateAll(twoDay);
			}
		}catch(Exception e) {
			e.printStackTrace();
			this.setFullTodayWeather();
		}
	}
	public void setFullWeekleyWeather() {
		Calendar cal = Calendar.getInstance();
		Date now = null;
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat hourFormatter = new SimpleDateFormat("HH");
		if(Integer.parseInt(hourFormatter.format(cal.getTime())) >= 6){
			now = cal.getTime();
		}else {
			cal.add(Calendar.DAY_OF_YEAR, -1);
			now = cal.getTime();
		}
		String day = formatter.format(now) + "0600";
		List<AddressCoordDTO> coordList = addressCoordDAO.selectAll();

		RestTemplate restTemplate = new RestTemplate();
		try {
			for(AddressCoordDTO coord : coordList) {
				UriComponents uri = null;
				String response = null;
				org.json.JSONObject json = null;
				JSONObject item = null;
					while(true) {
						try {
						uri = UriComponentsBuilder.fromHttpUrl("http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa")
								.queryParam("serviceKey", weatherLongAPIKey)
								.queryParam("numOfRows", 10)
								.queryParam("pageNo", 1)
								.queryParam("regId", coord.getCode())
								.queryParam("tmFc", day)
								.build();
						
						HttpHeaders header = new HttpHeaders();
						header.setContentType(MediaType.APPLICATION_JSON);
						HttpEntity<HttpHeaders> entity = new HttpEntity<>(header);
						
						response = restTemplate.getForObject(uri.toUri(), String.class);
						json = XML.toJSONObject(response);
						item = json.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONObject("item");
						break;
					}catch(Exception e) {
						System.out.println(coord.getAddressID());
						e.printStackTrace();
					}
				}
				
				WeeklyWeatherDTO third = new WeeklyWeatherDTO(0, coord.getAddressID(), 0, 0, 3, 0, 0);
				WeeklyWeatherDTO fourth = new WeeklyWeatherDTO(0, coord.getAddressID(), 0, 0, 4, 0, 0);
				WeeklyWeatherDTO fifth = new WeeklyWeatherDTO(0, coord.getAddressID(), 0, 0, 5, 0, 0);
				WeeklyWeatherDTO sixth = new WeeklyWeatherDTO(0, coord.getAddressID(), 0, 0, 6, 0, 0);
				
				third.setMax(item.getInt("taMax3"));
				third.setMin(item.getInt("taMin3"));
				fourth.setMax(item.getInt("taMax4"));
				fourth.setMin(item.getInt("taMin4"));
				fifth.setMax(item.getInt("taMax5"));
				fifth.setMin(item.getInt("taMin5"));
				sixth.setMax(item.getInt("taMax6"));
				sixth.setMin(item.getInt("taMin6"));
				
				String code2 = coord.getCode().substring(0, 4);
				String letter = code2.substring(2,3);
				if(letter.equals("B") || letter.equals("G")) {
					code2 = code2.substring(0, 3) + "00000";
				}else if(letter.equals("D") || letter.equals("C") || letter.equals("F") || letter.equals("H")) {
					code2 = code2 + "0000";
				}else if(letter.equals("E")) {
					//울릉도 독도이면, 경상북도로 바꿔주자.
					code2 = "11H10000";
				}else if(letter.equals("A")) {
					//백령도이면 인천으로 바꿔주자.
					code2 = "11B00000";
				}
				if(!code2.substring(0,2).equals("11")) {
					code2 = "11" + code2.substring(2, code2.length());
				}

				while(true) {
					try {
						uri = UriComponentsBuilder.fromHttpUrl("http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst")
								.queryParam("serviceKey", weatherLongAPIKey)
								.queryParam("numOfRows", 10)
								.queryParam("pageNo", 1)
								.queryParam("regId", code2)
								.queryParam("tmFc", day)
								.build();
						response = restTemplate.getForObject(uri.toUri(), String.class);
						json = XML.toJSONObject(response);
						item = json.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONObject("item");
						break;
					}catch(Exception e) {
						System.out.println(coord.getAddressID());
						e.printStackTrace();
					}
				}
				
				//AM, PM 중 AM만 얻어옴.
				String weatherMessage = item.getString("wf3Am");
				Map<String, Integer> code = this.parseWeatherCode(weatherMessage);
				third.setSkyCode(code.get(skyCodeKey));
				third.setPtyCode(code.get(ptyCodeKey));
				weatherMessage = item.getString("wf4Am");
				code = this.parseWeatherCode(weatherMessage);
				fourth.setSkyCode(code.get(skyCodeKey));
				fourth.setPtyCode(code.get(ptyCodeKey));
				weatherMessage = item.getString("wf5Am");
				code = this.parseWeatherCode(weatherMessage);
				fifth.setSkyCode(code.get(skyCodeKey));
				fifth.setPtyCode(code.get(ptyCodeKey));
				weatherMessage = item.getString("wf6Am");
				code = this.parseWeatherCode(weatherMessage);
				sixth.setSkyCode(code.get(skyCodeKey));
				sixth.setPtyCode(code.get(ptyCodeKey));
				
				weeklyWeatherDAO.updateAll(third);
				weeklyWeatherDAO.updateAll(fourth);
				weeklyWeatherDAO.updateAll(fifth);
				weeklyWeatherDAO.updateAll(sixth);
			}
		}catch(Exception e) {
			e.printStackTrace();
			this.setFullWeekleyWeather();
		}
	}

}
