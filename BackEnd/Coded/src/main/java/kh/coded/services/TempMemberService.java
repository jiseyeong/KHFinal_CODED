//package kh.coded.services;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import kh.coded.dto.TempMemberDTO;
//import kh.coded.repositories.MemberDAO;
//
//@Service
//public class TempMemberService {
//	@Autowired
//	private MemberDAO memberDAO;
//	
//	public TempMemberDTO selectByID(String userID) {
//		return memberDAO.selectMemberById(userID);
//	}
//	
//	public TempMemberDTO selectByUserNo(int userNo) {
//		return memberDAO.selectMemberByUserNo(userNo);
//	}
//
//	public int join(TempMemberDTO dto) {
////		dto.setPw(passwordEncoder.encode(dto.getPw()));
//		return memberDAO.insertMember(dto);
//	}
//}
