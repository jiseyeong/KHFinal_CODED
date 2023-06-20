package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kh.coded.dto.MemberWithProfileDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.MemberDTO;

@Repository
public class MemberDAO {
	@Autowired
	private SqlSessionTemplate mybatis;

	public MemberDTO selectMemberById(String userID) {
		return mybatis.selectOne("Member.selectMemberById",userID);
	}

	public MemberDTO selectMemberByUserNo(int userNo) {
		return mybatis.selectOne("Member.selectMemberByUserNo",userNo);
	}

	public List<MemberDTO> selectMemberByNickName(String userNickName) {
		return mybatis.selectList("Member.selectMemberByNickName",userNickName);
	}
	
	public MemberDTO selectMemberByKakaoToken(String token) {
		return mybatis.selectOne("Member.selectMemberByKakaoToken", token);
	}
	
	public MemberDTO selectMemberByNaverToken(String token) {
		return mybatis.selectOne("Member.selectMemberByNaverToken", token);
	}
	
	public boolean isMemberId(String userId) { //아이디 중복확인
		if(userId.isBlank()) {
			return false;
		}
		return (mybatis.selectOne("Member.isMemberId",userId) != null);
	}
	public boolean isMemberByEmail(String email) {
		if(email.isBlank()) {
			return false;
		}
		return (mybatis.selectOne("Member.isMemberByEmail", email) != null);
	}
	public String selectMemberIdByEmail(String email) {
		return mybatis.selectOne("Member.isMemberByEmail", email);
	}
	public MemberDTO selectMemberForPwSend(String userId, String userNickName, String email) {
		Map<String, String> data = new HashMap<>();
		data.put("userId", userId);
		data.put("userNickName", userNickName);
		data.put("email", email);
		return mybatis.selectOne("Member.selectMemberForPwSend", data);
	}
	public int insertMember(MemberDTO dto) { //회원가입
		mybatis.insert("Member.insertMember",dto);
		return dto.getUserNo();//구현하면 됨. selectKey의 ID값으로 돌려줄 것.
	}

	public int updateMember(MemberDTO dto) { //회원수정
		return mybatis.update("Member.updateMember",dto);
	}
	
	public int updatePw(String userId, String pw) { //비밀번호 수정
		Map<String,String> map = new HashMap<>();
		map.put("userId", userId);
		map.put("pw", pw);
		return mybatis.update("Member.updatePw",map);
	}
	
	public void updateKakaoToken(int userNo, String kakaoToken) {
		Map<String,Object> data = new HashMap<>();
		data.put("userNo", userNo);
		data.put("kakaoToken", kakaoToken);
		
		mybatis.update("Member.updateKakaoToken", data);
	}
	
	public void updateNaverToken(int userNo, String naverToken) {
		Map<String,Object> data = new HashMap<>();
		data.put("userNo", userNo);
		data.put("naverToken", naverToken);
		
		mybatis.update("Member.updateNaverToken", data);
	}
	
	public void updateGoogleToken(int userNo, String googleToken) {
		Map<String,Object> data = new HashMap<>();
		data.put("userNo", userNo);
		data.put("googleToken", googleToken);
		
		mybatis.update("Member.updateGoogleToken", data);
	}
	
	public int deleteMember(String userId,String pw) { //회원탈퇴
		Map<String,String> map = new HashMap<>();
		map.put("userId", userId);
		map.put("pw", pw);
		return mybatis.delete("Member.deleteMember",map);
	}

    public List<MemberDTO> selectUserList() {
		return mybatis.selectList("Member.selectUserList");
    }

	public List<MemberWithProfileDTO> selectUserListWithProfile() {
		return mybatis.selectList("Member.selectUserListWithProfile");
	}
}
