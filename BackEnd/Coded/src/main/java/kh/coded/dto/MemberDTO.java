package kh.coded.dto;

public class MemberDTO{

	public enum Role {
		USER("ROLE_USER"),ADMIN("ROLE_ADMIN");	
		private Role(String value) {
			this.value = value;
		}
		private String value;
		public String getValue() {
			return value;
		}
		//		public void setValue(String value) {
		//			this.value = value;
		//		}
	}

	private int userNo = 0;
	private String userID;    //필수
	private String pw;        //필수
	private String userName=null;
	private String bio=null;
	private String favBrand=null;
	private String address1;  //필수
	private String address2;  //필수
	private String naverToken=null;
	private String kakaoToken=null;
	private Role role = Role.USER;
	//select용
	public MemberDTO(int userNo, String userID, String pw, String userName, String bio, String favBrand, String address1,
			String address2, String naverToken, String kakaoToken, Role role) {
		super();
		this.userNo = userNo;
		this.userID = userID;
		this.pw = pw;
		this.userName = userName;
		this.bio = bio;
		this.favBrand = favBrand;
		this.address1 = address1;
		this.address2 = address2;
		this.naverToken = naverToken;
		this.kakaoToken = kakaoToken;
		this.role = role;
	}
	//join 용
	public MemberDTO(String userID, String pw, String address1, String address2) {
		super();
		this.userID = userID;
		this.pw = pw;
		this.address1 = address1;
		this.address2 = address2;
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
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
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
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
}
