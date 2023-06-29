package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kh.coded.dto.MemberWithProfileDTO;
import kh.coded.dto.MyPickPageDTO;
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

	public MemberDTO selectMemberByKakaoToken(String token) {
		return mybatis.selectOne("Member.selectMemberByKakaoToken", token);
	}
	
	public MemberDTO selectMemberByNaverToken(String token) {
		return mybatis.selectOne("Member.selectMemberByNaverToken", token);
	}
	
	public MemberDTO selectMemberByGoogleToken(String token) {
		return mybatis.selectOne("Member.selectMemberByGoogleToken", token);
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
	
	public String selectKakaoToken(int userNo) {
		return mybatis.selectOne("Member.selectKakaoTokenByUserNo", userNo);
	}
	
	public String selectNaverToken(int userNo) {
		return mybatis.selectOne("Member.selectNaverTokenByUserNo", userNo);
	}
	
	public String selectGoogleToken(int userNo) {
		return mybatis.selectOne("Member.selectGoogleTokenByUserNo", userNo);
	}
	
	public int deleteMember(String userId) { //회원탈퇴
		return mybatis.delete("Member.deleteMember",userId);
	}
	
	public int deleteMemberAdmin(int userNo) {
		return mybatis.delete("Member.deleteMemberAdmin", userNo);
	}

    public List<MemberDTO> selectUserList() {
		return mybatis.selectList("Member.selectUserList");
    }

	public List<MemberWithProfileDTO> selectUserListWithProfile() {
		return mybatis.selectList("Member.selectUserListWithProfile");
	}

	public MemberWithProfileDTO selectUserWithProfileByUserNo(int userNo) {
		return mybatis.selectOne("Member.selectUserWithProfileByUserNo",userNo);
	}

	public int updateMemberByUserNo(MemberWithProfileDTO dto) {
		return mybatis.update("Member.updateMemberByUserNo",dto);
	}

	public MyPickPageDTO selectMyPickPageData(int userNo) {
		return mybatis.selectOne("Member.selectMyPickPageData",userNo);
	}
	
	public List<MemberWithProfileDTO> selectFollowerList(int toUserNo) { //팔로워 리스트(사진,멤버정보)
		return mybatis.selectList("Member.followerList", toUserNo);
	}
	
	public List<MemberWithProfileDTO> selectFollowingList(int fromUserNo) { //팔로잉 리스트(사진,멤버정보)
		return mybatis.selectList("Member.followingList",fromUserNo);

	public int getRecordCount() {
		return mybatis.selectOne("Member.getRecordCount");
	}
	
	public int getRecordCountById(String userId) {
		return mybatis.selectOne("Member.getRecordCountById", userId);
	}
	
	public int getRecordCountByNickName(String userNickName) {
		return mybatis.selectOne("Member.getRecordCountByNickName", userNickName);
	}
	
	public int getRecordCountByRole(String role) {
		return mybatis.selectOne("Member.getRecordCountByRole", role);
	}
	
	public int getRecordCountByEmail(String email) {
		return mybatis.selectOne("Member.getRecordCountByEmail", email);
	}
	
	public List<MemberDTO> selectPaging(int startNum, int endNum){
		Map<String, Integer> data = new HashMap<>();
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("Member.selectPaging", data);

	}
	
	public List<MemberDTO> selectPagingById(String userId,int startNum, int endNum){
		Map<String, Object> data = new HashMap<>();
		data.put("userId", userId);
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("Member.selectPagingById", data);
	}
	
	public List<MemberDTO> selectPagingByNickName(String userNickName,int startNum, int endNum){
		Map<String, Object> data = new HashMap<>();
		data.put("userNickName", userNickName);
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("Member.selectPagingByNickName", data);
	}
	
	public List<MemberDTO> selectPagingByRole(String role,int startNum, int endNum){
		Map<String, Object> data = new HashMap<>();
		data.put("role", role);
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("Member.selectPagingByRole", data);
	}
	
	public List<MemberDTO> selectPagingByEmail(String email,int startNum, int endNum){
		Map<String, Object> data = new HashMap<>();
		data.put("email", email);
		data.put("startNum", startNum);
		data.put("endNum", endNum);
		return mybatis.selectList("Member.selectPagingByEmail", data);
	}
}
}