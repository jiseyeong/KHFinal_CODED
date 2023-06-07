package kh.coded.dto;

import java.sql.Timestamp;

public class FeedPostDTO {

    private int feedPostId;
    private int userNo;
    private String body;
    private Timestamp writeDate;
    private int writeTemp;
    private int writeTempRange;

    public FeedPostDTO() {
    }

    public FeedPostDTO(int feedPostId, int userNo, String body, Timestamp writeDate, int writeTemp, int writeTempRange) {
        this.feedPostId = feedPostId;
        this.userNo = userNo;
        this.body = body;
        this.writeDate = writeDate;
        this.writeTemp = writeTemp;
        this.writeTempRange = writeTempRange;
    }

    public int getFeedPostId() {
        return feedPostId;
    }

    public void setFeedPostId(int feedPostId) {
        this.feedPostId = feedPostId;
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
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

    public int getWriteTemp() {
        return writeTemp;
    }

    public void setWriteTemp(int writeTemp) {
        this.writeTemp = writeTemp;
    }

    public int getWriteTempRange() {
        return writeTempRange;
    }

    public void setWriteTempRange(int writeTempRange) {
        this.writeTempRange = writeTempRange;
    }
}
