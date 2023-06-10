package kh.coded.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kh.coded.dto.MemberDTO;
import kh.coded.dto.MemberPrincipal;
import kh.coded.repositories.AddressCoordDAO;
import kh.coded.repositories.MemberDAO;
import kh.coded.security.JwtProvider;
import utils.CookieUtil;
import utils.StaticValue;

@Service
public class MemberService implements UserDetailsService {

	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private AddressCoordDAO addressCoordDAO;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberDTO user = memberDAO.selectMemberById(username);
		if(user == null) {
			throw new UsernameNotFoundException(username + "은 없는 회원입니다.");
		}
		return new MemberPrincipal(user);
//		return User.builder()
//				.username(user.getUserId())
//				.password(user.getPw())
//				.roles(user.getRole())
//				.build();
	}
	
	public String login(HttpServletResponse response, MemberDTO member) throws Exception {
		//TokenDTO token = jwtProvider.createAllLoginToken(member);
		CookieUtil.addHttpOnlyCookie(response, "CodedRefreshToken", "Bearer " + jwtProvider.createLoginRefreshToken(member), StaticValue.REFRESH_TIME);
		
		UserDetails authentication = this.loadUserByUsername(member.getUserId());
		//여기 내부에 있는 super.setAuthenticated(true)가 실행될 필요가 있음
		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(authentication.getUsername(), null, authentication.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		return jwtProvider.createLoginAccessToken(member);
	}
	
	public void logout(HttpServletRequest request, HttpServletResponse response) {
		SecurityContextHolder.getContext().setAuthentication(null);
		CookieUtil.deleteCookie(request, response, "CodedRefreshToken");
	}
	
	public String refreshToken(HttpServletRequest request, HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
		if(cookies.length > 0) {
			String refreshToken = Arrays.stream(cookies)
					.filter(c -> c.getName().equals("CodedRefreshToken"))
					.findFirst().map(Cookie::getValue)
					.orElse(null);
			if(refreshToken != null && refreshToken.startsWith("Bearer ")) {
				refreshToken = refreshToken.substring("Bearer ".length(), refreshToken.length());
				try {
					MemberDTO member = this.selectByUserNo(jwtProvider.getLoginUserNo(refreshToken));
					UserDetails authentication = this.loadUserByUsername(member.getUserId());
					//여기 내부에 있는 super.setAuthenticated(true)가 실행될 필요가 있음
					UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(authentication.getUsername(), null, authentication.getAuthorities());
					SecurityContextHolder.getContext().setAuthentication(auth);
					
					CookieUtil.addHttpOnlyCookie(response, "CodedRefreshToken", "Bearer " + jwtProvider.createLoginRefreshToken(member), StaticValue.REFRESH_TIME);
					
					jwtProvider.createLoginAccessToken(member);
				}catch(Exception e) {
					return null;
				}
			}
		}
		// 쿠키(리프레시 토큰)이 없는 경우
		return null;
	}
	
	public MemberDTO selectByID(String userId) {
		return memberDAO.selectMemberById(userId);
	}
	
	public MemberDTO selectByUserNo(int userNo) {
		return memberDAO.selectMemberByUserNo(userNo);
	}
	
	public MemberDTO selectMemberByNickName(String userNickName) {
		return memberDAO.selectMemberByNickName(userNickName);
	}
	
	public boolean isMemberId(String userId) {
		return memberDAO.isMemberId(userId);
	}
	public int join(MemberDTO dto) {
		dto.setPw(passwordEncoder.encode(dto.getPw()));
		return memberDAO.insertMember(dto);
	}
	
	public MemberDTO isValidMember(String id, String pw) {
		MemberDTO member = memberDAO.selectMemberById(id);
		if(member != null) {
			if(passwordEncoder.matches(pw, member.getPw())) {
				return member;
			}
		}
		return null;
	}
	
	public List<String> getAddress1(){
		return addressCoordDAO.selectDistinctAddress1();
	}
	
	public List<String> getAddress2(String address1){
		return addressCoordDAO.selectScopedAddress2(address1);
	}
	
	public int deleteMember(String userId, String pw) {
		return memberDAO.deleteMember(userId, pw);
	}
	
	public int updateMember(MemberDTO dto) {
		return memberDAO.updateMember(dto);
	}
	
	public int updatePw(String userId,String pw) {
		String encodingPw = passwordEncoder.encode(pw);
		return memberDAO.updatePw(userId,encodingPw);
	}
}
