package kh.coded.dto;

public class FollowDTO {
    private int followId;
    private int toUserId;
    private int fromUserId;

    public FollowDTO() {
    }

    public FollowDTO(int followId, int toUserId, int fromUserId) {
        this.followId = followId;
        this.toUserId = toUserId;
        this.fromUserId = fromUserId;
    }

    public int getFollowId() {
        return followId;
    }

    public void setFollowId(int followId) {
        this.followId = followId;
    }

    public int getToUserId() {
        return toUserId;
    }

    public void setToUserId(int toUserId) {
        this.toUserId = toUserId;
    }

    public int getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(int fromUserId) {
        this.fromUserId = fromUserId;
    }
}
