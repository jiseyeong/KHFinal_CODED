package kh.coded.dto;


public class FeedScrapDTO {

    private int feedScrapId;
    private int userNo;
    private int feedPostId;

    public FeedScrapDTO() {
    }

    public FeedScrapDTO(int feedScrapId, int userNo, int feedPostId) {
        this.feedScrapId = feedScrapId;
        this.userNo = userNo;
        this.feedPostId = feedPostId;
    }

    public int getFeedScrapId() {
        return feedScrapId;
    }

    public void setFeedScrapId(int feedScrapId) {
        this.feedScrapId = feedScrapId;
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
}
