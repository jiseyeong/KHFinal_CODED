//package kh.coded.services;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import kh.coded.dto.MemberDTO;
//import kh.coded.repositories.MemberDAO;
//
//@Service
//public class MemberService implements UserDetailsService {
//
//	@Autowired
//	private MemberDAO memberDAO;
////	@Autowired
////	private PasswordEncoder passwordEncoder;
//	
////	@Override
////	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
////		MemberDTO user = memberDAO.selectMemberById(username);
////		if(user == null) {
////			throw new UsernameNotFoundException(username + "은 없는 회원입니다.");
////		}
////		return User.builder()
////				.username(user.getUserID())
////				.password(user.getPw())
////				.roles(user.getRole().getValue())
////				.build();
////	}
//	
//	public MemberDTO selectByID(String userID) {
//		return memberDAO.selectMemberById(userID);
//	}
//	
//	public MemberDTO selectByUserNo(int userNo) {
//		return memberDAO.selectMemberByUserNo(userNo);
//	}
//	
////	public int join(MemberDTO dto) {
////		dto.setPw(passwordEncoder.encode(dto.getPw()));
////		return memberDAO.insertMemeber(dto);
////	}
//}
