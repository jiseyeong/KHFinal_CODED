package kh.coded.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.coded.services.MemberService;

public class SecurityAuthenticationFilter extends OncePerRequestFilter{
	@Autowired
	private MemberService customUserDetailService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String username = "admin";
		
		UserDetails authentication = customUserDetailService.loadUserByUsername(username);
		
		//여기 내부에 있는 super.setAuthenticated(true)가 실행될 필요가 있음
		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(authentication.getUsername(), null, authentication.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);
		filterChain.doFilter(request, response);
	}
}
