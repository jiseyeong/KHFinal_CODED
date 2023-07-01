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
		return mybatis.selectList("DMRoomUser.selectByUserNo",userNo);
	}
	
	public void deleteUserDMRoomUser(int roomId, int userNo) {
		Map<String, Integer> map = new HashMap<>();
		map.put("roomId", roomId);
		map.put("userNo", userNo);
		mybatis.delete("DMRoomUser.deleteUserDMRoomUser", map);
	}
	
	public List<DMRoomUserDTO> selectByRoomId(int roomId) {
		return mybatis.selectList("DMRoomUser.selectByRoomId", roomId);
	}
	
	public List<DMRoomUserDTO> selectPagingListByUserNo(int userNo, int startNum, int endNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("userNo", userNo);
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("DMRoomUser.selectPagingListByUserNo", data);
	}
	
	public int getRecordCountByUserNo(int userNo) {
		return mybatis.selectOne("DMRoomUser.getRecordCountByUserNo", userNo);
	}

	public void insertUserToRoom(int loginUserNo,int clickuserNo, int roomId) {
		Map<String, Integer> data = new HashMap<>();
		data.put("loginUserNo", loginUserNo);
		data.put("clickuserNo", clickuserNo);
		data.put("roomId", roomId);
		mybatis.insert("DMRoomUser.insertLoginUserToRoom",data);
		mybatis.insert("DMRoomUser.insertClickUserToRoom",data);
		
	}
}
