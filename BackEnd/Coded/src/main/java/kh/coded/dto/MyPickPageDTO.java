package kh.coded.dto;

public class MyPickPageDTO {
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
    private int photoId;
    private String oriName;
    private String sysName;
    private int postCount;
    private int followingCount;
    private int followerCount;

    public MyPickPageDTO() {
    }

    public MyPickPageDTO(int userNo, String userId, String pw, String userNickName, String bio, String hashTag, String email, String address1, String address2, String role, String naverToken, String kakaoToken, String googleToken, int photoId, String oriName, String sysName, int postCount, int followingCount, int followerCount) {
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
        this.postCount = postCount;
        this.followingCount = followingCount;
        this.followerCount = followerCount;
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

    public void setUserId(String userId) {
        this.userId = userId;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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

    public String getGoogleToken() {
        return googleToken;
    }

    public void setGoogleToken(String googleToken) {
        this.googleToken = googleToken;
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

    public int getPostCount() {
        return postCount;
    }

    public void setPostCount(int postCount) {
        this.postCount = postCount;
    }

    public int getFollowingCount() {
        return followingCount;
    }

    public void setFollowingCount(int followingCount) {
        this.followingCount = followingCount;
    }

    public int getFollowerCount() {
        return followerCount;
    }

    public void setFollowerCount(int followerCount) {
        this.followerCount = followerCount;
    }
}
