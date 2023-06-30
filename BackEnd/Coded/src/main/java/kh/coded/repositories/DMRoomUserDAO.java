package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	public void deleteUserDMRoomUser(int roomId, int userNo) {
		Map<String, Integer> map = new HashMap<>();
		map.put("roomId", roomId);
		map.put("userNo", userNo);
		mybatis.delete("DMRoomUser.deleteUserDMRoomUser", map);
	}
}
