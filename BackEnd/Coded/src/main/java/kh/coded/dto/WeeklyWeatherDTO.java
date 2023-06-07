package kh.coded.dto;

public class WeeklyWeatherDTO {
    private int weekWeatherId;
    private int addressId;
    private int min;
    private int max;
    private int weatherCode;
    private int dDay;

    public WeeklyWeatherDTO() {
    }

    public WeeklyWeatherDTO(int weekWeatherId, int addressId, int min, int max, int weatherCode, int dDay) {
        this.weekWeatherId = weekWeatherId;
        this.addressId = addressId;
        this.min = min;
        this.max = max;
        this.weatherCode = weatherCode;
        this.dDay = dDay;
    }

    public int getWeekWeatherId() {
        return weekWeatherId;
    }

    public void setWeekWeatherId(int weekWeatherId) {
        this.weekWeatherId = weekWeatherId;
    }

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
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

    public int getdDay() {
        return dDay;
    }

    public void setdDay(int dDay) {
        this.dDay = dDay;
    }
}
