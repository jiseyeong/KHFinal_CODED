package kh.coded.dto;

public class TemperatureMessageDTO {
    private int tempMessageId;
    private String body;
    private int tempCondition;
    private char tempRangeCondition;
    private String prefix;
    private String mySuffix;

    public TemperatureMessageDTO() {
    }
    

    public TemperatureMessageDTO(int tempMessageId, String body, int tempCondition, char tempRangeCondition,
			String prefix, String mySuffix) {
		super();
		this.tempMessageId = tempMessageId;
		this.body = body;
		this.tempCondition = tempCondition;
		this.tempRangeCondition = tempRangeCondition;
		this.prefix = prefix;
		this.mySuffix = mySuffix;
	}


	public int getTempMessageId() {
        return tempMessageId;
    }

    public void setTempMessageId(int tempMessageId) {
        this.tempMessageId = tempMessageId;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public int getTempCondition() {
        return tempCondition;
    }

    public void setTempCondition(int tempCondition) {
        this.tempCondition = tempCondition;
    }

    public char getTempRangeCondition() {
        return tempRangeCondition;
    }

    public void setTempRangeCondition(char tempRangeCondition) {
        this.tempRangeCondition = tempRangeCondition;
    }


	public String getPrefix() {
		return prefix;
	}


	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}


	public String getMySuffix() {
		return mySuffix;
	}


	public void setMySuffix(String mySuffix) {
		this.mySuffix = mySuffix;
	}
    
}
