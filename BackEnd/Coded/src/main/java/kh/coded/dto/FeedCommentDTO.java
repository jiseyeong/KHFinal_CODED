package kh.coded.dto;

import java.sql.Timestamp;

public class FeedCommentDTO {

    private int feedCommnentId;
    private int userNo;
    private int feedPostId;
    private int parentId;
    private String body;
    private Timestamp writeDate;

    public FeedCommentDTO() {
    }

    public FeedCommentDTO(int feedCommnentId, int userNo, int feedPostId, int parentId, String body, Timestamp writeDate) {
        this.feedCommnentId = feedCommnentId;
        this.userNo = userNo;
        this.feedPostId = feedPostId;
        this.parentId = parentId;
        this.body = body;
        this.writeDate = writeDate;
    }

    public int getFeedCommnentId() {
        return feedCommnentId;
    }

    public void setFeedCommnentId(int feedCommnentId) {
        this.feedCommnentId = feedCommnentId;
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
}
