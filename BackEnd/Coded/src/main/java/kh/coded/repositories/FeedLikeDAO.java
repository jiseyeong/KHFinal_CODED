package kh.coded.repositories;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FeedLikeDAO {

	@Autowired
	private SqlSessionTemplate mybatis;
	
	public int insertFeedLike(int userNo,int feedPostId) {
		Map<String,Integer> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("feedPostId",feedPostId);
		return mybatis.insert("FeedLike.insertFeedLike",map);
	}
	
	public int deleteFeedLike(int userNo,int feedPostId) {		
		Map<String,Integer> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("feedPostId",feedPostId);
		return mybatis.delete("FeedLike.deleteFeedLike",map);
	}
	
	public int seleteFeedLike(int feedPostId) {
		return mybatis.selectOne("FeedLike.seleteFeedLike",feedPostId);
	}
	
	public boolean isFeedLike(int userNo, int feedPostId) {
		Map<String,Integer> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("feedPostId", feedPostId);
		return mybatis.selectOne("FeedLike.isFeedLike",map);
	}
}
