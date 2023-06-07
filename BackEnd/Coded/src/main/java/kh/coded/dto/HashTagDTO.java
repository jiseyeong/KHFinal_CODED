package kh.coded.dto;

public class HashTagDTO {
    private int tagId;
    private String hashTag;

    public HashTagDTO() {
    }

    public HashTagDTO(int tagId, String hashTag) {
        this.tagId = tagId;
        this.hashTag = hashTag;
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