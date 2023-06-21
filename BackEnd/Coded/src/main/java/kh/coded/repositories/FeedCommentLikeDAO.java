package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.FeedCommentLikeDTO;

@Repository
public class FeedCommentLikeDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public int insert(FeedCommentLikeDTO dto) {
		mybatis.insert("FeedCommentLike.insert", dto);
		return dto.getFeedCommentLikeId();
	}
	
	public void delete(int userNo, int commentId) {
		Map<String, Integer> data = new HashMap<>();
		data.put("userNo", userNo);
		data.put("commetId", commentId);
		mybatis.delete("FeedCommentLike.delete", data);
	}
	
	public FeedCommentLikeDTO selectForChecked(int userNo, int commentId) {
		Map<String, Integer> data = new HashMap<>();
		data.put("userNo", userNo);
		data.put("commentId", commentId);
		return mybatis.selectOne("FeedCommentLike.selectForChecked", data);
	}
	
	public List<FeedCommentLikeDTO> selectForCount(int commentId){
		return mybatis.selectList("FeedCommentLike.selectForCount", commentId);
	}
}
