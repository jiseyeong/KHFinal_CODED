package kh.coded;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import kh.coded.controllers.AuthenticationController;
import kh.coded.dto.MemberDTO;
import kh.coded.services.MemberService;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthenticationTest {
	
	@Autowired
	private AuthenticationController authController;
	@Autowired
	private MemberService memberService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@DisplayName("가입 테스트")
	@Transactional
	@Rollback(false)
	@Test
	public void registerMember() {
		//given
		String id = "tester1234";
		String pw = "tester1234";
		String nickName = "테스터";
		String address1 = "서울특별시";
		String address2 = "서울";
		
		
//		//when
		int userNo = authController.join(id, pw, nickName, address1, address2);
		MemberDTO result = memberService.selectByUserNo(userNo);
//		
		
//		//then
		assertThat(result.getUserId()).isEqualTo(id);
		assertThat(result.getPw()).isEqualTo(passwordEncoder.encode(pw));
		assertThat(result.getUserNickName()).isEqualTo(nickName);
		assertThat(result.getAddress1()).isEqualTo(address1);
		assertThat(result.getAddress2()).isEqualTo(address2);
	}
	
//	@DisplayName("로그인 테스트")
//	@Transactional
//	@Rollback(true)
//	@Test
//	public void loginMember() {
//		//given
//		String id = "tester1234";
//		String pw = "tester1234";
//		
//		
//	}
}
