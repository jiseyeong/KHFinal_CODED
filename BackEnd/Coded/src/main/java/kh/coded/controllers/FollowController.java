package kh.coded.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/follow/")
public class FollowController {

	@GetMapping("/selectfollowinglist")
    public String selectFollowingList(){
        return "";
    }
	
	@GetMapping("/selectfollowerlist")
    public String selectFollowerList(){
        return "";
    }
	
	@GetMapping("/insertfollow")
    public String insertFollow(){
        return "";
    }
	
	@GetMapping("/deletefollow")
    public String deleteFollow(){
        return "";
    }
	
}
