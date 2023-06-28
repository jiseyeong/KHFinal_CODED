package kh.coded.dto;

public class FollowDTO {

	private int id;
	private int toUserNo;
	private int fromUserNo;
	
	public FollowDTO() {
		super();
	}

	public FollowDTO(int id, int toUserNo, int fromUserNo) {
		super();
		this.id = id;
		this.toUserNo = toUserNo;
		this.fromUserNo = fromUserNo;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getToUserNo() {
		return toUserNo;
	}

	public void setToUserNo(int toUserNo) {
		this.toUserNo = toUserNo;
	}

	public int getFromUserNo() {
		return fromUserNo;
	}

	public void setFromUserNo(int fromUserNo) {
		this.fromUserNo = fromUserNo;
	}
	
}
