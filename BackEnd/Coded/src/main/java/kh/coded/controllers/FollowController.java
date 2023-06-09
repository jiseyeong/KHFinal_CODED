package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.MemberDTO;
import kh.coded.services.FollowService;

@RestController
@RequestMapping("/follow/")
public class FollowController {

	@Autowired
	private FollowService followService;

	@GetMapping(value = "selectfollowinglist")
	public ResponseEntity<?> selectFollowingList(int ToUserId) {
		try {
			List<MemberDTO> FollowingList = followService.selectFollowingList(ToUserId);
			return ResponseEntity.ok().body(FollowingList);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	@GetMapping(value = "selectfollowerlist")
	public ResponseEntity<?> selectFollowerList(int FromUserId) {
		try {
			List<MemberDTO> FollowerList = followService.selectFollowerList(FromUserId);
			return ResponseEntity.ok().body(FollowerList);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PutMapping(value = "insertfollow")
	public ResponseEntity<?> insertFollow(int ToUserId, int FromUserId) {
		try {
			int insertFollow = followService.insertFollow(ToUserId, FromUserId);
			return ResponseEntity.ok().body(insertFollow);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@DeleteMapping(value = "deletefollow")
	public ResponseEntity<?> deleteFollow(int ToUserId, int FromUserId) {
		try {
			int insertFollow = followService.deleteFollow(ToUserId, FromUserId);
			return ResponseEntity.ok().body(insertFollow);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}
