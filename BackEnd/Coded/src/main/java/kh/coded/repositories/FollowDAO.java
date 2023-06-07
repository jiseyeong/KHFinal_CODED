package kh.coded.repositories;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.MemberDTO;

@Repository
public class FollowDAO {

	@Autowired
	private SqlSessionTemplate mybatis;

//	나의 팔로잉/팔로우 리스트 - 본인의 팔로잉 / 팔로우 리스트 출력
	public List<MemberDTO> selectallFollow(int FollowId) {
		return mybatis.selectList("Follow.selectallFollow", FollowId);
	}

//	팔로우 등록 - 해당 유저를 팔로우 등록
	public int insertFollow(int FollowId) {
		return mybatis.insert("Follow.insertFollow", FollowId);
	}

//	팔로우 해제 - 해당 유저를 팔로우 해제
	public int deleteFollow(int FollowId) {
		return mybatis.delete("Follow.deleteFollow", FollowId);
	}
}
