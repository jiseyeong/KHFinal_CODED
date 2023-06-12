//package kh.coded.security.oauth;
//
//import java.io.IOException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
//import org.springframework.stereotype.Component;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import utils.CookieUtil;
//import utils.StaticValue;
//
//@Component
//public class OAuth2FailureHandler extends SimpleUrlAuthenticationFailureHandler{
//	
//	//@Autowired
//	//private OAuth2AuthorizationRequestBasedOnCookieRepository oauth2CookieRepository;
//	
//	@Override
//	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
//			AuthenticationException exception) throws IOException, ServletException {
//		String targetUrl = CookieUtil.getCookie(request, StaticValue.REDIRECT_URI_PARAM_COOKIE_NAME)
//				.map(Cookie::getValue)
//				.orElse(("/login"));
//		
////		targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
////				.queryParam("error", exception.getLocalizedMessage())
////				.build().toUriString();
//		
//		//oauth2CookieRepository.removeAuthorizationRequestCookies(request, response);
//		
//		//getRedirectStrategy().sendRedirect(request, response, targetUrl);
//				
//	}
//}
