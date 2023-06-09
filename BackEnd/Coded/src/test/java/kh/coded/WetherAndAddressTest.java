package kh.coded;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import kh.coded.dto.AddressCoordDTO;
import kh.coded.dto.TodayWeatherDTO;
import kh.coded.dto.WeeklyWeatherDTO;
import kh.coded.repositories.AddressCoordDAO;
import kh.coded.repositories.TodayWeatherDAO;
import kh.coded.repositories.WeeklyWeatherDAO;
import kh.coded.services.WeatherService;

@SpringBootTest
public class WetherAndAddressTest {
	@Autowired
	private AddressCoordDAO addressCoordDAO;
	@Autowired
	private WeatherService wetherService;
	@Autowired
	private TodayWeatherDAO todayWeatherDAO;
	@Autowired
	private WeeklyWeatherDAO weeklyWeatherDAO;
	
//	@DisplayName("주소 출력 테스트")
////	@Transactional
////	@Rollback(true)
//	@Test
//	public void selectAddressTest() {
//		List<String> address1 = addressCoordDAO.selectDistinctAddress1();
////		for(String item : address1) {
////			System.out.println(item);
////		}
//		System.out.println(address1.get(0));
//		List<String> address2 = addressCoordDAO.selectScopedAddress2(address1.get(0));
//		for(String item : address2) {
//			System.out.println(item);
//		}
//	}
	
//	@DisplayName("메시지 출력 테스트")
//	@Test
//	public void selectMessageTest() {
//		String message = wetherService.getMessage(29, 29, 19);
//		System.out.println(message);
//	}
	
	@DisplayName("날짜 데이터들 데이터베이스 입력")
	@Transactional
	@Rollback(false)
	@Test
	public void insertData() {
		TodayWeatherDTO todayDTO = new TodayWeatherDTO(0, 0, 0, 0, 0, 0);
		WeeklyWeatherDTO weeklyDTO = new WeeklyWeatherDTO(0, 0, 0, 0, 0, 0);
		
		List<AddressCoordDTO> addressList = addressCoordDAO.selectAll();
		
		for(AddressCoordDTO dto : addressList) {
			todayDTO.setAddressId(dto.getAddressID());
			todayWeatherDAO.insert(todayDTO);
			
//			weeklyDTO.setAddressId(dto.getAddressID());
//			for(int i = 1; i <= 6; i++) {
//				weeklyDTO.setdDay(i);
//				weeklyWeatherDAO.insert(weeklyDTO);
//			}
		}
	}
	
}
