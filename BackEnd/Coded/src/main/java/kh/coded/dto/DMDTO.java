package kh.coded.dto;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class DMDTO {
    private int messageId;
    private int roomId;
    private int userNo;
    private String message;
    private Timestamp writeDate;

    private char isDelete;

    public DMDTO() {
    }

    public DMDTO(int messageId, int roomId, int userNo, String message, Timestamp writeDate, char isDelete) {
        this.messageId = messageId;
        this.roomId = roomId;
        this.userNo = userNo;
        this.message = message;
        this.writeDate = writeDate;
        this.isDelete = isDelete;
    }

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(Timestamp writeDate) {
        this.writeDate = writeDate;
    }

    public char getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(char isDelete) {
        this.isDelete = isDelete;
    }
    
	public String getFormedWriteDate() {
		SimpleDateFormat sdf = new SimpleDateFormat("MM-dd HH:mm");
		return sdf.format(writeDate);
	}
    
}
