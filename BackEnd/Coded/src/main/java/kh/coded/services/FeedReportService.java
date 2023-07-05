package kh.coded.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.ReportDTO;
import kh.coded.repositories.FeedReportDAO;
import utils.StaticValue;

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
	
	public ReportDTO selectOneFeedReportByReportId(int reportId) {
		return feedReportDAO.selectOneByReportId(reportId);
	}
	
	public Map<String, Object> selectFeedReport(int cpage){
		Map<String, Object> data = new HashMap<>();
		
		//1. 전체 글의 개수
        int recordTotalCount = feedReportDAO.getRecordCountByFeedList();
        //2. 페이지당 보여줄 글의 개수
        int recordCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        //3. 페이지당 보여줄 네비게이터의 수
        int naviCountPerPage = StaticValue.NAVICOUNTPERPAGE;

        //4. 1번과 2번 항목에 의해 총 페이지의 개수가 정해짐.
        //전체 글의 개수를 페이지당
        int pageTotalCount = recordTotalCount % recordCountPerPage > 0 ?
                recordTotalCount / recordCountPerPage + 1
                : recordTotalCount / recordCountPerPage;

        if (cpage < 1) {
            cpage = 1;
        } else if (cpage > pageTotalCount) {
            cpage = pageTotalCount;
        }

        int startNavi = (cpage - 1) / naviCountPerPage * naviCountPerPage + 1;
        int endNavi = startNavi + (naviCountPerPage - 1);

        if (endNavi > pageTotalCount) {
            endNavi = pageTotalCount;
        }

        boolean needPrev = true;
        boolean needNext = true;
        ArrayList<Integer> list = new ArrayList<>();

        if (startNavi == 1) {
            needPrev = false;
        }
        if (endNavi == pageTotalCount) {
            needNext = false;
        }
        for (int i = startNavi; i <= endNavi; i++) {
            list.add(i);
        }

        int endNum = cpage * recordCountPerPage;
        int startNum = endNum - (recordCountPerPage - 1);
        List<ReportDTO> dataList = feedReportDAO.selectFeedPagingList(startNum, endNum);
        
        data.put("dataList", dataList);
        data.put("naviList", list);
        data.put("needPrev", needPrev);
        data.put("needNext", needNext);

        return data;
	}
	
	public Map<String, Object> selectFeedReportByWriterUserNo(int writerUserNo, int cpage){
		Map<String, Object> data = new HashMap<>();
		
		//1. 전체 글의 개수
        int recordTotalCount = feedReportDAO.getRecordCountByFeedListAndWriterUserNo(writerUserNo);
        //2. 페이지당 보여줄 글의 개수
        int recordCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        //3. 페이지당 보여줄 네비게이터의 수
        int naviCountPerPage = StaticValue.NAVICOUNTPERPAGE;

        //4. 1번과 2번 항목에 의해 총 페이지의 개수가 정해짐.
        //전체 글의 개수를 페이지당
        int pageTotalCount = recordTotalCount % recordCountPerPage > 0 ?
                recordTotalCount / recordCountPerPage + 1
                : recordTotalCount / recordCountPerPage;

        if (cpage < 1) {
            cpage = 1;
        } else if (cpage > pageTotalCount) {
            cpage = pageTotalCount;
        }

        int startNavi = (cpage - 1) / naviCountPerPage * naviCountPerPage + 1;
        int endNavi = startNavi + (naviCountPerPage - 1);

        if (endNavi > pageTotalCount) {
            endNavi = pageTotalCount;
        }

        boolean needPrev = true;
        boolean needNext = true;
        ArrayList<Integer> list = new ArrayList<>();

        if (startNavi == 1) {
            needPrev = false;
        }
        if (endNavi == pageTotalCount) {
            needNext = false;
        }
        for (int i = startNavi; i <= endNavi; i++) {
            list.add(i);
        }

        int endNum = cpage * recordCountPerPage;
        int startNum = endNum - (recordCountPerPage - 1);
        List<ReportDTO> dataList = feedReportDAO.selectFeedPagingListByWriterUserNo(writerUserNo, startNum, endNum);
        
        data.put("dataList", dataList);
        data.put("naviList", list);
        data.put("needPrev", needPrev);
        data.put("needNext", needNext);

        return data;
	}
	
	public Map<String,Object> selectFeedReportByTitle(String title, int cpage){
		Map<String, Object> data = new HashMap<>();
		
		//1. 전체 글의 개수
        int recordTotalCount = feedReportDAO.getRecordCountByFeedListAndTitle(title);
        //2. 페이지당 보여줄 글의 개수
        int recordCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        //3. 페이지당 보여줄 네비게이터의 수
        int naviCountPerPage = StaticValue.NAVICOUNTPERPAGE;

        //4. 1번과 2번 항목에 의해 총 페이지의 개수가 정해짐.
        //전체 글의 개수를 페이지당
        int pageTotalCount = recordTotalCount % recordCountPerPage > 0 ?
                recordTotalCount / recordCountPerPage + 1
                : recordTotalCount / recordCountPerPage;

        if (cpage < 1) {
            cpage = 1;
        } else if (cpage > pageTotalCount) {
            cpage = pageTotalCount;
        }

        int startNavi = (cpage - 1) / naviCountPerPage * naviCountPerPage + 1;
        int endNavi = startNavi + (naviCountPerPage - 1);

        if (endNavi > pageTotalCount) {
            endNavi = pageTotalCount;
        }

        boolean needPrev = true;
        boolean needNext = true;
        ArrayList<Integer> list = new ArrayList<>();

        if (startNavi == 1) {
            needPrev = false;
        }
        if (endNavi == pageTotalCount) {
            needNext = false;
        }
        for (int i = startNavi; i <= endNavi; i++) {
            list.add(i);
        }

        int endNum = cpage * recordCountPerPage;
        int startNum = endNum - (recordCountPerPage - 1);
        List<ReportDTO> dataList = feedReportDAO.selectFeedPagingListByTitle(title, startNum, endNum);
        
        data.put("dataList", dataList);
        data.put("naviList", list);
        data.put("needPrev", needPrev);
        data.put("needNext", needNext);

        return data;
	}
	
	public Map<String, Object> selectFeedReportByTargetId(int targetId, int cpage){
		Map<String, Object> data = new HashMap<>();
		
		//1. 전체 글의 개수
        int recordTotalCount = feedReportDAO.getRecordCountByFeedListAndTargetId(targetId);
        //2. 페이지당 보여줄 글의 개수
        int recordCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        //3. 페이지당 보여줄 네비게이터의 수
        int naviCountPerPage = StaticValue.NAVICOUNTPERPAGE;

        //4. 1번과 2번 항목에 의해 총 페이지의 개수가 정해짐.
        //전체 글의 개수를 페이지당
        int pageTotalCount = recordTotalCount % recordCountPerPage > 0 ?
                recordTotalCount / recordCountPerPage + 1
                : recordTotalCount / recordCountPerPage;

        if (cpage < 1) {
            cpage = 1;
        } else if (cpage > pageTotalCount) {
            cpage = pageTotalCount;
        }

        int startNavi = (cpage - 1) / naviCountPerPage * naviCountPerPage + 1;
        int endNavi = startNavi + (naviCountPerPage - 1);

        if (endNavi > pageTotalCount) {
            endNavi = pageTotalCount;
        }

        boolean needPrev = true;
        boolean needNext = true;
        ArrayList<Integer> list = new ArrayList<>();

        if (startNavi == 1) {
            needPrev = false;
        }
        if (endNavi == pageTotalCount) {
            needNext = false;
        }
        for (int i = startNavi; i <= endNavi; i++) {
            list.add(i);
        }

        int endNum = cpage * recordCountPerPage;
        int startNum = endNum - (recordCountPerPage - 1);
        List<ReportDTO> dataList = feedReportDAO.selectFeedPagingListByTargetId(targetId, startNum, endNum);
        
        data.put("dataList", dataList);
        data.put("naviList", list);
        data.put("needPrev", needPrev);
        data.put("needNext", needNext);

        return data;
        
	}
}
