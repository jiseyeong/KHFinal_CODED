package kh.coded.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.ReportDTO;
import kh.coded.repositories.ReportDAO;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.ReportDTO;
import kh.coded.repositories.FeedReportDAO;

@Service
public class FeedReportService {
	
	@Autowired
	private FeedReportDAO feedReportDAO;
    

	@Autowired
	private ReportDAO reportdao;

	public int ReportOk(int writerUserNo, String title) {
		
			return reportdao.ReportOk(writerUserNo,title);
		
	}

    public List<FeedPostDTO> selectFeedList(int userNo) {
        return null;
    }
    
	public List<ReportDTO> selectAllFeedReport(){
		return feedReportDAO.selectAll();

	}

}
