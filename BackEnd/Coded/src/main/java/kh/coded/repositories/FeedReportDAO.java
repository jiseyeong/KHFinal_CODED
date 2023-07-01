package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	public int insertReport(ReportDTO dto) {
		return mybatis.insert("Report.insertReport",dto);
	}
	
	public ReportDTO selectOneByReportId(int reportId){
		return mybatis.selectOne("Report.selectOneByReportId", reportId);
	}
	
	public List<ReportDTO> selectFeedPagingList(int startNum, int endNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("Report.selectFeedPagingList", data);
	}
	
	public int getRecordCountByFeedList() {
		return mybatis.selectOne("Report.getRecordCountByFeedList");
	}
	
	public List<ReportDTO> selectFeedPagingListByWriterUserNo(int writerUserNo, int startNum, int endNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("writerUserNo", writerUserNo);
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("Report.selectFeedPagingListByWriterUserNo", data);
	}
	
	public int getRecordCountByFeedListAndWriterUserNo(int writerUserNo) {
		return mybatis.selectOne("Report.getRecordCountByFeedListAndWriterUserNo", writerUserNo);
	}
	
	public List<ReportDTO> selectFeedPagingListByTitle(String title, int startNum, int endNum){
		Map<String, Object> data = new HashMap<>();
		data.put("title", title);
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("Report.selectFeedPagingListByTitle", data);
	}
	
	public int getRecordCountByFeedListAndTitle(String title) {
		return mybatis.selectOne("Report.getRecordCountByFeedListAndTitle", title);
	}
	
	public List<ReportDTO> selectFeedPagingListByTargetId(int targetId, int startNum, int endNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("targetId", targetId);
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("Report.selectFeedPagingListByTargetId", data);
	}
	
	public int getRecordCountByFeedListAndTargetId(int targetId) {
		return mybatis.selectOne("Report.getRecordCountByFeedListAndTargetId", targetId);
	}
}