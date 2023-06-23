package kh.coded.dto;

public class DMRoomListDTO {
	
	private int roomid;
	private int userNo;
	private String userId;
	private String userNickname;
	private int photoId;
	private String oriName;
	private String sysName;
	public DMRoomListDTO() {
		super();
	}
	public DMRoomListDTO(int roomid, int userNo, String userId, String userNickname, int photoId, String oriName,
			String sysName) {
		super();
		this.roomid = roomid;
		this.userNo = userNo;
		this.userId = userId;
		this.userNickname = userNickname;
		this.photoId = photoId;
		this.oriName = oriName;
		this.sysName = sysName;
	}
	public int getRoomid() {
		return roomid;
	}
	public void setRoomid(int roomid) {
		this.roomid = roomid;
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
		return "DMRoomListDTO [roomid=" + roomid + ", userNo=" + userNo + ", userId=" + userId + ", userNickname="
				+ userNickname + ", photoId=" + photoId + ", oriName=" + oriName + ", sysName=" + sysName + "]";
	}
	
	
	
}