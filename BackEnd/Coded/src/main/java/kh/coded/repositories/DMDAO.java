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

	public List<DMDTO> selectDMRoomList(int roomId) {
		return mybatis.selectList("DM.selectDMRoomList",roomId);
	}
	
	
}
