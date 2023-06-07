package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import kh.coded.dto.MemberDTO;
import kh.coded.repositories.MemberDAO;

@Service
public class MemberService implements UserDetailsService {

	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberDTO user = memberDAO.selectMemberById(username);
		if(user == null) {
			throw new UsernameNotFoundException(username + "은 없는 회원입니다.");
		}
		return User.builder()
				.username(user.getUserId())
				.password(user.getPw())
				.roles(user.getRole())
				.build();
	}
	
	public MemberDTO selectByID(String userId) {
		return memberDAO.selectMemberById(userId);
	}
	
	public MemberDTO selectByUserNo(int userNo) {
		return memberDAO.selectMemberByUserNo(userNo);
	}
	
	public boolean isMemberId(String userId) {
		return memberDAO.isMemberId(userId);
	}
	public int join(MemberDTO dto) {
		dto.setPw(passwordEncoder.encode(dto.getPw()));
		return memberDAO.insertMember(dto);
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
