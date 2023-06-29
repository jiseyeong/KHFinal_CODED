package kh.coded.repositories;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.ReportDTO;

@Repository
public class FeedReportDAO {

	@Autowired
	private SqlSessionTemplate mybatis;
	
	public void FeedReport() {
		mybatis.update("");
	}
	
	public List<ReportDTO> selectAll(){
		return mybatis.selectList("Report.selectAll");
	}
}