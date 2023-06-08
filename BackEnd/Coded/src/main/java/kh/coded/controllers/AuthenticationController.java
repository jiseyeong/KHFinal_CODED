package kh.coded.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import kh.coded.repositories.TokenDTO;
import kh.coded.security.JwtProvider;
import kh.coded.services.MemberService;
import kh.coded.services.RefreshTokenService;

@RestController
@RequestMapping("/auth/")
public class AuthenticationController {
	
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private RefreshTokenService refService;
	@Autowired
	private MemberService memberService;
	
	@PostMapping(value="join")
	public ResponseEntity<?> join(
			@RequestParam(value="userId") String id,
			@RequestParam(value="pw") String pw,
			@RequestParam(value="userNickName") String nickName,
			@RequestParam(value="address1", required=false, defaultValue="서울특별시") String address1, //구현하고 나면 required false 풀어야 하며, 현재는 테스트로 값을 넣어야 함.
			@RequestParam(value="address2", required=false, defaultValue="서울") String address2
			) {
		//임시
//		String address1 = null;
//		String address2 = null;
		
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
	
	@RequestMapping
	public Authentication auth() {
		return SecurityContextHolder.getContext().getAuthentication();
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
		
		System.out.println(id);
		System.out.println(pw);
		
		MemberDTO member = memberService.isValidMember(id, pw);
		
		if(member != null) {
			TokenDTO token = jwtProvider.createAllLoginToken(member);
			return ResponseEntity.ok().body(token);
		}else {
			return ResponseEntity.badRequest().body("Login Failed");
		}
		
//		MemberDTO dto = new MemberDTO();
	}
	
	@GetMapping(value = "fail")
	public String failed() {
		return "실패";
	}
	
	@GetMapping(value = "getUserNo")
	public ResponseEntity<?> getUserNo(
			@RequestParam(value="accessToken") String accessToken
			) {
		if(jwtProvider.validateToken(accessToken)) {
			return ResponseEntity.ok().body(jwtProvider.getLoginUserNo(accessToken));
		};
		return ResponseEntity.badRequest().body("Test Failed");
	}
	
	//@PostMapping(value="logout")
	//자동 기능 지원됨

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
