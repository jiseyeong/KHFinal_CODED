package kh.coded.dto;

public class PhotoDTO {

	private int PhotoId;
	private String OriName;
	private String SysName;
	private int FeedPostId;
	private int MessageId;
	private int UserNo;
	public PhotoDTO() {
		super();
	}
	public PhotoDTO(int photoId, String oriName, String sysName, int feedPostId, int messageId, int userNo) {
		super();
		PhotoId = photoId;
		OriName = oriName;
		SysName = sysName;
		FeedPostId = feedPostId;
		MessageId = messageId;
		UserNo = userNo;
	}
	public int getPhotoId() {
		return PhotoId;
	}
	public void setPhotoId(int photoId) {
		PhotoId = photoId;
	}
	public String getOriName() {
		return OriName;
	}
	public void setOriName(String oriName) {
		OriName = oriName;
	}
	public String getSysName() {
		return SysName;
	}
	public void setSysName(String sysName) {
		SysName = sysName;
	}
	public int getFeedPostId() {
		return FeedPostId;
	}
	public void setFeedPostId(int feedPostId) {
		FeedPostId = feedPostId;
	}
	public int getMessageId() {
		return MessageId;
	}
	public void setMessageId(int messageId) {
		MessageId = messageId;
	}
	public int getUserNo() {
		return UserNo;
	}
	public void setUserNo(int userNo) {
		UserNo = userNo;
	}
	
	
	
}
