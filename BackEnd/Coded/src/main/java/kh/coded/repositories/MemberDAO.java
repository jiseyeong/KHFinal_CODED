package kh.coded.repositories;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.MemberDTO;

@Repository
public class MemberDAO {
	@Autowired
	private SqlSessionTemplate mybatis;

	public MemberDTO selectMemberById(String userID) {
		return mybatis.selectOne("Member.selectMemberById",userID);
	}

	public MemberDTO selectMemberByUserNo(int userNo) {
		return mybatis.selectOne("Member.selectMemberByUserNo",userNo);
	}

	public boolean isMemberId(String userID) { //아이디 중복확인
		return mybatis.selectOne("Member.isMemberId",userID);
	}
	public int insertMember(MemberDTO dto) { //회원가입
		mybatis.insert("Member.insertMember",dto);
		return dto.getUserNo();//구현하면 됨. selectKey의 ID값으로 돌려줄 것.
	}

	public int updateMember(MemberDTO dto) { //회원수정
		return mybatis.update("Member.updateMember",dto);
	}
	
	public int deleteMember(String userID,String pw) { //회원탈퇴
		Map<String,String> map = new HashMap<>();
		map.put("userID", userID);
		map.put("userPw", pw);
		return mybatis.delete("Member.deleteMember",map);
	}
}
