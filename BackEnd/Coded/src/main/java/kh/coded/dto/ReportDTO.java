package kh.coded.dto;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class ReportDTO {

    private int reportId;
    private int writerUserNo;
    private int targetFeedPostId;
    private int targetUserNo;
    private int targetFeedCommentId;
    private String title;
    private String body;
    private Timestamp writeDate;

    public ReportDTO() {
    }

    public ReportDTO(int reportId, int writerUserNo, int targetFeedPostId, int targetUserNo, int targetFeedCommentId, String title, String body, char replyCondition, Timestamp writeDate) {
        this.reportId = reportId;
        this.writerUserNo = writerUserNo;
        this.targetFeedPostId = targetFeedPostId;
        this.targetUserNo = targetUserNo;
        this.targetFeedCommentId = targetFeedCommentId;
        this.title = title;
        this.body = body;
        this.writeDate = writeDate;
    }

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    public int getWriterUserNo() {
        return writerUserNo;
    }

    public void setWriterUserNo(int writerUserNo) {
        this.writerUserNo = writerUserNo;
    }

    public int getTargetFeedPostId() {
        return targetFeedPostId;
    }

    public void setTargetFeedPostId(int targetFeedPostId) {
        this.targetFeedPostId = targetFeedPostId;
    }

    public int getTargetUserNo() {
        return targetUserNo;
    }

    public void setTargetUserNo(int targetUserNo) {
        this.targetUserNo = targetUserNo;
    }

    public int getTargetFeedCommentId() {
        return targetFeedCommentId;
    }

    public void setTargetFeedCommentId(int targetFeedCommentId) {
        this.targetFeedCommentId = targetFeedCommentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Timestamp getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(Timestamp writeDate) {
        this.writeDate = writeDate;
    }
    
    public String getFormedWriteDate() {
    	SimpleDateFormat sdf = new SimpleDateFormat("yy년 MM월 dd일");
    	return sdf.format(writeDate);
    }
}
