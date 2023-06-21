package kh.coded.repositories;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.DMRoomDTO;

@Repository
public class DMRoomDAO {

	@Autowired
	private SqlSessionTemplate mybatis;

	// userNo를 통해 DmRoomId를 가져옴
	public List<DMRoomDTO> selectByUserNo(int userNo) {
		return mybatis.selectList("DMRoom.selectByUserNo",userNo);
	}

	public int createRoomId() {
		return mybatis.insert("DMRoom.createRoomId");
	}

	
}
