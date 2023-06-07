package kh.coded.dto;

public class PostHashsDTO {
    private int linkId;
    private int feedPostId;
    private int tagId;

    public PostHashsDTO() {
    }

    public PostHashsDTO(int linkId, int feedPostId, int tagId) {
        this.linkId = linkId;
        this.feedPostId = feedPostId;
        this.tagId = tagId;
    }

    public int getLinkId() {
        return linkId;
    }

    public void setLinkId(int linkId) {
        this.linkId = linkId;
    }

    public int getFeedPostId() {
        return feedPostId;
    }

    public void setFeedPostId(int feedPostId) {
        this.feedPostId = feedPostId;
    }

    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }
}
