package kh.coded.controllers;

import kh.coded.config.Settings;
import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.MemberDTO;
import kh.coded.services.FeedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.TodayWeatherDTO;

@RestController
@RequestMapping("/feedpost/")
public class FeedPostController {

    @Autowired
    private FeedPostService feedPostService;

    @GetMapping("/selectTestScrollFeedList/")
    public ResponseEntity<?> selectFeedList(
            @RequestParam(value = "cpage", required = false, defaultValue = "1")
            int cpage) {
//        List<FeedPostDTO> list = feedPostService.selectTestFeedList();
        List<FeedPostDTO> list = feedPostService.selectTestScrollFeedList(cpage);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/insertfeedpost")
    public String insertFeedPost(FeedPostDTO fdto, HashTagDTO hdto) {
        return "";
    }

}
