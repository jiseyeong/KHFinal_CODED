//package kh.coded.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import kh.coded.dto.MemberDTO;
//import kh.coded.dto.MemberDTO.Role;
//import kh.coded.services.MemberService;
//import kh.coded.services.RefreshTokenService;
//
//@RestController
//@RequestMapping("/auth/")
//public class AuthenticationController {
//	
////	@Autowired
////	private JwtProvider jwtProvider;
//	@Autowired
//	private RefreshTokenService refService;
//	@Autowired
//	private MemberService memberService;
//	
//	@PostMapping(value="join")
//	public void join(
//			@RequestParam(value="userID") String id,
//			@RequestParam(value="pw") String pw,
//			@RequestParam(value="address1") String address1,
//			@RequestParam(value="address2") String address2
//			) {
//		//userNo, id, pw, nickname, bio, favBrand, Address1, Address2, NaverToken, KakaoToken, Role
//		MemberDTO dto = new MemberDTO(0, id, pw, null, null, null, address1, address2, null, null, Role.USER);
//	}
//	
//	// 로그인 및 JWT 토큰 발급
//	@PostMapping(value="login")
//	public void login(
//			HttpServletRequest request,
//			HttpServletResponse response,
//			@RequestParam(value="userID") String id,
//			@RequestParam(value="pw") String pw
//			) throws Exception{
//		
//		//로그인 로직 실행
//		
//		
////		MemberDTO dto = new MemberDTO();
////		//jwt로직
////		TokenDTO tokens = jwtProvider.createAllLoginToken(dto);
////		String accessToken = URLEncoder.encode(tokens.getAccessToken(), "utf-8");
////		String refreshToken = URLEncoder.encode(tokens.getRefreshToken(), "utf-8");
////		
////		CookieUtil.addSecureCookie(response, "Coded-Token", "Bearer " + accessToken, 60 * 60 * 24 * 1);
////		
////		RefreshTokenDTO refresh = new RefreshTokenDTO(0, dto.getUserNo(), "Bearer " + refreshToken);
////		refService.save(refresh);
//	}
//	
////	@PostMapping(value="refresh")
////	public void refresh(
////			@RequestBody Map<String, Object> input,
////			HttpServletRequest request,
////			HttpServletResponse response) throws Exception {
////		
////		String refreshToken = null;
////		MemberDTO dto = null;
////		
////		
////		RefreshTokenDTO rDTO = null;
////		
////		if(rDTO != null) {
////			refreshToken = rDTO.getRefreshToken();
////		}else {
////			return; //false. 실패
////		}
////		
////		boolean tokenFlag = false;
////		try {
////			refreshToken = refreshToken.substring(0, "Bearer ".length());
////			dto = memberService.selectByUserNo(jwtProvider.getLoginUserNo(refreshToken));
////			tokenFlag = true;
////		}catch(Exception e) {
////			e.printStackTrace();
////		}
////		
////		if(!tokenFlag) {
////			return; // false. 실패
////		}
////		
////		//refreshToken 인증 성공 시 accessToken 재발급.
////		//!= null 체크에 해당
////		if(dto != null) {
////			
////			String token = jwtProvider.createLoginAccessToken(dto);
////			String accessToken = URLEncoder.encode(token, "utf-8");
////			
////			CookieUtil.addSecureCookie(response, "Coded-Token", "Bearer " + accessToken, 60 * 60 * 24 * 1);
////		}
////	}
//}
