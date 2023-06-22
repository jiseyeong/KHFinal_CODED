package kh.coded.dto;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class FeedCommentDTO {

    private int feedCommentId;
    private int userNo;
    private int feedPostId;
    private int parentId;
    private String body;
    private Timestamp writeDate;
    private int depth;
	public FeedCommentDTO() {
		super();
	}
	public FeedCommentDTO(int feedCommentId, int userNo, int feedPostId, int parentId, String body, Timestamp writeDate,
			int depth) {
		super();
		this.feedCommentId = feedCommentId;
		this.userNo = userNo;
		this.feedPostId = feedPostId;
		this.parentId = parentId;
		this.body = body;
		this.writeDate = writeDate;
		this.depth = depth;
	}
	public int getFeedCommentId() {
		return feedCommentId;
	}
	public void setFeedCommentId(int feedCommentId) {
		this.feedCommentId = feedCommentId;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public int getFeedPostId() {
		return feedPostId;
	}
	public void setFeedPostId(int feedPostId) {
		this.feedPostId = feedPostId;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public Timestamp getWriteDate() {
		return writeDate;
	}
	public void setWriteDate(Timestamp writeDate) {
		this.writeDate = writeDate;
	}
	public int getDepth() {
		return depth;
	}
	public void setDepth(int depth) {
		this.depth = depth;
	}
	
	public String getFormedWriteDate() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		return sdf.format(writeDate);
	}
    
}
