package kh.coded.dto;

public class TodayWeatherDTO {
	
	private int TodayWeatherId;
	private int AddressId;
	private int Current;
	private int Min;
	private int Max;
	private int WeatherCode;
	public TodayWeatherDTO() {
		super();
	}
	public TodayWeatherDTO(int todayWeatherId, int addressId, int current, int min, int max, int weatherCode) {
		super();
		TodayWeatherId = todayWeatherId;
		AddressId = addressId;
		Current = current;
		Min = min;
		Max = max;
		WeatherCode = weatherCode;
	}
	public int getTodayWeatherId() {
		return TodayWeatherId;
	}
	public void setTodayWeatherId(int todayWeatherId) {
		TodayWeatherId = todayWeatherId;
	}
	public int getAddressId() {
		return AddressId;
	}
	public void setAddressId(int addressId) {
		AddressId = addressId;
	}
	public int getCurrent() {
		return Current;
	}
	public void setCurrent(int current) {
		Current = current;
	}
	public int getMin() {
		return Min;
	}
	public void setMin(int min) {
		Min = min;
	}
	public int getMax() {
		return Max;
	}
	public void setMax(int max) {
		Max = max;
	}
	public int getWeatherCode() {
		return WeatherCode;
	}
	public void setWeatherCode(int weatherCode) {
		WeatherCode = weatherCode;
	}
}
