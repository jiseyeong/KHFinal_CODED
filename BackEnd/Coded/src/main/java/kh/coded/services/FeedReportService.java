package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.ReportDTO;
import kh.coded.repositories.ReportDAO;

@Service
public class FeedReportService {
    
	@Autowired
	private ReportDAO reportdao;

	public int ReportOk(int writerUserNo, String title) {
		
			return reportdao.ReportOk(writerUserNo,title);
		
	}

	public List<FeedPostDTO> selectFeedList(int userNo) {
		return null;
	}

}
