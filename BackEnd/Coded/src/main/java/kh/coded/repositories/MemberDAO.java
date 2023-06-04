package kh.coded.repositories;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import kh.coded.dto.MemberDTO;

public class MemberDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public MemberDTO getMemberById(String userID) {
		return null; //구현하면 됨
	}
	
	public int insertMemeber(MemberDTO dto) {
		return 0; //구현하면 됨. selectKey의 ID값으로 돌려줄 것.
	}
}
