package kh.coded.dto;

import java.security.Timestamp;

public class FeedPostDTO {

	private int FeedPostId;
	private int UserNo;
	private String Body;
	private Timestamp WriteDate;
	private int WriteTemp;
	private int WriteTempRange;
	public FeedPostDTO() {
		super();
	}
	public FeedPostDTO(int feedPostId, int userNo, String body, Timestamp writeDate, int writeTemp,
			int writeTempRange) {
		super();
		FeedPostId = feedPostId;
		UserNo = userNo;
		Body = body;
		WriteDate = writeDate;
		WriteTemp = writeTemp;
		WriteTempRange = writeTempRange;
	}
	public int getFeedPostId() {
		return FeedPostId;
	}
	public void setFeedPostId(int feedPostId) {
		FeedPostId = feedPostId;
	}
	public int getUserNo() {
		return UserNo;
	}
	public void setUserNo(int userNo) {
		UserNo = userNo;
	}
	public String getBody() {
		return Body;
	}
	public void setBody(String body) {
		Body = body;
	}
	public Timestamp getWriteDate() {
		return WriteDate;
	}
	public void setWriteDate(Timestamp writeDate) {
		WriteDate = writeDate;
	}
	public int getWriteTemp() {
		return WriteTemp;
	}
	public void setWriteTemp(int writeTemp) {
		WriteTemp = writeTemp;
	}
	public int getWriteTempRange() {
		return WriteTempRange;
	}
	public void setWriteTempRange(int writeTempRange) {
		WriteTempRange = writeTempRange;
	}
	
}
