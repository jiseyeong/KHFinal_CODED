//package kh.coded.config.oauth.deprecated;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import kh.coded.repositories.RefreshTokenDAO;
//import kh.coded.services.MemberService;
//import kh.coded.services.OAuth2UserCustomService;
//
//@Configuration
//public class WebOAuthSecurityConfiguration {
//	@Autowired
//	private OAuth2UserCustomService oAuth2UserCustomService;
//	@Autowired
//	private JwtProvider tokenProvider;
//	@Autowired
//	private RefreshTokenDAO refreshTokenDAO;
//	@Autowired
//	private MemberService userService;
//	
//	@Bean
//	public WebSecurityCustomizer configure() {
//		return (web) -> web.ignoring()
//					.requestMatchers("/img/**", "/css/**", "/js/**");
//	}
//	
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//		http.csrf().disable()
//				.httpBasic().disable()
//				.formLogin().disable()
//				.logout().disable();
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//		
//		http.addFilterBefore(this.tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
//		
//		http.authorizeHttpRequests((request) -> request
//								.requestMatchers("/api/token").permitAll()
//								.requestMatchers("/api/**").authenticated()
//								.anyRequest().permitAll()
//								);
//		
//		http.oauth2Login()
//				.loginPage("/login")
//				.authorizationEndpoint()
//				.authorizationRequestRepository(oAuth2AuthorizationRequestbasedOnCookieRepository())
//				.and()
//				.successHandler(oAuth2SuccessHandler())
//				.userInfoEndpoint()
//				.userSErvice(oAuth2UserCustomService);
//		
//		http.logout()
//			.logoutSuccessUrl("/");
//	}
//	
//	@Bean
//	public OAuth2SuccessHandler oAuth2SuccessHandler() {
//		return new OAuth2SuccessHandler(tokenProvider, refreshTokenDAO, oAuth2AuthorizationRequestbasedOnCookieRepository(),userService);
//	}
//	
//	@Bean
//	public JwtAuthenticationFilter tokenAuthenticationFilter() {
//		return new JwtAuthenticationFilter(tokenProvider);
//	}
//	
//	@Bean
//	public oAuth2AuthorizationRequestbasedOnCookieRepository oAuth2AuthorizationRequestbasedOnCookieRepository() {
//		return new oAuth2AuthorizationRequestbasedOnCookieRepository();
//	}
//	
//	@Bean
//	public BCryptPasswordEncoder bCryptPasswordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//}
