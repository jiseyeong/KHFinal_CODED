package kh.coded.dto;

public class FeedLikeDTO {
    private int feedLikeId;
    private int userNo;
    private int feedPostId;

    public FeedLikeDTO() {
    }

    public FeedLikeDTO(int feedLikeId, int userNo, int feedPostId) {
        this.feedLikeId = feedLikeId;
        this.userNo = userNo;
        this.feedPostId = feedPostId;
    }

    public int getFeedLikeId() {
        return feedLikeId;
    }

    public void setFeedLikeId(int feedLikeId) {
        this.feedLikeId = feedLikeId;
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
