package kh.coded.dto;

public class FollowDTO {

	private int Id;
	private int ToUserId;
	private int FromUserId;
	
	public FollowDTO() {
		super();
	}
	
	public FollowDTO(int id, int toUserId, int fromUserId) {
		super();
		Id = id;
		ToUserId = toUserId;
		FromUserId = fromUserId;
	}

	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public int getToUserId() {
		return ToUserId;
	}
	public void setToUserId(int toUserId) {
		ToUserId = toUserId;
	}
	public int getFromUserId() {
		return FromUserId;
	}
	public void setFromUserId(int fromUserId) {
		FromUserId = fromUserId;
	}
	
}
