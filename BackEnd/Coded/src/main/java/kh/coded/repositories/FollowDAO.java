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
	public List<MemberDTO> selectFollowingList(int ToUserId) {
		return mybatis.selectList("Follow.selectFollowingList", ToUserId);
	}
	
//	나의 팔로워 리스트 출력
	public List<MemberDTO> selectFollowerList(int FromUserId) {
		return mybatis.selectList("Follow.selectFollowerList", FromUserId);
	}

//	팔로우 등록 - 해당 유저를 팔로우 등록
	public int insertFollow(int ToUserId, int FromUserId) {
		Map<String, Integer> insert = new HashMap<>();
		insert.put("ToUserId", ToUserId);
		insert.put("FromUserId", FromUserId);
		return mybatis.insert("Follow.insertFollow", insert);
	}

//	팔로우 해제 - 해당 유저를 팔로우 해제
	public int deleteFollow(int ToUserId, int FromUserId) {
		Map<String, Integer> delete = new HashMap<>();
		delete.put("ToUserId", ToUserId);
		delete.put("FromUserId", FromUserId);
		return mybatis.delete("Follow.deleteFollow", delete);
	}
}
