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

////	나의 팔로워 리스트 출력 : 나를 팔로우 하는 사람들
//	public List<Integer> selectFollowerList(int ToUserNo) {
//		return mybatis.selectList("Follow.selectFollowingList", ToUserNo);
//	}
//
////	나의 팔로잉 리스트 출력 : 내가 팔로우 하는 사람들 
//	public List<Integer> selectFollowingList(int FromUserNo) {
//		return mybatis.selectList("Follow.selectFollowerList", FromUserNo);
//	}

	// 팔로잉, 팔로워 여부
	public boolean isFollow (int toUserNo, int myUserNo) {
		Map<String, Integer> isFollow = new HashMap<>();
		System.out.println(toUserNo);
		System.out.println(myUserNo);
		isFollow.put("toUserNo", toUserNo);
		isFollow.put("myUserNo", myUserNo);
		System.out.println((int) mybatis.selectOne("Follow.isFollow", isFollow));
		if((int)mybatis.selectOne("Follow.isFollow", isFollow) == 1) {
			return true;
		}else {
			return false;
		}
	}

//	팔로우 등록 - 해당 유저를 팔로우 등록
	public int insertFollow(int toUserNo, int fromUserNo) {
		Map<String, Integer> insert = new HashMap<>();
		insert.put("toUserNo", toUserNo);
		insert.put("fromUserNo", fromUserNo);
		return mybatis.insert("Follow.insertFollow", insert);
	}

//	팔로우 해제 - 해당 유저를 팔로우 해제
	public int deleteFollow(int toUserNo, int fromUserNo) {
		Map<String, Integer> delete = new HashMap<>();
		delete.put("toUserNo", toUserNo);
		delete.put("fromUserNo", fromUserNo);
		return mybatis.delete("Follow.deleteFollow", delete);
	}
}
