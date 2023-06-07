package kh.coded.dto;

public class TemperatureMessageDTO {
    private int tempMessageId;
    private String body;
    private int tempCondition;
    private char tempRangeCondition;

    public TemperatureMessageDTO() {
    }

    public TemperatureMessageDTO(int tempMessageId, String body, int tempCondition, char tempRangeCondition) {
        this.tempMessageId = tempMessageId;
        this.body = body;
        this.tempCondition = tempCondition;
        this.tempRangeCondition = tempRangeCondition;
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
}
