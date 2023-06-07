package kh.coded;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import kh.coded.controllers.AuthenticationController;

@SpringBootTest
public class AuthenticationTest {
	
	@Autowired
	private AuthenticationController authController;
	
	@DisplayName("저장 테스트")
	@Transactional
	@Rollback(true) //동작 안함
	@Test
	public void insertMoives() {
		//given
		String id = "Tester1234";
		String pw = "Tester1234";
		String nickName = "테스터";
		
		
		
//		//when
//		int id = moviesDAO.insert(dto);
//		MoviesDTO result = moviesDAO.selectByID(id);
//		
//		//then
//		assertThat(result.getTitle()).isEqualTo(title);
//		assertThat(result.getGenre()).isEqualTo(genre);
	}
}
