package kh.coded.dto;

public class TodayWeatherDTO {
	
	private int todayWeatherId;
	private int addressId;
	private int recent;
	private int min;
	private int max;
	private int weatherCode;
	public TodayWeatherDTO() {
		super();
	}
	public TodayWeatherDTO(int todayWeatherId, int addressId, int current, int min, int max, int weatherCode) {
		super();
		this.todayWeatherId = todayWeatherId;
		this.addressId = addressId;
		this.recent = current;
		this.min = min;
		this.max = max;
		this.weatherCode = weatherCode;
	}
	public int getTodayWeatherId() {
		return todayWeatherId;
	}
	public void setTodayWeatherId(int todayWeatherId) {
		this.todayWeatherId = todayWeatherId;
	}
	public int getAddressId() {
		return addressId;
	}
	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}
	public int getCurrent() {
		return recent;
	}
	public void setCurrent(int current) {
		this.recent = current;
	}
	public int getMin() {
		return min;
	}
	public void setMin(int min) {
		this.min = min;
	}
	public int getMax() {
		return max;
	}
	public void setMax(int max) {
		this.max = max;
	}
	public int getWeatherCode() {
		return weatherCode;
	}
	public void setWeatherCode(int weatherCode) {
		this.weatherCode = weatherCode;
	}
}
