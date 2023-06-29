package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.FeedPostDTO;
import kh.coded.services.FeedReportService;

@RestController
@RequestMapping("/feedReport/")
public class ReportController {

	@Autowired
	private FeedReportService feedReportService;

	@GetMapping(value = "")
	public ResponseEntity<?> selectNoScrollFeedList(@RequestParam(value = "userNo") int UserNo) {
		try {
			List<FeedPostDTO> list = feedReportService.selectFeedList(UserNo);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping(value = "/ReportOk") // 구현중
	public ResponseEntity<?> ReportOk
	(
			@RequestParam(value="type") 
			String type ,
			@RequestParam(value="text") 
			String text
			){
		
		return ResponseEntity.ok().body(feedReportService.ReportOk);
	}



}
