package kh.coded.dto;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class FeedPostAddDTO {
	private int feedPostId;
	private int userNo;
	private String body;
	private Timestamp writeDate;
	private int writeTemp;
	private int writeTempRange;
	private int writePtyCode;
	private int writeSkyCode;
	private String userId;
	private String userNickName;
	private String address1;
	private String address2;
	private String profileSysName;
	private String thumbNailSysName;
	public FeedPostAddDTO() {
		super();
	}

	public FeedPostAddDTO(int feedPostId, int userNo, String body, Timestamp writeDate, int writeTemp,
						  int writeTempRange, int writePtyCode, int writeSkyCode, String userNickName, String address1,
						  String address2, String profileSysName, String thumbNailSysName) {
		super();
		this.feedPostId = feedPostId;
		this.userNo = userNo;
		this.body = body;
		this.writeDate = writeDate;
		this.writeTemp = writeTemp;
		this.writeTempRange = writeTempRange;
		this.writePtyCode = writePtyCode;
		this.writeSkyCode = writeSkyCode;
		this.userNickName = userNickName;
		this.address1 = address1;
		this.address2 = address2;
		this.profileSysName = profileSysName;
		this.thumbNailSysName = thumbNailSysName;
	}

	public FeedPostAddDTO(int feedPostId, int userNo, String body, Timestamp writeDate, int writeTemp,
			int writeTempRange, int writePtyCode, int writeSkyCode, String userId, String userNickName, String profileSysName,
			String thumbNailSysName) {
		super();
		this.feedPostId = feedPostId;
		this.userNo = userNo;
		this.body = body;
		this.writeDate = writeDate;
		this.writeTemp = writeTemp;
		this.writeTempRange = writeTempRange;
		this.writePtyCode = writePtyCode;
		this.writeSkyCode = writeSkyCode;
		this.userId = userId;
		this.userNickName = userNickName;
		this.profileSysName = profileSysName;
		this.thumbNailSysName = thumbNailSysName;
	}

	public int getFeedPostId() {
		return feedPostId;
	}
	public void setFeedPostId(int feedPostId) {
		this.feedPostId = feedPostId;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
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
	public String getFormedWriteDate() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(writeDate);
	}
	public void setWriteDate(Timestamp writeDate) {
		this.writeDate = writeDate;
	}
	public int getWriteTemp() {
		return writeTemp;
	}
	public void setWriteTemp(int writeTemp) {
		this.writeTemp = writeTemp;
	}
	public int getWriteTempRange() {
		return writeTempRange;
	}
	public void setWriteTempRange(int writeTempRange) {
		this.writeTempRange = writeTempRange;
	}
	public String getUserNickName() {
		return userNickName;
	}
	public void setUserNickName(String userNickName) {
		this.userNickName = userNickName;
	}
	public String getProfileSysName() {
		return profileSysName;
	}
	public void setProfileSysName(String profileSysName) {
		this.profileSysName = profileSysName;
	}
	public String getThumbNailSysName() {
		return thumbNailSysName;
	}
	public void setThumbNailSysName(String thumbNailSysName) {
		this.thumbNailSysName = thumbNailSysName;
	}

	public int getWritePtyCode() {
		return writePtyCode;
	}
	public void setWritePtyCode(int writePtyCode) {
		this.writePtyCode = writePtyCode;
	}

	public int getWriteSkyCode() {
		return writeSkyCode;
	}
	public void setWriteSkyCode(int writeSkyCode) {
		this.writeSkyCode = writeSkyCode;
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

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}
