package kh.coded.dto;

public class DMRoomListDTO {
	
	private int roomId;
	private int userNo;
	private String userId;
	private String userNickname;
	private int photoId;
	private String oriName;
	private String sysName;
	private int messageId;
	public DMRoomListDTO() {
		super();
	}
	public DMRoomListDTO(int roomId, int userNo, String userId, String userNickname, int photoId, String oriName,
			String sysName) {
		super();
		this.roomId = roomId;
		this.userNo = userNo;
		this.userId = userId;
		this.userNickname = userNickname;
		this.photoId = photoId;
		this.oriName = oriName;
		this.sysName = sysName;
	}
	public int getRoomId() {
		return roomId;
	}
	public void setRoomId(int roomId) {
		this.roomId = roomId;
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
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserNickname() {
		return userNickname;
	}
	public void setUserNickname(String userNickname) {
		this.userNickname = userNickname;
	}
	public int getPhotoId() {
		return photoId;
	}
	public void setPhotoId(int photoId) {
		this.photoId = photoId;
	}
	public String getOriName() {
		return oriName;
	}
	public void setOriName(String oriName) {
		this.oriName = oriName;
	}
	public String getSysName() {
		return sysName;
	}
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
	@Override
	public String toString() {
		return "DMRoomListDTO [roomId=" + roomId + ", userNo=" + userNo + ", userId=" + userId + ", userNickname="
				+ userNickname + ", photoId=" + photoId + ", oriName=" + oriName + ", sysName=" + sysName + "]";
	}
	
	
	
}