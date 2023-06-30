package kh.coded.dto;

public class WeeklyWeatherDTO {
    private int weekWeatherId;
    private int addressId;
    private int min;
    private int max;
    private int dDay;
    private int skyCode;
    private int ptyCode;

    public WeeklyWeatherDTO() {
    }
    



	public WeeklyWeatherDTO(int weekWeatherId, int addressId, int min, int max, int dDay, int skyCode, int ptyCode) {
		super();
		this.weekWeatherId = weekWeatherId;
		this.addressId = addressId;
		this.min = min;
		this.max = max;
		this.dDay = dDay;
		this.skyCode = skyCode;
		this.ptyCode = ptyCode;
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

    public int getdDay() {
        return dDay;
    }

    public void setdDay(int dDay) {
        this.dDay = dDay;
    }

	public int getSkyCode() {
		return skyCode;
	}
	public void setSkyCode(int skyCode) {
		this.skyCode = skyCode;
	}
	public int getPtyCode() {
		return ptyCode;
	}
	public void setPtyCode(int ptyCode) {
		this.ptyCode = ptyCode;
	}




	@Override
	public String toString() {
		return "WeeklyWeatherDTO [weekWeatherId=" + weekWeatherId + ", addressId=" + addressId + ", min=" + min
				+ ", max=" + max + ", dDay=" + dDay + ", skyCode=" + skyCode + ", ptyCode=" + ptyCode + "]";
	}
	
	
}
