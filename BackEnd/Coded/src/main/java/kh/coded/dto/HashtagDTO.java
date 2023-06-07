package kh.coded.dto;

public class HashtagDTO {

	private int TagId;
	private String Hashtag;
	public HashtagDTO() {
		super();
	}
	public HashtagDTO(int tagId, String hashtag) {
		super();
		TagId = tagId;
		Hashtag = hashtag;
	}
	public int getTagId() {
		return TagId;
	}
	public void setTagId(int tagId) {
		TagId = tagId;
	}
	public String getHashtag() {
		return Hashtag;
	}
	public void setHashtag(String hashtag) {
		Hashtag = hashtag;
	}
	
	
}
