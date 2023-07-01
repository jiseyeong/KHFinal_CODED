package kh.coded.security;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
	
	//private final static ResponseStatusException rse = new ResponseStatusException(HttpStatus.FORBIDDEN.value(), "Forbidden", null);
	
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		
		System.out.println("Forbidden : " + request.getRequestURI() + " : " + SecurityContextHolder.getContext().getAuthentication());
		response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden : " + accessDeniedException.getMessage());
		
	}
}
