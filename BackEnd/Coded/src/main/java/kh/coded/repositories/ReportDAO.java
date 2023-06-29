package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.MemberDTO;
import kh.coded.dto.ReportDTO;
import org.springframework.stereotype.Repository;

@Repository
public class ReportDAO {

	
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public List<MemberDTO> selectFollowingList(int ToUserNo) {
		return mybatis.selectList("Follow.selectFollowingList", ToUserNo);
}

	public int ReportOk(int writerUserNo, String title) {
		Map<String, String> data = new HashMap<>();
		data.put("writerUserNo", Integer.toString(writerUserNo));
		data.put("title", title);
		
		return mybatis.insert("Report.ReportOk",data);
		
	}
}
