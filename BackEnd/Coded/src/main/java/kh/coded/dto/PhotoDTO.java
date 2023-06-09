package kh.coded.dto;

public class PhotoDTO {

	private int photoId;
	private String oriName;
	private String sysName;
	private int feedPostId;
	private int messageId;
	private int userNo;
	public PhotoDTO() {
		super();
	}
	public PhotoDTO(int photoId, String oriName, String sysName, int feedPostId, int messageId, int userNo) {
		super();
		this.photoId = photoId;
		this.oriName = oriName;
		this.sysName = sysName;
		this.feedPostId = feedPostId;
		this.messageId = messageId;
		this.userNo = userNo;
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
	public int getFeedPostId() {
		return feedPostId;
	}
	public void setFeedPostId(int feedPostId) {
		this.feedPostId = feedPostId;
	}
	public int getMessageId() {
		return messageId;
	}
	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	
}
