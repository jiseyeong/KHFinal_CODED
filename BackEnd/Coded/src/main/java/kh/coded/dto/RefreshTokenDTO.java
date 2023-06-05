package kh.coded.dto;

public class RefreshTokenDTO {
	private int tokenID;
	private int userNo;
	private String refreshToken;
	public RefreshTokenDTO(int tokenID, int userNo, String refreshToken) {
		super();
		this.tokenID = tokenID;
		this.userNo = userNo;
		this.refreshToken = refreshToken;
	}
	public RefreshTokenDTO() {
		super();
	}
	public int getTokenID() {
		return tokenID;
	}
	public void setTokenID(int tokenID) {
		this.tokenID = tokenID;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getRefreshToken() {
		return refreshToken;
	}
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
	
}
