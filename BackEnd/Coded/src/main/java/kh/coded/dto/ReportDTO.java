package kh.coded.dto;

import java.sql.Timestamp;

public class ReportDTO {

    private int reportId;
    private int writeUserNo;
    private int targetFeedPostId;
    private int targetUserNo;
    private int targetFeedCommentId;
    private String title;
    private String body;
    private char replyCondition;
    private Timestamp writeDate;

    public ReportDTO() {
    }

    public ReportDTO(int reportId, int writeUserNo, int targetFeedPostId, int targetUserNo, int targetFeedCommentId, String title, String body, char replyCondition, Timestamp writeDate) {
        this.reportId = reportId;
        this.writeUserNo = writeUserNo;
        this.targetFeedPostId = targetFeedPostId;
        this.targetUserNo = targetUserNo;
        this.targetFeedCommentId = targetFeedCommentId;
        this.title = title;
        this.body = body;
        this.replyCondition = replyCondition;
        this.writeDate = writeDate;
    }

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    public int getWriteUserNo() {
        return writeUserNo;
    }

    public void setWriteUserNo(int writeUserNo) {
        this.writeUserNo = writeUserNo;
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

    public char getReplyCondition() {
        return replyCondition;
    }

    public void setReplyCondition(char replyCondition) {
        this.replyCondition = replyCondition;
    }

    public Timestamp getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(Timestamp writeDate) {
        this.writeDate = writeDate;
    }
}
