package utils;

public class StaticValue {
	public static final int REFRESH_TIME = 60 * 60 * 24 * 7; // 일주일. 바꿀 경우 'jwtProvider'내부의 값도 바꿔줄 것.

	public static final int FEEDCOUNTPERSCROLL = 20;
	
	public static final String REFRESH_TOKEN_COOKIE_NAME = "CodedRefreshToken"; // 바꿀 경우 프론트에서 쿠키 찾는 것도 바꿔야 함.
	
	public final static String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "coded_oauth2_auth_request";
	public final static String REDIRECT_URI_PARAM_COOKIE_NAME = "redirce_uri";
	public final static int COOKIE_EXPIRE_SECOND = 18000;
}
