package kh.coded.dto;

public class MemberWithProfileDTO{

    private int userNo = 0;
    private String userId;    //필수
    private String pw;        //필수
    private String userNickName="";
    private String bio="";
    private String hashTag="";
    private String email; //필수
    private String address1;  //필수
    private String address2;  //필수
    private String role = Role.USER.getValue();
    private String naverToken="";
    private String kakaoToken="";
    private String googleToken="";

    // 프로필 이미지 전용 멤버필드 추가
    private int photoId;
    private String oriName;
    private String sysName;

    // 나를 팔로우 했는 지 여부를 가져올 멤버필드 추가
    private int isFollow;

    //select용
    public MemberWithProfileDTO(int userNo, String userId, String pw, String userNickName, String bio, String hashTag, String email, String address1, String address2, String role, String naverToken, String kakaoToken, String googleToken, int photoId, String oriName, String sysName, int isFollow) {
        this.userNo = userNo;
        this.userId = userId;
        this.pw = pw;
        this.userNickName = userNickName;
        this.bio = bio;
        this.hashTag = hashTag;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.role = role;
        this.naverToken = naverToken;
        this.kakaoToken = kakaoToken;
        this.googleToken = googleToken;
        this.photoId = photoId;
        this.oriName = oriName;
        this.sysName = sysName;
        this.isFollow = isFollow;
    }

    //join 용
    public MemberWithProfileDTO(String userId, String pw, String userNickName, String email, String address1, String address2) {
        super();
        this.userId = userId;
        this.pw = pw;
        this.userNickName = userNickName;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.role = Role.USER.getValue();

        Role.USER.getValue();
    }

    public MemberWithProfileDTO() {
        super();
    }

    public int getUserNo() {
        return userNo;
    }
    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userID) {
        this.userId = userID;
    }
    public String getPw() {
        return pw;
    }
    public void setPw(String pw) {
        this.pw = pw;
    }
    public String getUserNickName() {
        return userNickName;
    }
    public void setUserNickName(String userNickName) {
        this.userNickName = userNickName;
    }
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
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
    public String getNaverToken() {
        return naverToken;
    }
    public void setNaverToken(String naverToken) {
        this.naverToken = naverToken;
    }
    public String getKakaoToken() {
        return kakaoToken;
    }
    public void setKakaoToken(String kakaoToken) {
        this.kakaoToken = kakaoToken;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getGoogleToken() {
        return googleToken;
    }
    public void setGoogleToken(String googleToken) {
        this.googleToken = googleToken;
    }

    public String getHashTag() {
        return hashTag;
    }

    public void setHashTag(String hashTag) {
        this.hashTag = hashTag;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPhotoId() {
        return photoId;
    }

    public void setPhotoId(int photoId) {
        this.photoId = photoId;
    }

    public String getOriName() {
        return oriName;
    }

    public void setOriName(String oriName) {
        this.oriName = oriName;
    }

    public String getSysName() {
        return sysName;
    }

    public void setSysName(String sysName) {
        this.sysName = sysName;
    }

    public int getIsFollow() {
        return isFollow;
    }

    public void setIsFollow(int isFollow) {
        this.isFollow = isFollow;
    }
}
