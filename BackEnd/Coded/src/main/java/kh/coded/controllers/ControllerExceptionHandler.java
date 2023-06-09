package kh.coded.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionHandler {
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> exceptionHandler(Exception e) {
		e.printStackTrace();
		return ResponseEntity.badRequest().body("서버 오류입니다.");
	}
}
