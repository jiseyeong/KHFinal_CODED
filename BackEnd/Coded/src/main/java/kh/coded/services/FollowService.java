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
	
	public boolean isFollow(int ToUserNo, int FromUserNo) {
		return followDAO.isFollow(ToUserNo, FromUserNo);
	}
	
	public List<MemberDTO> selectFollowingList(int ToUserNo) {
		return followDAO.selectFollowingList(ToUserNo);
	}
	
	public List<MemberDTO> selectFollowerList(int FromUserNo) {
		return followDAO.selectFollowerList(FromUserNo);
	}
	
	public int insertFollow(int ToUserNo, int FromUserNo) {
		return followDAO.insertFollow(ToUserNo, FromUserNo);
	}
	
	public int deleteFollow(int ToUserNo, int FromUserNo) {
		return followDAO.deleteFollow(ToUserNo, FromUserNo);
	}
}
