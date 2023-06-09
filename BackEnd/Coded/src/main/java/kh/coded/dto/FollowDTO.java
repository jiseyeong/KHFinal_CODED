package kh.coded.dto;

public class FollowDTO {

	private int id;
	private int toUserId;
	private int fromUserId;
	
	public FollowDTO() {
		super();
	}
	
	public FollowDTO(int id, int toUserId, int fromUserId) {
		super();
		this.id = id;
		this.toUserId = toUserId;
		this.fromUserId = fromUserId;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
