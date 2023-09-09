<h1>👚 CODED</h1>
<h2>개요</h2>
  <li>﻿기상 정보를 이용한 패션 SNS</li>
<h4>📄 만든 목적</h4>
  <li>﻿환절기 일교차와 실내외 온도차를 겪으며 기온별로 적절한 옷차림에 대한 조언과 정보를 필요로 함</li>
  
<h4>⏱ 일정</h4>
  <li>﻿2023년 6월 5일 ~ 2023년 7월 5일</li>
  <li>참여도 : 20% (7인 프로젝트)</li>

<h4>🔖 배포 주소</h4>
  <li>http://kh-coded.duckdns.org:9999/</li>
  <h2>✔사용 기술 및 환경</h2>
    <li>OS : Windows OS</li>
    <li>Tool : IntelliJ, Eclipse</li>
    <li>DBMS : Oracle DB</li>
    <li>Server : Apache Tomcat 8.5</li>
    <li>Front-End : React , Sass(Scss), Redux</li>
    <li>Back-End : Spring Boot , Java</li>
    <li>library : 기상API, Masonry-Grid, Google, Kakao, Naver 로그인 API 등</li>

<h2>✔ERD</h2>

![image](https://github.com/jiseyeong/KH_study/assets/128104813/0ec7ddb1-f044-4422-80ca-9fb8e27c1958)
![image](https://github.com/jiseyeong/KH_study/assets/128104813/5babf050-d12f-4f59-a880-a6a225888dd6)

<h2>✔주요 기능</h2>
<h4>로그인/회원가입</h4>
  <li>﻿API를 활용한 카카오, 네이버, 구글 간편로그인 기능 구현</li>
  <li>Spring Security, JWT를 활용한 로그인 기능 구현</li>
  <li>버튼을 이용한 비밀번호 표시/숨김 기능 구현</li>
  <li>쿠키를 활용한 아이디 기억 기능 구현</li>

![image](https://github.com/jiseyeong/KH_study/assets/128104813/16b1f737-6036-4f16-a76c-c844b65e8afe)
![image](https://github.com/jiseyeong/KH_study/assets/128104813/e21a766e-b46e-428b-a617-2b26558412ca)

<br>
<h4>팔로잉/팔로워 목록</h4>
  <li>axios의 멀티리퀘스트로 팔로잉, 팔로워 리스트, 팔로우 여부 출력</li>
  <li>Redux에 저장된 로그인 한 유저의 유저 No를 보내서 팔로잉, 팔로워 리스트의 팔로우 여부를 확인 후 false, true로 데이터를 보냄</li>
  <li>한번 누르면 팔로우, 다시 한번 누르면 언팔로우 되게 구현함</li>
<br>

![image](https://github.com/jiseyeong/KH_study/assets/128104813/351b23fd-ae25-4320-ac35-a013d0fcd280)
![image](https://github.com/jiseyeong/KH_study/assets/128104813/dd17aeec-2c0e-4647-8ad0-86480c627094)

