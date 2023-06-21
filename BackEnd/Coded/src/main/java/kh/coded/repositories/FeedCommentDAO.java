package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.FeedCommentDTO;

@Repository
public class FeedCommentDAO {
	
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public int insert(FeedCommentDTO dto) {
		mybatis.insert("FeedComment.insert", dto);
		return dto.getFeedCommentId();
	}
	
	public int insertNestedComment(FeedCommentDTO dto) {
		mybatis.insert("FeedComment.insertNestedComment", dto);
		return dto.getFeedCommentId();
	}
	
	public void update(int feedCommentId, String body) {
		Map<String, Object> data = new HashMap<>();
		data.put("feedCommentId", feedCommentId);
		data.put("body", body);
		mybatis.update("FeedComment.update", data);
	}
	
	public void delete(int feedCommentId) {
		mybatis.delete("FeedComment.delete", feedCommentId);
	}
	
	public List<FeedCommentDTO> selectByFeedPostDepth0(int feedPostId){
		return mybatis.selectList("FeedComment.selectByFeedPostDepth0", feedPostId);
	}
	
	public List<FeedCommentDTO> selectByParentIdAndDepth(int parentId, int depth){
		Map<String, Integer> data = new HashMap<>();
		data.put("parentId", parentId);
		data.put("depth", depth);
		return mybatis.selectList("FeedComment.selectByParentIdAndDepth", data);
	}
}
