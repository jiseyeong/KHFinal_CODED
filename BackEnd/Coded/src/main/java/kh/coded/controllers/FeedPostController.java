package kh.coded.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.TodayWeatherDTO;

@RestController
@RequestMapping("/feedpost/")
public class FeedPostController {

	@GetMapping("/selectfeedlist")
	public String selectFeedList() {
		return "";
	}

	@GetMapping("/insertfeedpost")
	public String insertFeedPost(FeedPostDTO fdto, HashTagDTO hdto) {
		return "";
	}
	
}
