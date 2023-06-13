package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.repositories.FeedPostDAO;
import kh.coded.repositories.PhotoDAO;
import utils.StaticValue;

@Service
public class FeedPostService {

	@Autowired
	private FeedPostDAO feedpostDAO;
	
	@Autowired
	private PhotoDAO photoDAO;
	
	public List<FeedPostDTO> selectFeedList(int UserNo){
		return feedpostDAO.selectFeedList(UserNo);
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
	public int insertPostHashs(int FeedPost, int TagId) {
		return feedpostDAO.insertPostHashs(FeedPost, TagId);
	}
	
	public int insertHashTag(String HashTag) {
		return feedpostDAO.insertHashTag(HashTag);
	}
	
	public List<FeedPostDTO> selectTestFeedList() {
		return feedpostDAO.selectTestFeedList();
	}

	public List<FeedPostDTO> selectAllFeedPost(int cpage) {
		int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
		int endFeedNum = cpage*feedCountPerPage;
		int startFeedNum = endFeedNum-(feedCountPerPage-1);

		return feedpostDAO.selectAllFeedPost(startFeedNum, endFeedNum);
	}
	
	public FeedPostDTO selectByUserNo(int userNo) {
		return feedpostDAO.selectByUserNo(userNo);
	}

	public List<FeedPostDTO> selectFeedNew() {
		return feedpostDAO.selectFeedNew();
	}

	public PhotoDTO selectByFeedpostId(int feedPostId) {
		return photoDAO.selectByFeedpostId(feedPostId);
	}
}
