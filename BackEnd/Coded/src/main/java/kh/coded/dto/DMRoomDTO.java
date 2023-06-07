package kh.coded.dto;

public class DMRoomDTO {
    private int roomId;
    private String name;

    public DMRoomDTO() {
    }

    public DMRoomDTO(int roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
