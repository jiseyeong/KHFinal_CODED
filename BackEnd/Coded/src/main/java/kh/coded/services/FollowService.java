package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.MemberDTO;
import kh.coded.repositories.FollowDAO;

@Service
public class FollowService {

	@Autowired
	private FollowDAO followDAO;
	
	
	public List<MemberDTO> selectFollowingList(int ToUserId) {
		return followDAO.selectFollowingList(ToUserId);
	}
	
	public List<MemberDTO> selectFollowerList(int FromUserId) {
		return followDAO.selectFollowerList(FromUserId);
	}
	
	public int insertFollow(int ToUserId, int FromUserId) {
		return followDAO.insertFollow(ToUserId, FromUserId);
	}
	
	public int deleteFollow(int ToUserId, int FromUserId) {
		return followDAO.deleteFollow(ToUserId, FromUserId);
	}
}
