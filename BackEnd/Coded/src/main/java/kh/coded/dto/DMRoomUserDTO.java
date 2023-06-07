package kh.coded.dto;

public class DMRoomUserDTO {
    private int listId;
    private int userNo;
    private int roomId;
    private int lastReadMessageId;
    private int firstReadMessageId;

    public DMRoomUserDTO() {
    }

    public DMRoomUserDTO(int listId, int userNo, int roomId, int lastReadMessageId, int firstReadMessageId) {
        this.listId = listId;
        this.userNo = userNo;
        this.roomId = roomId;
        this.lastReadMessageId = lastReadMessageId;
        this.firstReadMessageId = firstReadMessageId;
    }

    public int getListId() {
        return listId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public int getLastReadMessageId() {
        return lastReadMessageId;
    }

    public void setLastReadMessageId(int lastReadMessageId) {
        this.lastReadMessageId = lastReadMessageId;
    }

    public int getFirstReadMessageId() {
        return firstReadMessageId;
    }

    public void setFirstReadMessageId(int firstReadMessageId) {
        this.firstReadMessageId = firstReadMessageId;
    }
}
