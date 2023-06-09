package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.PhotoDTO;

@Repository
public class FeedPostDAO {

	@Autowired
	private SqlSessionTemplate mybatis;

//	마이 피드 리스트 - 본인이 작성한 피드 리스트 출력, 다른 유저의 마이 피드 리스트 - 다른 유저의 피드 리스트만 출력
	public List<FeedPostDTO> selectFeedList(String UserNo) {
		return mybatis.selectList("FeedPost.selectFeedList", UserNo);
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
	public int insertPostHashs(int FeedPostId, int TagId) {
		Map<String, Integer> result = new HashMap<>();
		result.put("FeedPostId", FeedPostId);
		result.put("TagId", TagId);
		return mybatis.insert("FeedPost.insertPostHashs", result);
	}
	public int insertHashTag(String HashTag) {
		return mybatis.insert("FeedPost.insertHashTag", HashTag);
	}
	public int searchByHashs(String HashTag) { //해시태그 검색 후 태그 아이디 뽑기
		return mybatis.selectOne(HashTag);
	}	
	
	public List<FeedPostDTO> selectTestFeedList() {
		return mybatis.selectList("FeedPost.selectTestFeedList");
	}

	public List<FeedPostDTO> selectTestScrollFeedList(int startFeedNum, int endFeedNum) {
		Map<String, Integer> map = new HashMap<>();
		map.put("startFeedNum",startFeedNum);
		map.put("endFeedNum",endFeedNum);
		return mybatis.selectList("FeedPost.selectTestScrollFeedList",map);
	}
}
