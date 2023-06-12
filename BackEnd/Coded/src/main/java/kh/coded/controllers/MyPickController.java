package kh.coded.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.MemberDTO;
import kh.coded.security.JwtProvider;
import kh.coded.services.FeedPostService;
import kh.coded.services.MemberService;

@RestController
@RequestMapping("/mypick/")
public class MyPickController {

	@Autowired
	private MemberService memberService;
	@Autowired
	private FeedPostService feedPostService;
	@Autowired
	private JwtProvider jwtProvider;
	
	@GetMapping("/selectMember")
	public ResponseEntity<?> selectMemberByUserNo(@RequestHeader(value="authorization") String authorization) {
		String accessToken = authorization.substring("Bearer ".length(), authorization.length());
		int userNo = 0;
		if(jwtProvider.validateToken(accessToken)) {
			userNo = jwtProvider.getLoginUserNo(accessToken);
		};
		MemberDTO dto = memberService.selectByUserNo(userNo);
		if (dto != null) {
		return ResponseEntity.ok().body(dto);
		};
		return ResponseEntity.badRequest().body("Load Failed");
	};
	
	@GetMapping("/selectFeedPost")
	public ResponseEntity<?> selectFeedPostByUserNo(@RequestHeader(value="authorization") String authorization) {
		String accessToken = authorization.substring("Bearer".length(), authorization.length());
		int userNo = 0;
		if(jwtProvider.validateToken(accessToken)) {
			userNo = jwtProvider.getLoginUserNo(accessToken);
		};
		FeedPostDTO dto = feedPostService.selectByUserNo(userNo);
		if (dto != null) {
			return ResponseEntity.ok().body(dto);
			};
			return ResponseEntity.badRequest().body("Load Failed");
	};
	
}
