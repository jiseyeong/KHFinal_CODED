package kh.coded.repositories;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.DMRoomUserDTO;

@Repository
public class DMRoomUserDAO {
	
	@Autowired
	private SqlSessionTemplate mybatis;

	public List<DMRoomUserDTO> selectByUserNo(int userNo) {
		return mybatis.selectOne("DMRoomUser.selectByUserNo",userNo);
	}

}
