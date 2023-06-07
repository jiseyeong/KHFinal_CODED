package kh.coded.dto;

public class MemberDTO{

	private int userNo = 0;
	private String userId;    //필수
	private String pw;        //필수
	private String userNickName="";
	private String bio="";
	private String favBrand="";
	private String address1;  //필수
	private String address2;  //필수
	private String role = Role.USER.getValue();
	private String naverToken="";
	private String kakaoToken="";
	private String googleToken="";
	//select용
	public MemberDTO(int userNo, String userId, String pw, String userNickName, String bio, String favBrand,
			String address1, String address2, String role, String naverToken, String kakaoToken, String googleToken) {
		super();
		this.userNo = userNo;
		this.userId = userId;
		this.pw = pw;
		this.userNickName = userNickName;
		this.bio = bio;
		this.favBrand = favBrand;
		this.address1 = address1;
		this.address2 = address2;
		this.role = role;
		this.naverToken = naverToken;
		this.kakaoToken = kakaoToken;
		this.googleToken = googleToken;
	}

	//join 용
	public MemberDTO(String userId, String pw, String userNickName, String address1, String address2) {
		super();
		this.userId = userId;
		this.pw = pw;
		this.userNickName = userNickName;
		this.address1 = address1;
		this.address2 = address2;
		this.role = Role.USER.getValue();
	}

	public MemberDTO() {
		super();
	}

	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userID) {
		this.userId = userID;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getUserNickName() {
		return userNickName;
	}
	public void setUserNickName(String userNickName) {
		this.userNickName = userNickName;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public String getFavBrand() {
		return favBrand;
	}
	public void setFavBrand(String favBrand) {
		this.favBrand = favBrand;
	}
	public String getAddress1() {
		return address1;
	}
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	public String getAddress2() {
		return address2;
	}
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	public String getNaverToken() {
		return naverToken;
	}
	public void setNaverToken(String naverToken) {
		this.naverToken = naverToken;
	}
	public String getKakaoToken() {
		return kakaoToken;
	}
	public void setKakaoToken(String kakaoToken) {
		this.kakaoToken = kakaoToken;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getGoogleToken() {
		return googleToken;
	}
	public void setGoogleToken(String googleToken) {
		this.googleToken = googleToken;
	}
	
}
