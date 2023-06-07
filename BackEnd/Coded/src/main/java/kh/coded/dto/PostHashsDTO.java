package kh.coded.dto;

public class PostHashsDTO {

	private int LinkId;
	private int FeedPostId;
	private int TagId;
	public PostHashsDTO() {
		super();
	}
	public PostHashsDTO(int linkId, int feedPostId, int tagId) {
		super();
		LinkId = linkId;
		FeedPostId = feedPostId;
		TagId = tagId;
	}
	public int getLinkId() {
		return LinkId;
	}
	public void setLinkId(int linkId) {
		LinkId = linkId;
	}
	public int getFeedPostId() {
		return FeedPostId;
	}
	public void setFeedPostId(int feedPostId) {
		FeedPostId = feedPostId;
	}
	public int getTagId() {
		return TagId;
	}
	public void setTagId(int tagId) {
		TagId = tagId;
	}
	
	
}
