package kh.coded.dto;

public class AddressCoordDTO {
	private int addressID;
	//광역시, 도
	private String address1;
	//시, 구, 군
	private String address2;
	// 단기 지역 좌표
	private int x;
	private int y;
	// 중기 지역 코드
	private String code;
	
	
	public AddressCoordDTO() {
	}
	public AddressCoordDTO(int addressID, String address1, String address2, int x, int y, String code) {
		super();
		this.addressID = addressID;
		this.address1 = address1;
		this.address2 = address2;
		this.x = x;
		this.y = y;
		this.code = code;
	}
	
	public int getAddressID() {
		return addressID;
	}
	public void setAddressID(int addressID) {
		this.addressID = addressID;
	}
	public String getAddress1() {
		return address1;
	}
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	public String getAddress2() {
		return address2;
	}
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	public int getX() {
		return x;
	}
	public void setX(int x) {
		this.x = x;
	}
	public int getY() {
		return y;
	}
	public void setY(int y) {
		this.y = y;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	} 
}
