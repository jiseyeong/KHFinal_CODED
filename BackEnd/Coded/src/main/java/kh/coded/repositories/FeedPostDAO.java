package kh.coded.repositories;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.dto.TodayWeatherDTO;

@Repository
public class FeedPostDAO {

	@Autowired
	private SqlSessionTemplate mybatis;

//	마이 피드 리스트 - 본인이 작성한 피드 리스트 출력, 다른 유저의 마이 피드 리스트 - 다른 유저의 피드 리스트만 출력
	public List<FeedPostDTO> selectFeedList(String FeedPostId) {
		return mybatis.selectList("FeedPost.selectFeedList", FeedPostId);
	}

//	피드 쓰기 - 피드를 작성 할 수 있는 페이지
	public int insertFeedPost(FeedPostDTO dto) {
		return mybatis.insert("FeedPost.insertFeedPost", dto);
	}

//	피드 내 사진 첨부 - 사진을 첨부하여 피드 작성
	public int insertFeedPhoto(PhotoDTO dto) {
		return mybatis.insert("FeedPost.insertFeedPhoto", dto);
	}
	
////	피드 내 날씨 해시태그 - 오늘 날씨에 맞는 날씨 해시태그 자동 입력 (뽑기)
//	public TodayWeatherDTO selectTodayWeather(int WeatherCode) {
//		return mybatis.selectOne("FeedPost.selectTodayWeather", WeatherCode);
//	}
//	
////	피드 내 날씨 해시태그 - 오늘 날씨에 맞는 날씨 해시태그 자동 입력 등록
//	public int insertWeatherCode(int WeatherCode) {
//		return mybatis.insert("FeedPost.insertWeatherCode", WeatherCode);
//	}
	
//	피드 내 해시태그 입력 - 해시태그를 활용하여 피드 작성
	public int insertHashTag(String HashTag) {
		return mybatis.insert("FeedPost.insertHashTag", HashTag);
	}
	
	public List<FeedPostDTO> selectTestFeedList() {
		return mybatis.selectList("FeedPost.selectTestFeedList");
	}
}
