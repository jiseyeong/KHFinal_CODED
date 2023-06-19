package kh.coded.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

	@GetMapping("searchById") //유저 아이디로 검색 시 유저 정보, 피드 뽑기
	public ResponseEntity<?> selectMemberById(@RequestParam String userId) {
		MemberDTO member = memberService.selectByID(userId);
		List<FeedPostDTO> list = feedpostService.selectFeedList(member.getUserNo());
		Map<String,Object> result = new HashMap<>();
		result.put("MemberDTO", member);
		result.put("feedlist", list);
		
		return ResponseEntity.ok().body(result);
	}
    
    
	@GetMapping("searchByNickname") //유저 닉네임으로 검색 시 유저 정보, 피드 뽑기
	public ResponseEntity<?> selectMemberByNickname(@RequestParam String userNickName) {
		System.out.println(userNickName);
		MemberDTO member = memberService.selectMemberByNickName(userNickName);
		List<FeedPostDTO> list = feedpostService.selectFeedList(member.getUserNo());
		Map<String,Object> result = new HashMap<>();
		result.put("MemberDTO", member);
		result.put("feedlist", list);

		return ResponseEntity.ok().body(result); 
	}

	@GetMapping("searchByHashs") //해쉬태그로 검색 시 피드 뽑기
	public ResponseEntity<?> selectByHashs(@RequestParam String hashTag) {
		List<HashTagDTO> tagId = feedpostService.searchByHashs(hashTag);
		List<FeedPostDTO> feedposts = new ArrayList<>();
		for(HashTagDTO hashTagDTO : tagId) {
			List<PostHashsDTO> postHashs = feedpostService.searchByPostHashs(hashTagDTO.getTagId());
			
			for(PostHashsDTO dto : postHashs) {
				feedposts.add(feedpostService.searchByFeedPost(dto.getFeedPostId()));
			}
		}
		return ResponseEntity.ok().body(feedposts);
	}

    @GetMapping("/selectFeedNew")
    public ResponseEntity<?> selectFeedNew() {
    	List<FeedPostDTO> list = feedpostService.selectFeedNew();
    	List<PhotoDTO> list2 = new ArrayList<>();
    	
    	for(FeedPostDTO e : list) {
    		list2.add(photoService.selectFeedThumnail(e.getFeedPostId()));
    	}
    	Map<String,Object> result = new HashMap<>();
    	result.put("feedpostDTO", list);
    	result.put("photoDTO",list2);
    	
    	return ResponseEntity.ok().body(result);
    }
    
    @GetMapping("/selectFeedlike")
    public ResponseEntity<?> selectFeedlike(){
    	List<FeedPostDTO> list = feedpostService.selectFeedlike();
    	List<PhotoDTO> list2 = new ArrayList<>();
    	for(FeedPostDTO e : list) {
    		list2.add(photoService.selectFeedThumnail(e.getFeedPostId()));
    	}
    	Map<String,Object> result = new HashMap<>();
    	result.put("FeedPostDTO",list);
    	result.put("photoDTO", list2);
    	return ResponseEntity.ok().body(result);
    }
    
	@GetMapping("/selectAllFeedPost/")
	public ResponseEntity<?> selectFeedList(
			@RequestParam(value = "cpage", required = false, defaultValue = "1")
			int cpage) {
		System.out.println(cpage);

		Map<String, Object> map = feedpostService.selectAllFeedPost(cpage);
		return ResponseEntity.ok().body(map);
	}

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
		FeedPostDTO feedPost = feedpostService.searchByFeedPost(feedPostId); // 글 정보
		List<PhotoDTO> photoList = photoService.selectByFeedpostId(feedPostId); // 사진
		MemberDTO writeMember = memberService.selectByUserNo(feedPost.getUserNo()); // 멤버정보
		
		Map<String,Object> data = new HashMap<>();
		data.put("feedPost", feedPost);
		data.put("photoList", photoList);
		data.put("writeMember", writeMember);
		
		return ResponseEntity.ok().body(data);
				
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
