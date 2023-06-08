package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedPostDTO;
import kh.coded.repositories.FeedPostDAO;

@Service
public class FeedPostService {

	@Autowired
	private FeedPostDAO feedpostDAO;
	
	public List<FeedPostDTO> selectAllFeedPost(String FeedPostId){
		return feedpostDAO.selectAllFeedPost(FeedPostId);
	}
	
	public int insertFeedPost(FeedPostDTO dto) {
		return feedpostDAO.insertFeedPost(dto);
	}

	public List<FeedPostDTO> selectTestFeedList() {
		return feedpostDAO.selectTestFeedList();
	}
}
