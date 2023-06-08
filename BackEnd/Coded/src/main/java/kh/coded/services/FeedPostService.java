package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.dto.TodayWeatherDTO;
import kh.coded.repositories.FeedPostDAO;

@Service
public class FeedPostService {

	@Autowired
	private FeedPostDAO feedpostDAO;
	
	public List<FeedPostDTO> selectFeedList(String FeedPostId){
		return feedpostDAO.selectFeedList(FeedPostId);
	}
	
	public int insertFeedPost(FeedPostDTO dto) {
		return feedpostDAO.insertFeedPost(dto);
	}
	
	public int insertFeedPhoto(PhotoDTO dto) {
		return feedpostDAO.insertFeedPhoto(dto);
	}
	
//	public TodayWeatherDTO select(int WeatherCode) {
//		return feedpostDAO.selectTodayWeather(WeatherCode);
//	}
//	
//	public int insertWeatherCode(int WeatherCode) {
//		return feedpostDAO.insertWeatherCode(WeatherCode);
//	}
	
	public int insertHashTag(String HashTag) {
		return feedpostDAO.insertHashTag(HashTag);
	}
	
	public List<FeedPostDTO> selectTestFeedList() {
		return feedpostDAO.selectTestFeedList();
	}
}
