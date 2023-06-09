package kh.coded;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import kh.coded.repositories.AddressCoordDAO;

@SpringBootTest
public class AddressCoordTest {
	@Autowired
	private AddressCoordDAO addressCoordDAO;
	
	@DisplayName("주소 출력 테스트")
//	@Transactional
//	@Rollback(true)
	@Test
	public void selectTest() {
		List<String> address1 = addressCoordDAO.selectDistinctAddress1();
//		for(String item : address1) {
//			System.out.println(item);
//		}
		System.out.println(address1.get(0));
		List<String> address2 = addressCoordDAO.selectScopedAddress2(address1.get(0));
		for(String item : address2) {
			System.out.println(item);
		}
	}
	
}
