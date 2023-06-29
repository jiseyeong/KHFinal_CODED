package kh.coded.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.MemberWithProfileDTO;
import kh.coded.repositories.FollowDAO;
import kh.coded.repositories.MemberDAO;

@Service
public class FollowService {

	@Autowired
	private FollowDAO followDAO;
	
	@Autowired
	private MemberDAO memberDAO;
	
	public boolean isFollow(int toUserNo, int fromUserNo) {
		return followDAO.isFollow(toUserNo, fromUserNo);
	}	
	
	public Map<String,Object> selectFollowerList(int toUserNo, int myUserNo) { //나를 팔로우 하는 사람들 정보 뽑기
		List<MemberWithProfileDTO> followerList = memberDAO.selectFollowerList(toUserNo);
		List<Boolean> isFollowList = new ArrayList<>();
		for(MemberWithProfileDTO dto : followerList) {
			isFollowList.add(followDAO.isFollow(dto.getUserNo(), myUserNo));
		}
		Map<String,Object> followerListMap = new HashMap<>();
		followerListMap.put("followerList", followerList);
		followerListMap.put("isFollowerList", isFollowList);
		
		return followerListMap;
	}
	
	public Map<String,Object> selectFollowingList(int fromUserNo, int myUserNo) { //내가 팔로우 하는 사람들 정보 뽑기
		List<MemberWithProfileDTO> followingList = memberDAO.selectFollowingList(fromUserNo);
		List<Boolean> isFollowList = new ArrayList<>();
		for(MemberWithProfileDTO dto : followingList) {
			isFollowList.add(followDAO.isFollow(dto.getUserNo(),myUserNo));
		}
		Map<String,Object> followingListMap = new HashMap<>();
		followingListMap.put("followingList", followingList);
		followingListMap.put("isFollowingList", isFollowList);
		
		return followingListMap;
	}
	
	public int insertFollow(int toUserNo, int fromUserNo) {
		return followDAO.insertFollow(toUserNo, fromUserNo);
	}
	
	public int deleteFollow(int toUserNo, int fromUserNo) {
		return followDAO.deleteFollow(toUserNo, fromUserNo);
	}
}
