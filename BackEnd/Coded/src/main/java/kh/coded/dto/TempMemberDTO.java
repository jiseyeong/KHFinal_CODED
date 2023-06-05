package kh.coded.dto;

public class TempMemberDTO {
	public enum Role {
	USER("ROLE_USER"),ADMIN("ROLE_ADMIN");	
	private Role(String value) {
		this.value = value;
	}
	private String value;
	public String getValue() {
		return value;
	}
//	public void setValue(String value) {
//		this.value = value;
//	}
}

	private int UserNo;
	private String UserID;
	private String pw;
	private String UserName;
	private String Bio;
	private String FavBrand;
	private String Address1;
	private String Address2;
	private String naverToken;
	private String kakaoToken;
	private Role role = Role.USER;
	
	public TempMemberDTO() {
	}

	public TempMemberDTO(int userNo, String userID, String pw, String userName, String bio, String favBrand,
			String address1, String address2, String naverToken, String kakaoToken, Role role) {
		super();
		UserNo = userNo;
		UserID = userID;
		this.pw = pw;
		UserName = userName;
		Bio = bio;
		FavBrand = favBrand;
		Address1 = address1;
		Address2 = address2;
		this.naverToken = naverToken;
		this.kakaoToken = kakaoToken;
		this.role = role;
	}

	public int getUserNo() {
		return UserNo;
	}

	public void setUserNo(int userNo) {
		UserNo = userNo;
	}

	public String getUserID() {
		return UserID;
	}

	public void setUserID(String userID) {
		UserID = userID;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getUserName() {
		return UserName;
	}

	public void setUserName(String userName) {
		UserName = userName;
	}

	public String getBio() {
		return Bio;
	}

	public void setBio(String bio) {
		Bio = bio;
	}

	public String getFavBrand() {
		return FavBrand;
	}

	public void setFavBrand(String favBrand) {
		FavBrand = favBrand;
	}

	public String getAddress1() {
		return Address1;
	}

	public void setAddress1(String address1) {
		Address1 = address1;
	}

	public String getAddress2() {
		return Address2;
	}

	public void setAddress2(String address2) {
		Address2 = address2;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
}
