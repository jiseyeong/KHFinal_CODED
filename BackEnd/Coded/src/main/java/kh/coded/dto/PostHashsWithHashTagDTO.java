package kh.coded.dto;

public class PostHashsWithHashTagDTO {
//    PostHashs와 HashTag를 합친 DTO

    private int linkId;
    private int feedPostId;
    private int tagId;

    private String hashTag;

    public PostHashsWithHashTagDTO() {
    }

    public PostHashsWithHashTagDTO(int linkId, int feedPostId, int tagId, String hashTag) {
        this.linkId = linkId;
        this.feedPostId = feedPostId;
        this.tagId = tagId;
        this.hashTag = hashTag;
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

    public String getHashTag() {
        return hashTag;
    }

    public void setHashTag(String hashTag) {
        this.hashTag = hashTag;
    }
}
