package kh.coded.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.FeedCommentDTO;
import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.MemberDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.dto.PostHashsDTO;
import kh.coded.services.FeedPostService;
import kh.coded.services.MemberService;
import kh.coded.services.PhotoService;


@RestController
@RequestMapping("/feedpost/")
public class FeedPostController {

	@Autowired
	private FeedPostService feedpostService;

	@Autowired
	private PhotoService photoService;
	
	@Autowired
	private MemberService memberService;

	@GetMapping(value = "feedpost")
	public ResponseEntity<?> selectNoScrollFeedList(@RequestParam(value = "userNo") int UserNo) {
		try {
			List<FeedPostDTO> list = feedpostService.selectFeedList(UserNo);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PutMapping(value="feedpost")
	public ResponseEntity<?> insertFeedPost(
			@RequestParam(value="fdto") FeedPostDTO fdto,
			@RequestParam(value="hdto") HashTagDTO hdto,
			@RequestParam(value="pdto") PhotoDTO pdto) {
		try {
			Map<String, Integer> result = new HashMap<>();
			int FeedPost = feedpostService.insertFeedPost(fdto);
			int HashTag = feedpostService.insertHashTag(hdto.getHashTag());
			int FeedPhoto = feedpostService.insertFeedPhoto(pdto);
			result.put("FeedPost", FeedPost);
			result.put("HashTag", HashTag);
			result.put("FeedPhoto", FeedPhoto);
			return ResponseEntity.ok().body(result);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// 피드 리스트 전체 뽑기 ( 기본 양식 )
	@GetMapping("/selectAllFeedPost/")
	public ResponseEntity<?> selectFeedList(
			@RequestParam(value = "cpage", required = false, defaultValue = "1")
			int cpage) {
		System.out.println(cpage);

		Map<String, Object> map = feedpostService.selectAllFeedPost(cpage);
		return ResponseEntity.ok().body(map);
	}

	// 해시태그 검색을 통한 피드 리스트 뽑기
	@GetMapping("/selectSearchHashFeedList/{keyword}")
	public ResponseEntity<?> selectSearchFeedListByHashs(
			@RequestParam(value = "cpage", required = false, defaultValue = "1")  int cpage,
			@PathVariable("keyword") String keyword) {
		System.out.println(cpage);

		Map<String, Object> map = feedpostService.selectSearchFeedListByHashs(cpage,keyword);
		return ResponseEntity.ok().body(map);
	}

	// 단순한 피드 내용들 뽑기
	@GetMapping("/selectfeedlist/")
	public ResponseEntity<?> selectFeedList(){
		List<FeedPostDTO> list = feedpostService.selectTestFeedList();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/weeklyFeed")
	public ResponseEntity<?> selectWeeklyFeed(
			@RequestParam(value="currentTemp") int currentTemp,
			@RequestParam(value="currentTempRange") int currentTempRange,
			@RequestParam(value="cpage", required = false, defaultValue = "1") int cpage
			){
		Map<String, Object> data = feedpostService.selectWeeklyFeed(currentTemp, currentTempRange, cpage);
		return ResponseEntity.ok().body(data);
	}
	
	@GetMapping("/selectfeeddetail") //피드 상세
	public ResponseEntity<?> selectFeedDetail(@RequestParam int feedPostId) {
		Map<String,Object> data = feedpostService.selectFeedDetail(feedPostId);
		
		return ResponseEntity.ok().body(data);
				
	}
	
	@PutMapping("/updateFeedPost") //피드 수정
	public ResponseEntity<?> updateFeedPost(@RequestParam int feedPostId, @RequestParam String body) {
		feedpostService.updateFeedPost(feedPostId, body);
		
		return ResponseEntity.ok().body(null);
	}
	
	@DeleteMapping("/deleteFeedPost") //피드 삭제 
	public ResponseEntity<?> deleteFeedPost(@RequestParam int feedPostId) {
		feedpostService.deleteFeedPost(feedPostId);
		
		return ResponseEntity.ok().body(null);
	}

	@PostMapping("/insertFeedLike") //피드 좋아요 입력 & 삭제 
	public ResponseEntity<?> FeedLike(@RequestParam int userNo,@RequestParam int feedPostId) {
		boolean result = feedpostService.isFeedLike(userNo, feedPostId);
		if(!result) {	
			return ResponseEntity.ok().body(feedpostService.insertFeedLike(userNo, feedPostId));
		}else {
			feedpostService.deleteFeedLike(userNo, feedPostId);
			
			return ResponseEntity.ok().body(null);
		}
	}
	
	@PostMapping("/insertFeedScrap") //피드 스크랩 입력 & 삭제 
	public ResponseEntity<?> insertFeedScrap(@RequestParam int userNo,@RequestParam int feedPostId) {
		boolean result = feedpostService.isFeedScrap(userNo, feedPostId);
		if(!result) {
			return ResponseEntity.ok().body(feedpostService.insertFeedLike(userNo, feedPostId));
		}else {
			feedpostService.deleteFeedScrap(userNo, feedPostId);	
			return ResponseEntity.ok().body(null);
		}
	}
	
	@DeleteMapping("/deleteFeedScrap") //피드 스크랩 삭제
	public ResponseEntity<?> deleteFeedScrap(@RequestParam int userNo,@RequestParam int feedPostId) {
		return ResponseEntity.ok().body(null);		
	}
	
	// /feedpost/
	@PostMapping("comment")
	public ResponseEntity<?> insertComment(
			@RequestParam(value="userNo") int userNo,
			@RequestParam(value="feedPostId") int feedPostId,
			@RequestParam(value="body") String body
			){
		return ResponseEntity.ok().body(feedpostService.insertComment(new FeedCommentDTO(0, userNo, feedPostId, 0, body, null, 0)));
	}
	
	@PostMapping("nestedComment")
	public ResponseEntity<?> insertNestedComment(
			@RequestParam(value="userNo") int userNo,
			@RequestParam(value="feedPostId") int feedPostId,
			@RequestParam(value="parentId") int parentId,
			@RequestParam(value="body") String body,
			@RequestParam(value="depth") int depth
			){
		return ResponseEntity.ok().body(feedpostService.insertNestedComment(new FeedCommentDTO(0, userNo, feedPostId, parentId, body, null, depth)));
	}
	
	@PutMapping("commnet")
	public ResponseEntity<?> updateComment(
			@RequestParam(value="feedCommentId") int commentId,
			@RequestParam(value="body") String body
			){
		feedpostService.updateComment(commentId, body);
		return ResponseEntity.ok().body(null);
	}
	
	@DeleteMapping("comment")
	public ResponseEntity<?> deleteComment(
			@RequestParam(value="feedCommentId") int commentId
			){
		feedpostService.deleteComment(commentId);
		return ResponseEntity.ok().body(null);
	}
	
	@GetMapping("comment/depth0")
	public ResponseEntity<?> selectCommentDepth0(
			@RequestParam(value="feedPostId") int feedPostId
			){
		List<FeedCommentDTO> result = feedpostService.selectCommentByFeedPostIdAndDepth0(feedPostId);
		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping("comment/depthN")
	public ResponseEntity<?> selectCommentDepth(
			@RequestParam(value="parentId") int parentId,
			@RequestParam(value="depth") int depth
			){
		List<FeedCommentDTO> result = feedpostService.selectCommentByParentIdAndDepth(parentId, depth);
		return ResponseEntity.ok().body(result);
	}

}
