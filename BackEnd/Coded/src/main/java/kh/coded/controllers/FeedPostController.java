package kh.coded.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.MemberDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.dto.PostHashsDTO;
import kh.coded.services.FeedPostService;
import kh.coded.services.MemberService;
import kh.coded.services.PhotoService;
import org.springframework.web.multipart.MultipartFile;


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
    		list2.add(photoService.selectByFeedpostId(e.getFeedPostId()));
    	}
    	Map<String,Object> result = new HashMap<>();
    	result.put("feedpostDTO", list);
    	result.put("photoDTO",list2);
    	
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
	public String selectFeedList(){
		List<FeedPostDTO> list = feedpostService.selectTestFeedList();
		return "";
	}

	@PostMapping("/insertTest/")
	public ResponseEntity<?> insertTest(
			@RequestParam("title") String title,
			@RequestParam("files")List<MultipartFile> files,
			HttpServletRequest request
			) throws IOException {
		String realPath = request.getServletContext().getRealPath("test");
		photoService.insertTest(realPath,files);
		System.out.println(request.getServletContext().getRealPath("test"));
		return ResponseEntity.ok().body("success");
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> exceptionHandler(Exception e){
		e.printStackTrace();
		return ResponseEntity.badRequest().body(e.getMessage());
	}
}
