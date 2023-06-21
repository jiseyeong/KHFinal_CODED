package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.MemberDTO;
import kh.coded.services.FollowService;

@RestController
@RequestMapping("/follow/")
public class FollowController {

	@Autowired
	private FollowService followService;

	@GetMapping(value = "selectfollowinglist")
	public ResponseEntity<?> selectFollowingList(@RequestParam int ToUserNo) {
		try {
			List<MemberDTO> FollowingList = followService.selectFollowingList(ToUserNo);
			return ResponseEntity.ok().body(FollowingList);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	@GetMapping(value = "selectfollowerlist")
	public ResponseEntity<?> selectFollowerList(@RequestParam int FromUserNo) {
		try {
			List<MemberDTO> FollowerList = followService.selectFollowerList(FromUserNo);
			return ResponseEntity.ok().body(FollowerList);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping(value = "isFollow")
	public ResponseEntity<?> isFollow(@RequestParam int ToUserNo, @RequestParam int FromUserNo) {
		try {
			boolean isFollow = followService.isFollow(ToUserNo, FromUserNo);
			if (isFollow) {
				int deleteFollow = followService.deleteFollow(ToUserNo, FromUserNo);
				return ResponseEntity.ok().body(deleteFollow);
			} else {
				int insertFollow = followService.insertFollow(ToUserNo, FromUserNo);
				return ResponseEntity.ok().body(insertFollow);
			}
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

//	@PutMapping(value = "insertfollow")
//	public ResponseEntity<?> insertFollow(@RequestParam int ToUserNo, @RequestParam int FromUserNo) {
//		try {
//			int insertFollow = followService.insertFollow(ToUserNo, FromUserNo);
//			return ResponseEntity.ok().body(insertFollow);
//		} catch (Exception e) {
//			return ResponseEntity.badRequest().body(e.getMessage());
//		}
//	}
//
//	@DeleteMapping(value = "deletefollow")
//	public ResponseEntity<?> deleteFollow(@RequestParam int ToUserNo, @RequestParam int FromUserNo) {
//		try {
//			int deleteFollow = followService.deleteFollow(ToUserNo, FromUserNo);
//			return ResponseEntity.ok().body(deleteFollow);
//		} catch (Exception e) {
//			return ResponseEntity.badRequest().body(e.getMessage());
//		}
//	}
}
