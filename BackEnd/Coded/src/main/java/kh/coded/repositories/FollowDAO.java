package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.MemberDTO;

@Repository
public class FollowDAO {

	@Autowired
	private SqlSessionTemplate mybatis;

//	나의 팔로잉 리스트 출력
	public List<MemberDTO> selectFollowingList(int ToUserNo) {
		return mybatis.selectList("Follow.selectFollowingList", ToUserNo);
	}

//	나의 팔로워 리스트 출력
	public List<MemberDTO> selectFollowerList(int FromUserNo) {
		return mybatis.selectList("Follow.selectFollowerList", FromUserNo);
	}

	// 팔로잉, 팔로워 여부
	public boolean isFollow (int ToUserNo, int FromUserNo) {
		Map<String, Integer> isFollow = new HashMap<>();
		isFollow.put("ToUserNo", ToUserNo);
		isFollow.put("FromUserNo", FromUserNo);
		return mybatis.selectOne("Follow.isFollow", isFollow);
	}

//	팔로우 등록 - 해당 유저를 팔로우 등록
	public int insertFollow(int ToUserNo, int FromUserNo) {
		Map<String, Integer> insert = new HashMap<>();
		insert.put("ToUserId", ToUserNo);
		insert.put("FromUserId", FromUserNo);
		return mybatis.insert("Follow.insertFollow", insert);
	}

//	팔로우 해제 - 해당 유저를 팔로우 해제
	public int deleteFollow(int ToUserNo, int FromUserNo) {
		Map<String, Integer> delete = new HashMap<>();
		delete.put("ToUserId", ToUserNo);
		delete.put("FromUserId", FromUserNo);
		return mybatis.delete("Follow.deleteFollow", delete);
	}
}
