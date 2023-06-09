package kh.coded.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.services.FollowService;

@RestController
@RequestMapping("/follow/")
public class FollowController {
	
	@Autowired
    private FollowService followService;

	@GetMapping("/selectfollowinglist")
    public String selectFollowingList(int ToUserId){
		followService.selectFollowingList(ToUserId);
        return "";
    }
	
	@GetMapping("/selectfollowerlist")
    public String selectFollowerList(int FromUserId){
		followService.selectFollowerList(FromUserId);
        return "";
    }
	
	@PutMapping("/insertfollow")
    public String insertFollow(int ToUserId, int FromUserId){
		followService.insertFollow(ToUserId, FromUserId);
        return "";
    }
	
	@DeleteMapping("/deletefollow")
    public String deleteFollow(int ToUserId, int FromUserId){
		followService.deleteFollow(ToUserId, FromUserId);
        return "";
    }
	
}
