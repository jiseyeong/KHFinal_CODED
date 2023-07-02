package kh.coded.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.ReportDTO;
import kh.coded.security.JwtProvider;
import kh.coded.services.FeedReportService;

@RestController
@RequestMapping("/feedReport/")
public class ReportController {

	@Autowired
	private FeedReportService feedReportService;
	@Autowired
	private JwtProvider jwtProvider;

	@GetMapping(value = "")
	public ResponseEntity<?> selectNoScrollFeedList(@RequestParam(value = "userNo") int UserNo) 
	{
		try { 
			List<FeedPostDTO> list = feedReportService.selectFeedList(UserNo);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}


	// 피드 신고 접수
	@PostMapping(value = "insertReport")
	public ResponseEntity<?> insertReport(@ModelAttribute ReportDTO dto){
		int reportOk = feedReportService.insertReport(dto);
		return ResponseEntity.ok().body(reportOk);
	}

	@GetMapping(value="report")
	public ResponseEntity<?> selectAllReport(
			@RequestHeader(value="authorization") String authorization
			){
		if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				List<ReportDTO> data = feedReportService.selectAllFeedReport();
				return ResponseEntity.ok().body(data);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
	}
	
	@GetMapping(value="feed")
	public ResponseEntity<?> selectFeedReport(
			@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage,
			@RequestParam(value="searchType") String searchType,
			@RequestParam(value="value") String value
			){
		if(authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if(jwtProvider.validateToken(accessToken)) {
//		        data.put("dataList", dataList);
//		        data.put("naviList", list);
//		        data.put("needPrev", needPrev);
//		        data.put("needNext", needNext);
				if(searchType.equals("none")) {
					Map<String, Object> data = feedReportService.selectFeedReport(cpage);
					return ResponseEntity.ok().body(data);
				}else if(searchType.equals("reportId")) {
					ReportDTO data = feedReportService.selectOneFeedReportByReportId(Integer.parseInt(value));
					return ResponseEntity.ok().body(data);
				}else if(searchType.equals("writerUserNo")) {
					Map<String, Object> data = feedReportService.selectFeedReportByWriterUserNo(Integer.parseInt(value), cpage);
					return ResponseEntity.ok().body(data);
				}else if(searchType.equals("title")) {
					Map<String, Object> data = feedReportService.selectFeedReportByTitle(value, cpage);
					return ResponseEntity.ok().body(data);
				}else if(searchType.equals("targetId")) {
					Map<String, Object> data = feedReportService.selectFeedReportByTargetId(Integer.parseInt(value), cpage);
					return ResponseEntity.ok().body(data);
				}
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
	}
	


}
