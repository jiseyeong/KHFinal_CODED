package kh.coded.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.coded.dto.TempMemberDTO;
import kh.coded.dto.TempMemberDTO.Role;
import kh.coded.services.MemberService;

@RestController
@RequestMapping("/auth/")
public class TempAuthenticationController {
	@Autowired
	private MemberService memberService;
	
	@PostMapping(value="join")
	public void join(
			@RequestParam(value="userID") String id,
			@RequestParam(value="pw") String pw,
			@RequestParam(value="address1") String address1,
			@RequestParam(value="address2") String address2
			) {
		//userNo, id, pw, nickname, bio, favBrand, Address1, Address2, NaverToken, KakaoToken, Role
		TempMemberDTO dto = new TempMemberDTO(0, id, pw, null, null, null, address1, address2, null, null, Role.USER);
	}
	
	// 로그인 및 JWT 토큰 발급
	@PostMapping(value="login")
	public void login(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value="userID") String id,
			@RequestParam(value="pw") String pw
			) throws Exception{
		
		//로그인 로직 실행
	}
}
