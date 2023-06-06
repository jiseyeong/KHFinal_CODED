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

	public int insertMember(MemberDTO dto) {
		mybatis.insert("Member.insertMember",dto);
		return dto.getUserNo();//구현하면 됨. selectKey의 ID값으로 돌려줄 것.
	}

	public int updateMember(MemberDTO dto) {
		return mybatis.update("Member.updateMember",dto);
	}

	public int deleteMember(String userID,String pw) {
		Map<String,String> map = new HashMap<>();
		map.put("userID", userID);
		map.put("userPw", pw);
		return mybatis.delete("Member.deleteMember",map);
	}
}
