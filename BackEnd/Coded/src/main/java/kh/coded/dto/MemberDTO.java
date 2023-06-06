package kh.coded.dto;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class MemberDTO implements UserDetails{
	
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
	
	//private Collection<GrantedAuthority> authorities;
	private boolean locked = false;
	
	public MemberDTO(int userNo, String userID, String pw, String userName, String bio, String favBrand,
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
	public MemberDTO() {
		super();
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
	public boolean getLocked() {
		return locked;
	}
	public void setLocked(boolean locked) {
		this.locked = locked;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collection = new ArrayList<>();
		MemberDTO self = this;
		collection.add(new GrantedAuthority(){
			@Override
			public String getAuthority() {
				return self.getRole().getValue();
			}
		});
		return collection;
	}
	@Override
	public String getPassword() {
		return pw;
	}
	@Override
	public String getUsername() {
		return UserID;
	}
	/**
     * 계정 만료 여부
     * true : 만료 안됨
     * false : 만료
     * @return
     */
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	/**
     * 계정 잠김 여부
     * true : 잠기지 않음
     * false : 잠김
     * @return
     */
	@Override
	public boolean isAccountNonLocked() {
		return locked;
	}
    /**
     * 비밀번호 만료 여부
     * true : 만료 안됨
     * false : 만료
     * @return
     */
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
    /**
     * 사용자 활성화 여부
     * ture : 활성화
     * false : 비활성화
     * @return
     */
	@Override
	public boolean isEnabled() {
		return !locked;
	}
}
