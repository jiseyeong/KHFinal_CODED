package kh.coded.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.ReportDTO;


import kh.coded.repositories.FeedReportDAO;

@Service
public class FeedReportService {
	
	@Autowired
	private FeedReportDAO feedReportDAO;
    
    public List<FeedPostDTO> selectFeedList(int userNo) {
        return null;
    }
    
	public List<ReportDTO> selectAllFeedReport(){
		return feedReportDAO.selectAll();
	}
	// 피드 신고 접수
	public int insertReport(ReportDTO dto) {
		return feedReportDAO.insertReport(dto);
	}

}
