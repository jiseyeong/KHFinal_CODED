package kh.coded.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.MemberWithProfileDTO;
import kh.coded.services.FollowService;

@RestController
@RequestMapping("/follow/")
public class FollowController {

    @Autowired
    private FollowService followService;

    @GetMapping(value = "selectfollowinglist") //내가 팔로우 하는 사람들 정보와 팔로우 여부 정보 뽑기 (본인의 마이픽이나 타인의 마이픽)
    public ResponseEntity<?> selectFollowingList(@RequestParam int targetUserNo,
                                                 @RequestParam(value = "myUserNo", required = false, defaultValue = "0") int myUserNo) {
        List<MemberWithProfileDTO> followingList = followService.selectFollowingList(targetUserNo, myUserNo);
        return ResponseEntity.ok().body(followingList);
    }

    @GetMapping(value = "selectfollowerlist") //나를 팔로우 하는 사람들 정보와 팔로우 여부 (본인의 마이픽이나 타인의 마이픽)
    public ResponseEntity<?> selectFollowerList(@RequestParam int targetUserNo,
                                                @RequestParam(value = "myUserNo", required = false, defaultValue = "0") int myUserNo) {
        List<MemberWithProfileDTO> followerList = followService.selectFollowerList(targetUserNo, myUserNo);
        return ResponseEntity.ok().body(followerList);
    }

    @GetMapping(value = "isfollow")
    public ResponseEntity<?> isfollow(@RequestParam int toUserNo, @RequestParam int fromUserNo) {
        boolean isFollow = followService.isFollow(toUserNo, fromUserNo);
        return ResponseEntity.ok().body(isFollow);
    }

    @PostMapping(value = "handleFollow")
    public ResponseEntity<?> handleFollow(@RequestParam int toUserNo, @RequestParam int fromUserNo) {

        boolean isFollow = followService.isFollow(toUserNo, fromUserNo);
        if (!isFollow) {
            int insertFollow = followService.insertFollow(toUserNo, fromUserNo);
            return ResponseEntity.ok().body("insertFollow");
        } else {
            int deleteFollow = followService.deleteFollow(toUserNo, fromUserNo);
            return ResponseEntity.ok().body("deleteFollow");
        }
    }
}
