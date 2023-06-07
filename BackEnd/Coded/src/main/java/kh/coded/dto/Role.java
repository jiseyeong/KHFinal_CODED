package kh.coded.dto;

public enum Role {
	USER("ROLE_USER"),ADMIN("ROLE_ADMIN");	
	private Role(String value) {
		this.value = value;
	}
	private String value;
	public String getValue() {
		return value;
	}
	//		public void setValue(String value) {
	//			this.value = value;
	//		}
}
