package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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


	@PostMapping(value = "/ReportOk") // 구현중
	public ResponseEntity<?> ReportOk
	(@RequestParam(value = "writerUserNo") int writerUserNo,@RequestParam(value = "title") String title){
		try{
			int ReportOk = feedReportService.ReportOk(writerUserNo,title);
			return ResponseEntity.ok().body(ReportOk);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
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
