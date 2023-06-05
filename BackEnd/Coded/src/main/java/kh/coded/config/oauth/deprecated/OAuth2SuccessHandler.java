package kh.coded.config.oauth.deprecated;
//package kh.coded.config;
//
//import java.io.IOException;
//import java.time.Duration;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import kh.coded.dto.MemberDTO;
//import kh.coded.dto.RefreshTokenDTO;
//import kh.coded.repositories.OAuth2AuthorizationRequestBasedOnCookieRepository;
//import kh.coded.repositories.RefreshTokenDAO;
//import kh.coded.services.MemberService;
//import utils.CookieUtil;
//
//@Component
//public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//	public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
//	public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(14);
//	public static final Duration ACCESS_TOKEN_DURATION = Duration.ofDays(1);
//	public static final String REDIRECT_PATH = "/articles";
//	
//	@Autowired
//	private JwtProvider tokenProvider;
//	@Autowired
//	private RefreshTokenDAO refreshTokenDAO;
//	@Autowired
//	private OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
//	@Autowired
//	private MemberService userService;
//	
//	@Override
//	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//			Authentication authentication) throws IOException, ServletException {
//		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//		MemberDTO user = userService.selectByUserNo((int) oAuth2User.getAttributes().get("userNo"));
//		
//		//리프레시 토큰 생성 -> 저장 -> 쿠키에 저장
//		String refreshToken = tokenProvider.createToken(user,REFRESH_TOKEN_DURATION.toMillis());
//		this.saveTefreshToken(user.getUserNo(), refreshToken);
//		this.addRefreshTokenToCookie(request, response, refreshToken);
//		
//		//액세스 토큰 생성 -> 패스에 엑세스 토큰 추가
//		String accessToken = tokenProvider.createToken(user, ACCESS_TOKEN_DURATION.toMillis());
//		String targetUrl = getTargetUrl(accessToken);
//		
//		//인증 관련 설정값, 쿠키 값 제거
//		this.clearAuthenticationAttributes(request, response);
//		
//		//리다이렉트
//		getRedirectStrategy().sendRedirect(request, response, targetUrl);
//	}
//	
//	private void saveTefreshToken(int userNo, String newREfreshToken) {
//		RefreshTokenDTO refreshToken = refreshTokenDAO.findByRefreshToken(REDIRECT_PATH);
//		
//		refreshTokenDAO.save(refreshToken);
//	}
//	
//	private void addRefreshTokenToCookie(HttpServletRequest request, HttpServletResponse response, String refreshToken) {
//		int cookieMaxAge = (int) REFRESH_TOKEN_DURATION.toSeconds();
//		CookieUtil.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);
//		CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieMaxAge);
//	}
//	
//	private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
//		super.clearAuthenticationAttributes(request);
//		authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
//	}
//	
//	private String getTargetUrl(String token) {
//		return UriComponentsBuilder.fromUriString(REDIRECT_PATH)
//								.queryParam("token", token)
//								.build()
//								.toUriString();
//	}
//}
