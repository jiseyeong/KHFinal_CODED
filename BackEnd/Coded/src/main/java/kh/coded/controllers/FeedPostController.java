package kh.coded.controllers;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.MemberDTO;
import kh.coded.services.FeedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedpost/")
public class FeedPostController {

    @Autowired
    private FeedPostService feedPostService;

    @GetMapping("/selectfeedlist/")
    public List<FeedPostDTO> selectFeedList(){
        List<FeedPostDTO> list = feedPostService.selectTestFeedList();
        return list;
    }
}

