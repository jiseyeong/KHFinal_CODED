package kh.coded.dto;

public class FeedCommentLikeDTO {

    private int feedCommentLikeId;
    private int userNo;
    private int commentId;

    public FeedCommentLikeDTO() {
    }

    public FeedCommentLikeDTO(int feedCommentLikeId, int userNo, int commentId) {
        this.feedCommentLikeId = feedCommentLikeId;
        this.userNo = userNo;
        this.commentId = commentId;
    }

    public int getFeedCommentLikeId() {
        return feedCommentLikeId;
    }

    public void setFeedCommentLikeId(int feedCommentLikeId) {
        this.feedCommentLikeId = feedCommentLikeId;
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }
}
