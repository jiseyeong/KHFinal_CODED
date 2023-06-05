//package kh.coded.config;
//
//import java.io.IOException;
//import java.util.Arrays;
//import java.util.Collections;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import kh.coded.dto.MemberDTO;
//import kh.coded.services.MemberService;
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter{
//	
//	private final JwtProvider jwtProvider;
//	private final static String HEADER_AUTHORIZATION = "Authorization";
//	private final static String TOKEN_PREFIX = "Bearer ";
//	
//	@Autowired
//	private MemberService memberService;
//	
//	public JwtAuthenticationFilter(JwtProvider jwtProvider) {
//		this.jwtProvider = jwtProvider;
//	}
//	
//	private static final List<String> EXCLUDE_URL = Collections.unmodifiableList(
//			Arrays.asList(
//					"/static/**",
//					"/favicon.ico",
//					"/view/join",
//					"/auth/join",
//					"/view/login",
//					"/auth/login"
//					));
//
//	@Override
//	protected void doFilterInternal(
//			HttpServletRequest request,
//			HttpServletResponse response,
//			FilterChain filterChain)
//			throws ServletException, IOException {
//		
////		String authorizationHeader = request.getHeader(HEADER_AUTHORIZATION);
////		String token = this.getAccessToken(authorizationHeader);
//		
//		String token = Arrays.stream(request.getCookies())
//				.filter(c -> c.getName().equals("Coded-Token"))
//				.findFirst().map(Cookie::getValue)
//				.orElse(null);
//		
//		MemberDTO member = null;
//		String jwt = null;
//		
//		if(token != null && token.startsWith("Bearer ")) {
//			jwt = token.substring(0, "Bearer ".length());
//			try {
//				member = memberService.selectByUserNo(jwtProvider.getLoginUserNo(jwt));
//			}catch(Exception e) {
//				e.printStackTrace();
//			}
//		}else {
//			System.out.println("JWT 토큰이 Bearer String 으로 시작하지 않습니다.");
//		}
//		
//		if(member != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//			//MemberDTO dto = memberService.selectByUserNo(userNo);
//			
//			if(jwtProvider.validateToken(jwt)) {
//				Authentication auth = jwtProvider.getAuthentication(token);
//				SecurityContextHolder.getContext().setAuthentication(auth);
//			}
//		}
//		try {
//			if(member != null) {
//				jwtProvider.reCreateLoginRefreshToken(member);
//			}
//		}catch(Exception e) {
//			e.printStackTrace();
//		}
////		if(token != null && jwtProvider.validateToken(token)) {
////			token = token.split(" ")[1].trim();
////			Authentication auth = jwtProvider.getAuthentication(token);
////			SecurityContextHolder.getContext().setAuthentication(auth);
////		}
//		filterChain.doFilter(request, response);
//	}
//	
//	@Override
//	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//		return EXCLUDE_URL.stream().anyMatch(exclude -> exclude.equalsIgnoreCase(request.getServletPath()));
//	}
//	
////	private String getAccessToken(String authorizationHeader) {
////		if(authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
////			return authorizationHeader.substring(TOKEN_PREFIX.length());
////		}
////		return null;
////	}
//}
