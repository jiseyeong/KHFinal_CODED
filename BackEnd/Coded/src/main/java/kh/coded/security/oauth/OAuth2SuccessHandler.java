//package kh.coded.security.oauth;
//
//import java.io.IOException;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import kh.coded.dto.MemberDTO;
//import kh.coded.security.JwtProvider;
//import kh.coded.services.MemberService;
//import utils.CookieUtil;
//import utils.StaticValue;
//
//@Component
//public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
//	
//	@Autowired
//	private JwtProvider tokenProvider;
//	//@Autowired
//	//private OAuth2AuthorizationRequestBasedOnCookieRepository oauth2CookieRepository;
//	@Autowired
//	private MemberService memberService;
//	
//	@Override
//	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//			Authentication authentication) throws IOException, ServletException {
//		
//		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//		String provider = oAuth2User.getAttribute("provider");
//		String providerId = oAuth2User.getAttribute("sub");
//		String userCode = provider+"_"+providerId;
//		
//		Optional<String> redirectUri = CookieUtil.getCookie(request, StaticValue.REDIRECT_URI_PARAM_COOKIE_NAME)
//				.map(Cookie::getValue);
//		String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
//		System.out.println("OAuth 부분 성공. URL : " + targetUrl);
//		MemberDTO member = memberService.selectByID(authentication.getName());
//		String token = tokenProvider.createLoginAccessToken(member);
//		targetUrl =  UriComponentsBuilder.fromUriString(targetUrl)
//				.queryParam("token", token)
//				.build().toUriString();
//		
//		if(response.isCommitted()) {
//			System.out.println("Response has already been committed. Unalbe to redirect to " + targetUrl);
//			return;
//		}
//		
//		super.clearAuthenticationAttributes(request);
//		//oauth2CookieRepository.removeAuthorizationRequestCookies(request, response);
//		getRedirectStrategy().sendRedirect(request, response, targetUrl);
//	}
//	
//}
