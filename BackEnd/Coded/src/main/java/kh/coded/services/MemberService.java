package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.coded.dto.MemberDTO;
import kh.coded.dto.MemberPrincipal;
import kh.coded.dto.TokensDTO;
import kh.coded.repositories.AddressCoordDAO;
import kh.coded.repositories.MemberDAO;
import kh.coded.security.JwtProvider;
import utils.CookieUtil;
import utils.StaticValue;

@Service
public class MemberService implements UserDetailsService {

	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private AddressCoordDAO addressCoordDAO;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Value("${spring.security.oauth2.client.registration.kakao.client-id}")
	private String KAKAO_CLIENT_ID;
	@Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
	private String KAKAO_CLIENT_SECRET; 	
	@Value("${spring.security.oauth2.client.registration.naver.client-id}")
	private String NAVER_CLIENT_ID;
	@Value("${spring.security.oauth2.client.registration.naver.client-secret}")
	private String NAVER_CLIENT_SECRET; 

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberDTO user = memberDAO.selectMemberById(username);
		if(user == null) {
			throw new UsernameNotFoundException(username + "은 없는 회원입니다.");
		}
		return new MemberPrincipal(user);
		//		return User.builder()
		//				.username(user.getUserId())
		//				.password(user.getPw())
		//				.roles(user.getRole())
		//				.build();
	}

	public String login(HttpServletResponse response, MemberDTO member) throws Exception {
		//TokenDTO token = jwtProvider.createAllLoginToken(member);
		CookieUtil.addCookie(response, "CodedRefreshToken", "Bearer " + jwtProvider.createLoginRefreshToken(member), StaticValue.REFRESH_TIME);

		UserDetails authentication = this.loadUserByUsername(member.getUserId());
		//여기 내부에 있는 super.setAuthenticated(true)가 실행될 필요가 있음
		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(authentication.getUsername(), null, authentication.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);

		return jwtProvider.createLoginAccessToken(member);
	}

	public void logout(HttpServletRequest request, HttpServletResponse response) {
		SecurityContextHolder.getContext().setAuthentication(null);
		CookieUtil.deleteCookie(request, response, StaticValue.REFRESH_TOKEN_COOKIE_NAME);
	}

	public String refreshToken(HttpServletRequest request, HttpServletResponse response) {
		if(CookieUtil.getCookie(request, StaticValue.REFRESH_TOKEN_COOKIE_NAME).isPresent()) {
			String refreshToken = CookieUtil.getCookie(request, StaticValue.REFRESH_TOKEN_COOKIE_NAME).get().getValue();
			if(refreshToken != null && refreshToken.startsWith("Bearer")) {
				refreshToken = refreshToken.substring("Bearer ".length(), refreshToken.length());
				try {
					MemberDTO member = this.selectByUserNo(jwtProvider.getLoginUserNo(refreshToken));
					UserDetails authentication = this.loadUserByUsername(member.getUserId());
					//여기 내부에 있는 super.setAuthenticated(true)가 실행될 필요가 있음
					UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(authentication.getUsername(), null, authentication.getAuthorities());
					SecurityContextHolder.getContext().setAuthentication(auth);
					
					CookieUtil.deleteCookie(request, response, StaticValue.REFRESH_TOKEN_COOKIE_NAME);
					CookieUtil.addCookie(response, StaticValue.REFRESH_TOKEN_COOKIE_NAME, "Bearer " + jwtProvider.createLoginRefreshToken(member), StaticValue.REFRESH_TIME);
					
					return jwtProvider.createLoginAccessToken(member);
				}catch(Exception e) {
					e.printStackTrace();
					return null;
				}
			}
		}
		// 쿠키(리프레시 토큰)이 없는 경우
		return null;
	}

	public MemberDTO selectByID(String userId) {
		return memberDAO.selectMemberById(userId);
	}

	public MemberDTO selectByUserNo(int userNo) {
		return memberDAO.selectMemberByUserNo(userNo);
	}

	public MemberDTO selectMemberByNickName(String userNickName) {
		return memberDAO.selectMemberByNickName(userNickName);
	}

	public boolean isMemberId(String userId) {
		return memberDAO.isMemberId(userId);
	}
	public int join(MemberDTO dto) {
		dto.setPw(passwordEncoder.encode(dto.getPw()));
		return memberDAO.insertMember(dto);
	}

	public MemberDTO isValidMember(String id, String pw) {
		MemberDTO member = memberDAO.selectMemberById(id);
		if(member != null) {
			if(passwordEncoder.matches(pw, member.getPw())) {
				return member;
			}
		}
		return null;
	}

	public List<String> getAddress1(){
		return addressCoordDAO.selectDistinctAddress1();
	}

	public List<String> getAddress2(String address1){
		return addressCoordDAO.selectScopedAddress2(address1);
	}

	public int deleteMember(String userId, String pw) {
		return memberDAO.deleteMember(userId, pw);
	}

	public int updateMember(MemberDTO dto) {
		return memberDAO.updateMember(dto);
	}

	public int updatePw(String userId,String pw) {
		String encodingPw = passwordEncoder.encode(pw);
		return memberDAO.updatePw(userId,encodingPw);
	}

	public MemberDTO selectMemberByKakaoToken(String token) {
		return memberDAO.selectMemberByKakaoToken(token);
	}

	public MemberDTO selectMemberByNaverToken(String token) {
		return memberDAO.selectMemberByNaverToken(token);
	}

	public String kakaoLogin(String accessToken, HttpServletResponse response, MemberPrincipal auth) throws Exception{
//		//인가 코드로 엑세스 토큰 요청.
//		String accessToken = this.getKakaoAccessToken(code);

		//토큰으로 카카오 API 호출
		Long kakaoId = this.getKakaoUserInfo(accessToken);
		String token = Long.toString(kakaoId);
		MemberDTO member = this.selectMemberByKakaoToken(token);

		if(member == null) {
			//등록 하려 누른 것일 것임.
			if(auth != null) {
				member = memberDAO.selectMemberById(auth.getName());
				memberDAO.updateKakaoToken(member.getUserNo(), token);
				return "T";
			}
		}else {
			return this.login(response, member);
		}
		return "F";
	}

//	private String getKakaoAccessToken(String code) throws Exception{ 
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//		body.add("grant_type", "authorization_code");
//		body.add("client_id", KAKAO_CLIENT_ID);
//		body.add("client_secret", KAKAO_CLIENT_SECRET);
//		body.add("redirect_uri", "http://localhost:9999/login/oauth2/code/kakao");
//		body.add("code", code);
//
//		HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
//		RestTemplate rt = new RestTemplate();
//		rt.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
//		rt.setErrorHandler(new DefaultResponseErrorHandler());
//		ResponseEntity<String> response = rt.exchange(
//				"https://kauth.kakao.com/oauth/token",
//				HttpMethod.POST,
//				kakaoTokenRequest,
//				String.class
//				);
//
//		String responseBody = response.getBody();
//		ObjectMapper objectMapper = new ObjectMapper();
//		JsonNode jsonNode = objectMapper.readTree(responseBody);
//		return jsonNode.get("access_token").asText();
//	}

	private Long getKakaoUserInfo(String accessToken) throws Exception{ //유저 데이터를 얻어옴 (id)
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
		RestTemplate rt = new RestTemplate();
		ResponseEntity<String> response = rt.exchange(
				"https://kapi.kakao.com/v2/user/me",
				HttpMethod.POST,
				kakaoUserInfoRequest,
				String.class
				);

		String responseBody = response.getBody();
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(responseBody);

		Long id = jsonNode.get("id").asLong();

		return id;
	}

	public String naverLogin(String code, HttpServletResponse response, MemberPrincipal auth) throws Exception{
		//인가 코드로 엑세스 토큰 요청.
		String accessToken = this.getNaverAccessToken(code);

		//토큰으로 네이버 API 호출
		Long naverId = this.getNaverUserInfo(accessToken);
		String token = Long.toString(naverId);
		MemberDTO member = this.selectMemberByNaverToken(token);

		if(member == null) {
			//등록 하려 누른 것일 것임.
			if(auth != null) {
				member = memberDAO.selectMemberById(auth.getName());
				memberDAO.updateNaverToken(member.getUserNo(), token);
				return "T";
			}
		}else {
			return this.login(response, member);
		}
		return "F";
	}

	public String getNaverAccessToken(String code) throws Exception{ 
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
		body.add("grant_type", "authorization_code");
		body.add("client_id", NAVER_CLIENT_ID);
		body.add("client_secret", NAVER_CLIENT_SECRET);
		body.add("redirect_uri", "http://localhost:9999/login/oauth2/code/naver");
		body.add("code", code);
		body.add("state","test");

		HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(body, headers);
		RestTemplate rt = new RestTemplate();
		rt.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
		rt.setErrorHandler(new DefaultResponseErrorHandler());
		ResponseEntity<String> response = rt.exchange(
				"https://nid.naver.com/oauth2.0/token",
				HttpMethod.POST,
				naverTokenRequest,
				String.class
				);

		String responseBody = response.getBody();
		ObjectMapper objectMapper = new ObjectMapper();
		System.out.println(responseBody);
		JsonNode jsonNode = objectMapper.readTree(responseBody);
		return jsonNode.get("access_token").asText();
	}

	private Long getNaverUserInfo(String accessToken) throws Exception{ //유저 데이터를 얻어옴 (id)
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		HttpEntity<MultiValueMap<String, String>> naverUserInfoRequest = new HttpEntity<>(headers);
		RestTemplate rt = new RestTemplate();
		ResponseEntity<String> response = rt.exchange(
				"https://openapi.naver.com/v1/nid/me",
				HttpMethod.POST,
				naverUserInfoRequest,
				String.class
				);

		String responseBody = response.getBody();
		ObjectMapper objectMapper = new ObjectMapper();
		System.out.println(responseBody);
		JsonNode jsonNode = objectMapper.readTree(responseBody);

		Long id = jsonNode.get("response").get("id").asLong();

		return id;
	}

    public List<MemberDTO> selectUserList() {
		return memberDAO.selectUserList();
    }
}
