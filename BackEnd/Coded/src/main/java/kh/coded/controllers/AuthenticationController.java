package kh.coded.controllers;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.coded.dto.MemberDTO;
import kh.coded.security.JwtProvider;
import kh.coded.services.MemberService;
import kh.coded.services.RefreshTokenService;
import utils.CookieUtil;

@RestController
@RequestMapping("/auth/")
public class AuthenticationController {
	
//	@Autowired
//	private RefreshTokenService refService;
	@Autowired
	private MemberService memberService;
	@Autowired
	private JwtProvider jwtProvider;
	
	@PostMapping(value="join")
	public ResponseEntity<?> join(
			@RequestParam(value="userId") String id,
			@RequestParam(value="pw") String pw,
			@RequestParam(value="userNickName") String nickName,
			@RequestParam(value="address1", required=false, defaultValue="서울특별시") String address1, //구현하고 나면 required false 풀어야 하며, 현재는 테스트로 값을 넣어야 함.
			@RequestParam(value="address2", required=false, defaultValue="서울") String address2
			) {		
		try {
			//userNo, id, pw, nickname, bio, favBrand, Address1, Address2,  Role, NaverToken, KakaoToken
			//MemberDTO dto = new MemberDTO(0, id, pw, nickName, null, null, address1, address2, Role.USER.getValue(), null, null, null);
			MemberDTO dto = new MemberDTO(id, pw, nickName, address1, address2);
			int userNo = memberService.join(dto);
			return ResponseEntity.ok().body(userNo);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PostMapping(value="login")
	public ResponseEntity<?> login(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value="userId") String id,
			@RequestParam(value="pw") String pw
			//@RequestParam(value="userId") String id,
			//@RequestParam(value="pw") String pw
			) throws Exception{
		//로그인 로직 실행	
		MemberDTO member = memberService.isValidMember(id, pw);
		if(member != null) {
			String accessToken = memberService.login(response, member);
			return ResponseEntity.ok().body(accessToken);
		}else {
			return ResponseEntity.badRequest().body("Login Failed");
		}
	}
	
	//badRequest 시 login 페이지로 넘겨주면 됨.
	@PostMapping(value="refresh")
	public ResponseEntity<?> jwtRefresh(
			HttpServletRequest request,
			HttpServletResponse response
			){
		String accessToken = memberService.refreshToken(request, response);
		if(accessToken != null) {
			return ResponseEntity.ok().body(accessToken);
		}
		return ResponseEntity.badRequest().body("Refresh Failed. Please Login");
	}
	
	@GetMapping("logout")
	public ResponseEntity<?> logout(
			HttpServletRequest request,
			HttpServletResponse response
			){
		memberService.logout(request, response);
		return ResponseEntity.ok().body(null);
	}
	
	@GetMapping(value = "getUserNo")
	public ResponseEntity<?> getUserNo(
			@RequestHeader(value="authorization") String authorization
			) {
		String accessToken = authorization.substring("Bearer ".length(), authorization.length());
		if(jwtProvider.validateToken(accessToken)) {
			return ResponseEntity.ok().body(jwtProvider.getLoginUserNo(accessToken));
		};
		return ResponseEntity.badRequest().body("Test Failed");
	}

	@PostMapping(value="isMember/{userId}")
	public String isMember(@RequestParam(value="userId") String userId) {
		boolean result = memberService.isMemberId(userId);
		return String.valueOf(result);
	}
	
	@PostMapping(value="deleteMember")
	public String deleteMember(
			@RequestParam(value="userId") String userId,
			@RequestParam(value="pw") String pw) {
		int result = memberService.deleteMember(userId, pw);
		return "redirect:/";
	}
	
	@PostMapping(value="updateMember")
	public String updateMember(
			@RequestParam(value="dto") MemberDTO dto) {
		int result = memberService.updateMember(dto);
		return "redirect:/";
	}
	
	@PostMapping(value="updatePw")
	public String updatePw(
			@RequestParam(value="userId") String userId,
			@RequestParam(value="pw") String pw) {
		int result = memberService.updatePw(userId,pw);
		return "redirect:/";
	}
}
