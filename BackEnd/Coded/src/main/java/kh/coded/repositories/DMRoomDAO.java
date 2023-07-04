package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.DMRoomDTO;
import kh.coded.dto.DMRoomListDTO;


@Repository
public class DMRoomDAO {

	@Autowired
	private SqlSessionTemplate mybatis;

	// userNo를 통해 DmRoomId를 가져옴
	public List<DMRoomListDTO> selectByUserNo(int userNo) {
		return mybatis.selectList("DMRoom.selectByUserNo",userNo);
	}
	
	// DM방 하나 만들어 RoomId return 
	public int createRoomId(DMRoomDTO DMRoomDto) {
		mybatis.insert("DMRoom.createRoomId",DMRoomDto);
		return DMRoomDto.getRoomId();
	}
	
	public void deleteRoomByRoomId(int roomId) {
		mybatis.delete("DMRoom.deleteByRoomId", roomId);
	}
	
	public void deleteRoomByUserNo(int userNo) {
		mybatis.delete("DMRoom.deleteByUserId", userNo);
	}

	public List<DMRoomDTO> selectPagingList(int startNum, int endNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("DMRoom.selectPagingList", data);
	}
	
	public int getRecordCount() {
		return mybatis.selectOne("DMRoom.getRecordCount");
	}
	
	public DMRoomDTO selectOneByRoomId(int roomId) {
		return mybatis.selectOne("DMRoom.selectOneByRoomId", roomId);
	}
	
	
	
}
