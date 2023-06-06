package kh.coded.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.coded.dto.MemberDTO;
import kh.coded.dto.MemberDTO.Role;
import kh.coded.services.MemberService;
import kh.coded.services.RefreshTokenService;

@RestController
@RequestMapping("/auth/")
public class AuthenticationController {
	
	@Autowired
	private RefreshTokenService refService;
	@Autowired
	private MemberService memberService;
	
	@PostMapping(value="join")
	public int join(
			@RequestParam(value="userID") String id,
			@RequestParam(value="pw") String pw,
			@RequestParam(value="userNickName") String nickName
//			@RequestParam(value="address1") String address1,
//			@RequestParam(value="address2") String address2
			) {
		//임시
		String address1 = null;
		String address2 = null;
		
		//userNo, id, pw, nickname, bio, favBrand, Address1, Address2, NaverToken, KakaoToken, Role
		MemberDTO dto = new MemberDTO(0, id, pw, nickName, null, null, address1, address2, null, null, Role.USER);
		
		System.out.println(id);
		System.out.println(pw);
		System.out.println(nickName);
		
		return 1;
	}
	
	@PostMapping(value="login")
	public void login(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value="userID") String id,
			@RequestParam(value="pw") String pw
			) throws Exception{
		
		//로그인 로직 실행
		
		
//		MemberDTO dto = new MemberDTO();
	}
	
	//@PostMapping(value="logout")
	//자동 기능 지원됨

}
