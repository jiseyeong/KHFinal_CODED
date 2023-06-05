//package kh.coded.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import jakarta.servlet.DispatcherType;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration {
//	
////	@Autowired
////	private JwtProvider jwtProvider;
////	@Autowired
////	private UserDetailsService userService;
//	
////	@Bean
////	public WebSecurityCustomizer configure() {
////		return (web) -> web.ignoring()
////					.requestMatchers("/static/**")
////					.requestMatchers("/resources/**")
////					.requestMatchers("/css/**")
////					.requestMatchers("/vendor/**")
////					.requestMatchers("/js/**")
////					.requestMatchers("/favicon*/**")
////					.requestMatchers("/img/**");
////	}
//	
////	@Bean
////	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
////		http.csrf().disable().cors().disable()
////				.authorizeHttpRequests((request) -> request
////						.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
////						.requestMatchers("/", "/images/**", "/view/join", "/auth/join", "/view/login", "/auth/login").permitAll()
////						.anyRequest().authenticated()
////				)
////				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////				.and()
////				.addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)
////				.formLogin((login) -> login
////						.loginPage("/view/login") // 커스텀 로그인 페이지 지정
////						.loginProcessingUrl("/login-submit") // submit 받을 url
////						.usernameParameter("userID") // submit 할 아이디
////						.passwordParameter("pw")     // submit 할 비밀번호
////						.defaultSuccessUrl("/", true)
////						.permitAll()
////				)
////				.logout()
////				.logoutSuccessUrl("/login")
////				//.invalidateHttpSession(true)
////				;
////		
////		return http.build();
////	}
//	
////	@Bean
////	public AuthenticationManager authenticationManager(
////			HttpSecurity http,
////			PasswordEncoder passwordEncoder,
////			UserDetailsService userDetailsService)
////					throws Exception{
////		
////		return http.getSharedObject(AuthenticationManagerBuilder.class)
////					.userDetailsService(userService)
////					.and()
////					.build();
////	}
//	
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//	
//}
