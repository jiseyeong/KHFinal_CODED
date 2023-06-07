package kh.coded.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import kh.coded.dto.MemberPrincipal;
import kh.coded.services.MemberService;

@Component
public class MemberAuthenticationProvider implements AuthenticationProvider {
	
	@Autowired
	private MemberService memberService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String userName = authentication.getName(); // 사용자 입력 ID
		String pw = (String) authentication.getCredentials(); // 사용자 입력 pw
		
		MemberPrincipal memberPrincipal = (MemberPrincipal)memberService.loadUserByUsername(userName);
		
		//비밀번호 비교
		String dbPassword = memberPrincipal.getPassword();
		
		if(!passwordEncoder.matches(pw, dbPassword)) {
			System.out.println("사용자 비밀번호가 일치하지 않습니다.");
			throw new BadCredentialsException("아이디 또는 비밀번호가 일치하지 않습니다.");
		}
		
		// 그 외 할 거 있으면 여기 추가
		
		//인증이 끝나면 반환.
		//해당 객체는 SecurityContextHolder.getContext()에 저장된다.
		return new UsernamePasswordAuthenticationToken(memberPrincipal, null, memberPrincipal.getAuthorities());
	}
	
	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}
