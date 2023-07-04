package kh.coded.repositories;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.DMDTO;

@Repository
public class DMDAO {
	
	@Autowired
	private SqlSessionTemplate mybatis;

	//방 만드는 select
	public List<DMDTO> selectDMRoomList(int roomId) {
		return mybatis.selectList("DM.selectDMRoomList",roomId);
	}

	//roomId로 채팅내역 조회하는 select
	public List<DMDTO> selectDMbyRoomid(int roomId) {
		return mybatis.selectList("DM.selectDMbyRoomid",roomId);
	}

	public DMDTO inserDM(DMDTO dmDto) {
		mybatis.insert("DM.inserDM",dmDto);
		return dmDto;
	}


	public void insertDMImage(DMDTO dmDto) {
		mybatis.insert("DM.insertDMImage",dmDto);
	}
}
