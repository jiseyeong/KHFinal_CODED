package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	@PostMapping(value = "insertReport") // 구현중
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


}
