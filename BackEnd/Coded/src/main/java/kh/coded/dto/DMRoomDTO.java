package kh.coded.dto;

public class DMRoomDTO {
    private int roomId;
    

    public DMRoomDTO() {
    }

    public DMRoomDTO(int roomId, String name) {
        this.roomId = roomId;
        
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

   
}
