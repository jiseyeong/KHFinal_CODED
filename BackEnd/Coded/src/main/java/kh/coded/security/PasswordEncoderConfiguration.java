package kh.coded.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordEncoderConfiguration {
	@Bean
	public PasswordEncoder passwordEncoder() {
		//return new BCryptPasswordEncoder();
		return new SHA512PasswordEncoder();
	}
}
