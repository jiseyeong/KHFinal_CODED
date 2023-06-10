package kh.coded.securityconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import kh.coded.security.CustomAccessDeniedHandler;
import kh.coded.security.CustomAuthenticationEntryPoint;
import kh.coded.security.MemberAuthenticationProvider;
import kh.coded.services.MemberService;
import kh.coded.services.OAuth2UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
	
	@Autowired
	private OAuth2UserService oAuth2UserService;
	@Autowired
	private MemberAuthenticationProvider memberAuthenticationProvider;
	@Autowired
	private MemberService memberService;
	@Autowired
	private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	@Autowired
	private CustomAccessDeniedHandler customAccessDeniedHandler;
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	private final String loginPage = "/login";
	private final String[] WEB_IGNORING_LIST = {
			"/static/**",
			"/resources/**",
			"/css/**",
			"/vendor/**",
			"/js/**" ,
			"/img/**",
			"/favicon.ico",
			"/error",
	};
	private final String[] API_WHITE_LIST = {
			"/",
			"/images/**",
			"/register",
			"/auth/join",
			loginPage,
			"/auth/login",
			"/error",
			"/auth/fail",
			"/auth/userNo",
			"/feedList/**",
			"/feedpost/**",
			"/HomePage/**",
			"/feedList",
			"/feedost",
			"/HomePage",
	};
	private final String[] API_USER_LIST = {
			"/test/"
	};
	private final String[] API_ADMIN_LIST = {
			
	};
	
	@Autowired
	public void configure(AuthenticationManagerBuilder auth) throws Exception{
		auth.authenticationProvider(memberAuthenticationProvider);
	}
	
	@Bean
	public WebSecurityCustomizer configure() {
		return (web) -> web.ignoring()
					.requestMatchers(WEB_IGNORING_LIST);

	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
		http.csrf(csrf->csrf.disable());
		//http.cors(cors->cors.disable());
		
		http.formLogin(login -> login.disable());
		http.logout(logout -> logout.disable());
		http.httpBasic(basic -> basic.disable());
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		http.authorizeHttpRequests(authorize ->{
			try {
				authorize
					.requestMatchers(API_WHITE_LIST).permitAll()
					.requestMatchers(API_USER_LIST).hasRole("USER")
					.anyRequest().authenticated();
			}catch(Exception e) {
				throw new RuntimeException(e);
			}			
		});
		
		http.exceptionHandling(exception -> {
			try {
				exception
					.authenticationEntryPoint(customAuthenticationEntryPoint)
					.accessDeniedHandler(customAccessDeniedHandler);
					
			}catch(Exception e) {
				throw new RuntimeException(e);
			}			
		});
		
//		http.oauth2Login(login ->{
//		try {
//			login
//				.loginPage(loginPage)
//				.failureUrl(loginPage)
//				.userInfoEndpoint((endpoint) ->
//										endpoint.userService(oAuth2UserService)
//									);
//		}catch(Exception e) {
//			throw new RuntimeException(e);
//		}
//	});
		
		http.rememberMe(rememberMe -> 
							rememberMe
								.key("myKey")
								.tokenValiditySeconds(60 * 60 * 24 * 7)
								.userDetailsService(memberService)
								.rememberMeParameter("remember-me")
		);
		
		//한 계정 당 하나의 로그인 유지만 가능하도록 하는 설정임.
		http.sessionManagement(session -> session.maximumSessions(1).maxSessionsPreventsLogin(true));
		
		
		return http.build();
	}
	
//	@Bean
//	public AuthenticationManager authenticationManager(
//			HttpSecurity http,
//			PasswordEncoder passwordEncoder,
//			UserDetailsService userDetailsService)
//					throws Exception{
//		
//		return http.getSharedObject(AuthenticationManagerBuilder.class)
//					.userDetailsService(userDetailsService)
//					.and()
//					.build();
//	}
	
}
