package kh.coded.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.DispatcherType;
import kh.coded.services.OAuth2UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
	
	@Autowired
	private OAuth2UserService oAuth2UserService;
	
	private final String loginPage = "/login";
	
	@Bean
	public WebSecurityCustomizer configure() {
		return (web) -> web.ignoring()
					.requestMatchers("/static/**")
					.requestMatchers("/resources/**")
					.requestMatchers("/css/**")
					.requestMatchers("/vendor/**")
					.requestMatchers("/js/**")
					.requestMatchers("/favicon*/**")
					.requestMatchers("/img/**");
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.csrf().disable().cors().disable()
				.authorizeHttpRequests((request) -> request
						.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
						//임시적으로 모든 접속에 대해서 체크 안하고 넘김.
						//.requestMatchers("/**").permitAll()
						//특정 접속은 체크 안하고 넘김.
						.requestMatchers("/", "/images/**", "/view/join", "/auth/join", "/view/login", "/auth/login").permitAll()
						//나머지 접속은 체크하고 넘김.
						.anyRequest().authenticated()
				)
				.formLogin((login) -> login
						.loginPage(loginPage) // 커스텀 로그인 페이지 지정
						.loginProcessingUrl("/login-submit") // submit 받을 url
						.usernameParameter("userID") // submit 할 아이디 (name값)
						.passwordParameter("pw")     // submit 할 비밀번호 (name값)
						.failureForwardUrl("/error")
						.defaultSuccessUrl("/", true)
						.permitAll()
				)
				.exceptionHandling((exception)->exception.accessDeniedPage("/error"))
				.oauth2Login((login)-> login
						.loginPage(loginPage)
						.failureUrl(loginPage)
						.userInfoEndpoint((endpoint)-> endpoint
								.userService(oAuth2UserService)
								)
						)
				.logout((logout) -> logout
						.logoutUrl("/logout") //설정 안하면 '/logout'으로 기본 설정
						.logoutSuccessUrl("/login")
						.invalidateHttpSession(true) //기본 값 true
						.deleteCookies("JSESSIONID") //JSESSIONID 는 톰캣 기본 발급 Session Cookie
						)
				;
		
		return http.build();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(
			HttpSecurity http,
			PasswordEncoder passwordEncoder,
			UserDetailsService userDetailsService)
					throws Exception{
		
		return http.getSharedObject(AuthenticationManagerBuilder.class)
					.userDetailsService(userDetailsService)
					.and()
					.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
