package kh.coded.dto;

public class DMRoomDTO {
    private int roomId;
    private int LastMessageId;

    public DMRoomDTO(int roomId, int lastMessageId) {
		super();
		this.roomId = roomId;
		LastMessageId = lastMessageId;
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
		return LastMessageId;
	}

	public void setLastMessageId(int lastMessageId) {
		LastMessageId = lastMessageId;
	}
    
}
