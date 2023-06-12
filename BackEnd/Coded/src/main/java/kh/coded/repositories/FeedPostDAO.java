package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.PhotoDTO;
import kh.coded.dto.PostHashsDTO;

@Repository
public class FeedPostDAO {

	@Autowired
	private SqlSessionTemplate mybatis;

//	마이 피드 리스트 - 본인이 작성한 피드 리스트 출력, 다른 유저의 마이 피드 리스트 - 다른 유저의 피드 리스트만 출력
	public List<FeedPostDTO> selectFeedList(int UserNo) {
		return mybatis.selectList("FeedPost.selectByUserNo", UserNo);
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
	public List<HashTagDTO> searchByHashs(String HashTag) { //해시태그 검색 후 태그 아이디 뽑기
		return mybatis.selectOne(HashTag);
	}	
	
	public List<PostHashsDTO> seachByPostHashs(int tagId) { //위에서 뽑아낸 태그 아이디로 포스트 아이디들 뽑기
		return mybatis.selectList("FeedPost.seachByPostHashs",tagId);
	}
	
	public FeedPostDTO searchByFeedPost(int feedPostId) { //위에서 뽑아낸 포스트 아이디로 피드 뽑기
		return mybatis.selectOne("FeedPost.searchByFeedPost",feedPostId);
	}
	public List<FeedPostDTO> selectTestFeedList() {
		return mybatis.selectList("FeedPost.selectTestFeedList");
	}

	public List<FeedPostDTO> selectAllFeedPost(int startFeedNum, int endFeedNum) {
		Map<String, Integer> map = new HashMap<>();
		map.put("startFeedNum",startFeedNum);
		map.put("endFeedNum",endFeedNum);
		return mybatis.selectList("FeedPost.selectAllFeedPost",map);
	}

	public FeedPostDTO selectByUserNo(int userNo) {
		return mybatis.selectOne("FeedPost.selectByUserNo",userNo);
	}
}
