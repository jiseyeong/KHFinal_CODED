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

}
