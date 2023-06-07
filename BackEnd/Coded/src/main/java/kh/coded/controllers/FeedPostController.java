package kh.coded.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feedpost/")
public class FeedPostController {

    @GetMapping("/selectfeedlist")
    public String selectFeedList(){
        return "";
    }
}

