package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.MemberDTO;
import kh.coded.repositories.FollowDAO;

@Service
public class FollowService {

	@Autowired
	private FollowDAO followDAO;
	
	public List<MemberDTO> selectallFollow(int FollowId) {
		return followDAO.selectallFollow(FollowId);
	}
	
	public int insertFollow(int FollowId) {
		return followDAO.insertFollow(FollowId);
	}
	
	public int deleteFollow(int FollowId) {
		return followDAO.deleteFollow(FollowId);
	}
}
