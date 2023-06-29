package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import kh.coded.dto.FeedPostAddDTO;
import kh.coded.dto.FeedPostDTO;
import kh.coded.dto.HashTagDTO;
import kh.coded.dto.PhotoDTO;

@Repository
public class FeedPostDAO {

	@Autowired
	private SqlSessionTemplate mybatis;

//	마이 피드 리스트 - 본인이 작성한 피드 리스트 출력, 다른 유저의 마이 피드 리스트 - 다른 유저의 피드 리스트만 출력
	public List<FeedPostDTO> selectFeedList(int UserNo) {
		return mybatis.selectList("FeedPost.selectByUserNo", UserNo);
	}


	
//	피드 쓰기 - 피드를 작성 할 수 있는 페이지
// 해시태그나 기타 사진 데이터 연동을 위해 feedpostId를 가져와서 사용합니다.
	public FeedPostDTO insertFeedPost(FeedPostDTO dto) {
		mybatis.insert("FeedPost.insertFeedPost", dto);
		return dto;
	}

//	피드 내 사진 첨부 - 사진을 첨부하여 피드 작성
	public void insertFeedPhoto(PhotoDTO dto) {
		mybatis.insert("FeedPost.insertFeedPhoto", dto);
	}
	
	public int insertPostHashs(int FeedPostId, int TagId) {
		Map<String, Integer> result = new HashMap<>();
		result.put("FeedPostId", FeedPostId);
		result.put("TagId", TagId);
		return mybatis.insert("FeedPost.insertPostHashs", result);
	}
	public int insertHashTag(HashTagDTO dto) { // 해시태그
		mybatis.insert("FeedPost.insertHashTag", dto);
		return dto.getTagId();
	}
//	해시태그 중복 체크
	public int HashTagJB(String tagName) {
		int a = mybatis.selectOne("FeedPost.HashTagJB", tagName);
		System.out.println("checkInt : "+a);
		return a;
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
	

	public int updateFeedPost(FeedPostDTO dto) { //글 수정
		return mybatis.update("FeedPost.updateFeedPost", dto);
	}
	
	public int updateFeedPhoto(PhotoDTO dto) { //사진 수정
		return mybatis.insert("FeedPost.updateFeedPhoto", dto);
	}
	
	public int updatePostHashs(int FeedPostId, int TagId) { //PostHashs 여기서 가져와야됨 hashtagid를
		Map<String, Integer> result = new HashMap<>();
		result.put("FeedPostId", FeedPostId);
		result.put("TagId", TagId);
		return mybatis.insert("FeedPost.updatePostHashs", result);
	}
	
	
	
	public int deleteFeedPost(int feedPostId) { //글 삭제 
		return mybatis.delete("FeedPost.deleteFeedPost",feedPostId);
	}
	
	public FeedPostDTO searchByFeedPost(int feedPostId) { //위에서 뽑아낸 포스트 아이디로 피드 뽑기
		return mybatis.selectOne("FeedPost.searchByFeedPost",feedPostId);
	}
	
	
	public List<FeedPostDTO> selectTestFeedList() {
		return mybatis.selectList("FeedPost.selectTestFeedList");
	}

	public List<FeedPostAddDTO> selectAllFeedPost(int startFeedNum, int endFeedNum) {
		Map<String, Integer> map = new HashMap<>();
		map.put("startFeedNum",startFeedNum);
		map.put("endFeedNum",endFeedNum);
		return mybatis.selectList("FeedPost.selectAllFeedPost",map);
	}

	public FeedPostDTO selectByUserNo(int userNo) {
		return mybatis.selectOne("FeedPost.selectByUserNo",userNo);
	}

	public List<FeedPostAddDTO> selectWeeklyFeed(int targetTemp, int targetTempRange, int startFeedNum, int endFeedNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("targetTemp", targetTemp);
		data.put("targetTempRange", targetTempRange);
		data.put("startFeedNum",startFeedNum);
		data.put("endFeedNum",endFeedNum);
		return mybatis.selectList("FeedPost.selectPagingWeatherDiff", data);
	}

	public List<FeedPostAddDTO> selectSearchFeedListByHashs(int startFeedNum, int endFeedNum, String keyword) {
		Map<String, Object> map = new HashMap<>();
		map.put("startFeedNum",startFeedNum);
		map.put("endFeedNum",endFeedNum);
		map.put("keyword",keyword);
		return mybatis.selectList("FeedPost.selectSearchFeedListByHashs",map);
	}
	
	//	마이 피드 리스트 - 본인이 작성한 피드 리스트 출력, 다른 유저의 마이 피드 리스트 - 다른 유저의 피드 리스트만 출력
	public List<FeedPostAddDTO> selectUserFeedPost(int userNo, int startFeedNum, int endFeedNum) {
		Map<String, Integer> map = new HashMap<>();
		map.put("userNo",userNo);
		map.put("startFeedNum",startFeedNum);
		map.put("endFeedNum",endFeedNum);
		return mybatis.selectList("FeedPost.selectUserFeedPost",map);
	}
	
	public List<FeedPostAddDTO> selectLikeFeedPost(int startFeedNum, int endFeedNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("startFeedNum", startFeedNum);
		data.put("endFeedNum", endFeedNum);
		return mybatis.selectList("FeedPost.selectPopularFeed", data);
	}
	
	public List<FeedPostAddDTO> selectFollowingFeedPost(int userNo, int startFeedNum, int endFeedNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("userNo", userNo);
		data.put("startFeedNum", startFeedNum);
		data.put("endFeedNum", endFeedNum);
		return mybatis.selectList("FeedPost.selectFollowingFeedPost", data);
	}
	
	public List<FeedPostAddDTO> selectScrapFeedPost(int userNo, int startFeedNum, int endFeedNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("userNo", userNo);
		data.put("startFeedNum", startFeedNum);
		data.put("endFeedNum", endFeedNum);
		return mybatis.selectList("FeedPost.selectScrapFeedPost", data);
	}
	
	public FeedPostAddDTO selectOneFeedPost(int feedpostId){
		return mybatis.selectOne("FeedPost.selectOne", feedpostId);
	}
	
	public int getRecordCount() {
		return mybatis.selectOne("FeedPost.getRecordCount");
	}
	
	public int getRecordCount(int userNo) {
		return mybatis.selectOne("FeedPost.getRecordCountByUserNo", userNo);
	}
}
