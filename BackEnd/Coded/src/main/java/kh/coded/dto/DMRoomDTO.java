package kh.coded.dto;

public class DMRoomDTO {
    private int roomId;
    private int lastMessageId;

    public DMRoomDTO(int roomId, int lastMessageId) {
		super();
		this.roomId = roomId;
		lastMessageId = lastMessageId;
	}

	public DMRoomDTO() {
		super();
	}

	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public int getLastMessageId() {
		return lastMessageId;
	}

	public void setLastMessageId(int lastMessageId) {
		lastMessageId = lastMessageId;
	}
    
}
