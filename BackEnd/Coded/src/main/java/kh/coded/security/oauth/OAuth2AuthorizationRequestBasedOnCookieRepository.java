//package kh.coded.security.oauth;
//
//import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
//import org.springframework.stereotype.Component;
//
//import com.nimbusds.oauth2.sdk.util.StringUtils;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import utils.CookieUtil;
//import utils.StaticValue;
//
//@Component
//public class OAuth2AuthorizationRequestBasedOnCookieRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest>{
//		
//	public OAuth2AuthorizationRequestBasedOnCookieRepository() {
//	}
//	
//	@Override
//	public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request,
//			HttpServletResponse response) {
//		return this.loadAuthorizationRequest(request);
//	}
//	@Override
//	public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
//		return CookieUtil.getCookie(request, StaticValue.OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME)
//				.map(cookie -> CookieUtil.deserialize(cookie, OAuth2AuthorizationRequest.class))
//				.orElse(null);
//	}
//	@Override
//	public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request,
//			HttpServletResponse response) {
//		if(authorizationRequest == null) {
//			this.removeAuthorizationRequestCookies(request, response);
//			return;
//		}
//		try {
//			CookieUtil.addCookie(response, StaticValue.OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME, CookieUtil.serialize(authorizationRequest), StaticValue.COOKIE_EXPIRE_SECOND);
//			String redirectUriAfterLogin = request.getParameter(StaticValue.REDIRECT_URI_PARAM_COOKIE_NAME);
//			if(StringUtils.isNotBlank(redirectUriAfterLogin)) {
//				CookieUtil.addHttpOnlyCookie(response, StaticValue.REDIRECT_URI_PARAM_COOKIE_NAME, redirectUriAfterLogin, StaticValue.COOKIE_EXPIRE_SECOND);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//	
//	public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {
//		CookieUtil.deleteCookie(request, response, StaticValue.OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
//		CookieUtil.deleteCookie(request, response, StaticValue.REDIRECT_URI_PARAM_COOKIE_NAME);
//	}
//}
