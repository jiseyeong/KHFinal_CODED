package kh.coded.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kh.coded.dto.MemberWithProfileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.coded.dto.MemberDTO;
import kh.coded.dto.MemberPrincipal;
import kh.coded.security.JwtProvider;
import kh.coded.services.AddressCoordService;
import kh.coded.services.MemberService;

@RestController
//@RequestMapping("/auth/")
public class AuthenticationController {

	//	@Autowired
	//	private RefreshTokenService refService;
	@Autowired
	private MemberService memberService;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private AddressCoordService addressCoordService;

	//이하 리다이렉트 URI 들은 실제 서버 올리기 전엔 9999로 고쳐야 함.
	@Value("${spring.security.oauth2.client.registration.kakao.client-id}")
	private String KAKAO_CLIENT_ID;
	@Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
	private String KAKAO_CLIENT_SECRET; 
	private String KAKAO_REDIRECT_URI="http://localhost:3000/login/oauth2/code/kakao";
	@Value("${spring.security.oauth2.client.registration.naver.client-id}")
	private String NAVER_CLIENT_ID;
	@Value("${spring.security.oauth2.client.registration.naver.client-secret}")
	private String NAVER_CLIENT_SECRET; 
	private String NAVER_REDIRECT_URI="http://localhost:3000/login/oauth2/code/naver";
	@Value("${spring.security.oauth2.client.registration.google.client-id}")
	private String GOOGLE_CLIENT_ID;
	@Value("${spring.security.oauth2.client.registration.google.client-secret}")
	private String GOOGLE_CLIENT_SECRET;
	private String GOOGLE_REDIRECT_URI="http://localhost:3000/login/oauth2/code/google";

	@PostMapping(value="/auth/member")
	public ResponseEntity<?> join(
			@RequestParam(value="userId") String id,
			@RequestParam(value="pw") String pw,
			@RequestParam(value="userNickName") String nickName,
			@RequestParam(value="email") String email,
			@RequestParam(value="address1", required=false, defaultValue="서울특별시") String address1, //구현하고 나면 required false 풀어야 하며, 현재는 테스트로 값을 넣어야 함.
			@RequestParam(value="address2", required=false, defaultValue="서울") String address2
			) {		
		try {
			//userNo, id, pw, nickname, bio, favBrand, email, Address1, Address2,  Role, NaverToken, KakaoToken
			//MemberDTO dto = new MemberDTO(0, id, pw, nickName, null, null, email, address1, address2, Role.USER.getValue(), null, null, null);
			MemberDTO dto = new MemberDTO(id, pw, nickName, email, address1, address2);
			int userNo = memberService.join(dto);
			return ResponseEntity.ok().body(userNo);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@DeleteMapping(value="/auth/member")
	public ResponseEntity<?> deleteMember(
			@RequestParam(value="userId") String userId,
			@RequestParam(value="pw") String pw) {
		int result = memberService.deleteMember(userId, pw);
		return ResponseEntity.ok().body(null);
	}

	@PutMapping(value="/auth/member")
	public ResponseEntity<?> updateMember(
			@RequestParam(value="dto") MemberDTO dto) {
		int result = memberService.updateMember(dto);
		return ResponseEntity.ok().body(null);
	}

	@PutMapping(value="/auth/updatePw")
	public ResponseEntity<?> updatePw(
			@RequestParam(value="userId") String userId,
			@RequestParam(value="pw") String pw) {
		int result = memberService.updatePw(userId,pw);
		return ResponseEntity.ok().body(null);
	}

	@GetMapping(value="/auth/login")
	public ResponseEntity<?> login(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value="userId") String id,
			@RequestParam(value="pw") String pw
			) throws Exception{
		//로그인 로직 실행	
		MemberDTO member = memberService.isValidMember(id, pw);
		if(member != null) {
			Map<String, Object> data = new HashMap<>();
			String accessToken = memberService.login(response, member);
			data.put("accessToken", accessToken);
			data.put("userNo", member.getUserNo());
			data.put("userId", id);
			return ResponseEntity.ok().body(data);
		}
		return ResponseEntity.badRequest().body("Login Failed");
	}

	//여기서조차 badRequest 시 login 페이지로 넘겨주면 됨.
	@GetMapping(value="/auth/refresh")
	public ResponseEntity<?> jwtRefresh(
			HttpServletRequest request,
			HttpServletResponse response
			//@RequestParam(value="refreshToken", required=false) String refreshToken
			){
		//리프레시 토큰은 안에서 쿠키로 재발급함.
		String accessToken = memberService.refreshToken(request, response);
		if(accessToken != null) {
			Map<String, Object> data = new HashMap<>();
			data.put("accessToken", accessToken);
			data.put("userNo", jwtProvider.getLoginUserNo(accessToken));
			data.put("userId", jwtProvider.getLoiginUserID(accessToken));
			return ResponseEntity.ok().body(data);
		}
		return ResponseEntity.badRequest().body("Refresh Failed. Please Login");
	}

	@GetMapping("/auth/logout")
	public ResponseEntity<?> logout(
			HttpServletRequest request,
			HttpServletResponse response
			){
		memberService.logout(request, response);
		return ResponseEntity.ok().body(null);
	}

	@GetMapping(value = "/auth/userNo")
	public ResponseEntity<?> getUserNo(
			@RequestHeader(value="authorization") String authorization
			) {
		String accessToken = authorization.substring("Bearer ".length(), authorization.length());
		if(jwtProvider.validateToken(accessToken)) {
			return ResponseEntity.ok().body(jwtProvider.getLoginUserNo(accessToken));
		};
		return ResponseEntity.badRequest().body("유효하지 않은 토큰입니다.");
	}
	
	@GetMapping(value = "/auth/userDTO")
	public ResponseEntity<?> getUser(
			@RequestHeader(value="authorization") String authorization
			)
	{
		String accessToken = authorization.substring("Bearer ".length(), authorization.length());
		if(jwtProvider.validateToken(accessToken)) {
			MemberDTO member = memberService.selectByUserNo(jwtProvider.getLoginUserNo(accessToken));
			if(member != null) {
				member.setPw("");
				return ResponseEntity.ok().body(member);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 토큰을 사용했거나 없는 유저입니다.");
	}

	@GetMapping(value="/auth/isMember")
	public boolean isMember(@RequestParam(value="userId") String userId) {
		boolean result = memberService.isMemberId(userId);
		return result;
	}

	@GetMapping(value="/auth/isMemberByEmail")
	public boolean isMemberByEmail(@RequestParam(value="email") String email) {
		return memberService.isMemberByEmail(email);
	}

	@GetMapping(value="/auth/memberIdByEmail")
	public ResponseEntity<String> selectMemberIdByEmail(@RequestParam(value="email") String email){
		String memberId = memberService.selectMemberIdByEmail(email);

		if(memberId != null) {
			return ResponseEntity.ok().body(memberId);			
		}
		return ResponseEntity.badRequest().body("해당 이메일의 아이디가 없습니다.");
	}
	
	@PostMapping("/auth/send-mail/pw")
	public ResponseEntity<?> sendPasswordMail(
			@RequestParam(value="email") String toEmail,
			@RequestParam(value="userId") String userId,
			@RequestParam(value="userNickName") String userNickName
			){
		MemberDTO member = memberService.selectMemberForPwSend(userId, userNickName, toEmail);
		if(member!=null) {
			String subject = "[KH Coded]임시 새 비밀번호 발급";
			memberService.sendMail(member, subject);			
			return ResponseEntity.ok().body("새 비밀번호를 이메일로 보내드렸습니다.");
		}
		return ResponseEntity.badRequest().body("일치하지 않는 정보가 있습니다.");
	}

	@GetMapping(value="/auth/getAddress1List")
	public ResponseEntity<?> getAddress1List(){
		return ResponseEntity.ok().body(addressCoordService.getAddressCoordList_depth1());
	}

	@GetMapping(value="/auth/getAddress2List")
	public ResponseEntity<?> getAddress2List(
			@RequestParam(value="address1") String address1
			){
		return ResponseEntity.ok().body(addressCoordService.getAddressCoordList_depth2(address1));
	}


	@GetMapping(value="/login/oauth2/kakao/codeInfo")
	public ResponseEntity<?> kakaoLoginCodeInfo(){
		Map<String, String> data = new HashMap<>();
		data.put("client_id", KAKAO_CLIENT_ID);
		data.put("redirect_uri", KAKAO_REDIRECT_URI);
		return ResponseEntity.ok().body(data);
	}

	@GetMapping(value="/login/oauth2/kakao/tokenInfo")
	public ResponseEntity<?> kakaoLoginTokenInfo(
			//@RequestParam(value="code") String code
			){
		Map<String, String> data = new HashMap<>();
		data.put("client_id", KAKAO_CLIENT_ID);
		data.put("client_secret", KAKAO_CLIENT_SECRET);
		data.put("redirect_uri", KAKAO_REDIRECT_URI);
		return ResponseEntity.ok().body(data);
	}

	@GetMapping(value="/login/oauth2/kakao")
	public ResponseEntity<?> kakaoLogin(
			@RequestParam(value="accessToken") String accessToken,
			HttpServletResponse response,
			@AuthenticationPrincipal MemberPrincipal auth) throws Exception{
		//"T"이거나, "F"이거나, 엑세스 토큰 값이 나올 것임.
		String result = memberService.kakaoLogin(accessToken, response, auth);
		if(result.equals("T")) {
			//accepted - header 202. 원래라면 put, post 용.
			return ResponseEntity.accepted().body("T");
		}else if(result.equals("F")) {
			//badRequest - header 400
			return ResponseEntity.accepted().body("F");
		}
		//ok - header 200
		return ResponseEntity.ok().body(result);
	}

	@GetMapping(value="/login/oauth2/naver/codeInfo")
	public ResponseEntity<?> naverLoginInfo(){
		Map<String, String> data = new HashMap<>();
		data.put("client_id", NAVER_CLIENT_ID);
		data.put("redirect_uri", NAVER_REDIRECT_URI);
		return ResponseEntity.ok().body(data);
	}

	@GetMapping(value="/login/oauth2/naver")
	public ResponseEntity<?> naverLogin(
			@RequestParam(value="code") String code,
			HttpServletResponse response,
			@AuthenticationPrincipal MemberPrincipal auth) throws Exception{
		//엑세스 토큰에 "T"이거나, "F"이거나, 엑세스 토큰 값이 나올 것임.
		String result = memberService.naverLogin(code, response, auth);
		if(result.equals("T")) {
			//accepted - header 202. 원래라면 put, post 용.
			return ResponseEntity.accepted().body("T");
		}else if(result.equals("F")) {
			return ResponseEntity.accepted().body("F");
		}
		//ok - header 200
		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping(value="/login/oauth2/google/codeInfo")
	public ResponseEntity<?> googleLoginTokenInfo(){
		Map<String, String> data = new HashMap<>();
		data.put("client_id", GOOGLE_CLIENT_ID);
		data.put("redirect_uri", GOOGLE_REDIRECT_URI);
		
		return ResponseEntity.ok().body(data);
	}
	
	@GetMapping(value="/login/oauth2/google")
	public ResponseEntity<?> googleLogin(
			@RequestParam(value="code") String code,
			HttpServletResponse response,
			@AuthenticationPrincipal MemberPrincipal auth) throws Exception{
		String result = memberService.googleLogin(code, response, auth);
		if(result.equals("T")) {
			return ResponseEntity.accepted().body("T");
		}else if(result.equals("F")) {
			return ResponseEntity.accepted().body("F");
		}
		return ResponseEntity.ok().body(result);
	}

	// 테스트 용도 (피드 작성 폼 구성 시 삭제 예정)
 	@GetMapping(value="/auth/selectUserList")
	public ResponseEntity<?> selectUserList(){
		List<MemberDTO> userList = memberService.selectUserList();
		return ResponseEntity.ok().body(userList);
	}

	@GetMapping(value="/auth/selectUserListWithProfile")
	public ResponseEntity<?> selectUserListWithProfile(){
		List<MemberWithProfileDTO> userList = memberService.selectUserListWithProfile();
		return ResponseEntity.ok().body(userList);
	}
}
