package kh.coded.repositories;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FeedScrapDAO {

	@Autowired
	private SqlSessionTemplate mybatis;
	
	public int insertFeedScrap(int userNo,int feedPostId) {
		Map<String,Integer> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("feedPostId",feedPostId);
		return mybatis.insert("FeedScrap.insertFeedScrap",map);
	}
	
	public int deleteFeedScrap(int userNo,int feedPostId) {		
		Map<String,Integer> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("feedPostId",feedPostId);
		return mybatis.delete("FeedScrap.deleteFeedScrap",map);
	}
	
	public boolean isFeedScrap(int userNo,int feedPostId) {
		Map<String,Integer> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("feedPostId",feedPostId);
		Boolean check = mybatis.selectOne("FeedScrap.isFeedScrap",map);
		if (check == null)
			return false;
		else
			return check;
	}
}
