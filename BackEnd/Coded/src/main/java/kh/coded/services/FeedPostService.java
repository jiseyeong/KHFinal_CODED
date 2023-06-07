package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import kh.coded.dto.FeedPostDTO;
import kh.coded.repositories.FeedPostDAO;

public class FeedPostService {

	@Autowired
	private FeedPostDAO feedpostDAO;
	
	public List<FeedPostDTO> selectAllFeedPost(String FeedPostId){
		return feedpostDAO.selectAllFeedPost(FeedPostId);
	}
	
	public int insertFeedPost(FeedPostDTO dto) {
		return feedpostDAO.insertFeedPost(dto);
	}
}
