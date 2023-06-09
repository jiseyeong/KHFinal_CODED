package kh.coded.controllers;

import java.util.HashMap;
import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.services.FeedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.HashTagDTO;

@RestController
@RequestMapping("/feedpost/")
public class FeedPostController {

	@Autowired
	private FeedPostService feedpostService;

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

    @GetMapping("/selectfeedlisttestscroll/")
    public ResponseEntity<?> selectFeedList(
            @RequestParam(value = "cpage", required = false, defaultValue = "1")
            int cpage) {
//        List<FeedPostDTO> list = feedPostService.selectTestFeedList();
        List<FeedPostDTO> list = feedpostService.selectTestScrollFeedList(cpage);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/selectfeedlist/")
    public String selectFeedList(){
        List<FeedPostDTO> list = feedpostService.selectTestFeedList();
        return "";
    }

}
