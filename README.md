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
  <li>Link 기능을 활용한 로그인/회원가입 페이지 전환</li>

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

<br>
<h4>피드 상세 페이지</h4>
  <li>모달 창을 활용한 피드 디테일 페이지 구현</li>
  <li>﻿캐러쉘을 이용한 피드 사진 출력 기능 구현</li>
  <li>버튼을 이용한 스크랩, 좋아요 기능 구현</li>
  <li>피드 출력, 댓글, 대댓글 기능 구현</li>
  <li>피드 수정, 삭제 기능 구현</li>
  <li>댓글 수정, 삭제 기능 구현</li>
<br>

![image](https://github.com/jiseyeong/KH_study/assets/128104813/10498102-bcf5-4ef4-981f-0d74626b2b40)

<br>

<h4>ID / PW 찾기</h4>
  <li>이메일 검색을 통한 ID 찾기 기능 구현</li>
  <li>입력한 이메일, 아이디, 닉네임을 성공적으로 조회 시 난수 생성을 통한 임시 비밀번호 발급 후 해당 유저의 이메일로 전송하여 임시 비밀번호 제공 </li>

<h4>메인 페이지</h4>
  <li>유저들이 작성한 피드 리스트들을 출력</li>
  <li>벽돌형으로 정렬된 이미지 썸네일 카드형 피드 리스트에 무한 스크롤 기능을 도입하여 구성</li>
  <li>회원/비회원 유저에 따라 페이지를 다르게 사이트 내 디자인을 다르게 적용하고 특정 기능을 제한 (댓글, 좋아요, 스크랩, 팔로우, DM 등)</li>
  <li>상단 네비 활성화 여부에 따른 정렬 기준과 필터 적용을 다르게 하여 페이지 내 적용 (Hot, New, Following, MyPick, Scrap으로 구성)</li>
  <li>페이지 상단으로 이동하는 TOP 버튼 구현</li>

<h4>검색 결과 페이지</h4>
  <li>피드 클릭 시 피드 내 자동완성 기능을 통해 검색한 결과 페이지</li>
  <li>입력의 실시간 반응을 기반으로 자동완성 기능 구현</li>
  <li>유저의 ID, NickName을 통한 유저 검색과 피드에 작성된 해시태그 검색을 동일하게 적용</li>
  <li>검색 결과에 따른 내용은 메인 페이지와 동일</li>

<h4>Weekly 페이지</h4>
  <li>주간 날씨정보 안내 및 추천 코디 피드 페이지 구현</li>
  <li>회원 전용 페이지로, 유저가 등록 주소를 토대로 기상청 공공 API로 해당 주소의 일주일 간 날씨를 페이지 좌측에 리스트 형태로 출력</li>
  <li>페이지 우측에 해당 날씨와 기온에 맞는 피드 리스트를 출력하여 유저가 한 눈에 확인할 수 있도록 구현</li>
  <li>기상청 공공데이터 API를 활용하여 주간 날씨 정보 안내 기능 구현</li>
  
<h4>My Pick 페이지</h4>
  <li>프로필 정보와 작성 게시물을 메인 페이지 피드 리스트 형태의 최신순으로 출력</li>
  <li>유저 본인의 경우 모달 창을 활용한 새 글 작성 기능, 프로필 설정 페이지를 버튼 형식으로 Link</li>
  <li>타인의 페이지로 방문한 경우, DM 보내기 기능과 해당 유저 팔로우/언팔로우 기능 구현</li>
  <li>유저의 팔로잉/팔로우 리스트 조회 기능 구현</li>
  
<h4>피드 작성 페이지</h4>
  <li>모달창을 활용한 새 글 작성 기능 구현</li>
  <li>전용 Select 박스로 피드에 들어갈 해시태그 검색 및 입력</li>
  <li>피드에 들어갈 사진을 업로드 시, Base64형태로 이미지 데이터를 읽어 들여 사용자에게 업로드한 사진을 미리보기 형태로 바로 확인할 수 있도록 구현 등록된 여러 사진은 Carosel 형태로 구성</li>
  <li>기상 API를 통하여 등록된 주소와 작성 당시 시간의 기상 상황을 자동으로 피드에 반영</li>

<h4>프로필 설정 페이지</h4>
  <li>사용자 본인의 MyPick 페이지를 통하여 이동된 사용자 프로필 설정 페이지 구현</li>
  <li>프로필 사진 조회/업로드/수정/삭제 기능 구현</li>
  <li>개인정보 조회/수정 기능 구현</li>
  <li>비밀번호 재설정 기능 구현</li>

<h4>DM 페이지</h4>
  <li>사용자 간 구독 후 실시간 채팅 송수신 기능 구현</li>
  <li>STOMP를 활용하여 실시간 채팅 기능 구현</li>
  <li>문자, 이미지 송수신 기능 구현</li>
  <li>채팅 수신 시 알림 표시 기능 구현</li>
  <li>채팅방 생성 및 삭제 기능 구현</li>
  
<h4>그 외 (헤더, 네비게이션 바, 푸터)</h4>
  <li>공통으로 사용되는 헤더, 네비게이션 바, 푸터 기능 구현</li>
  <li>'Framer-motion' 라이브러리를 활용하여 스크롤링 애니메이션 효과를 준 이용약관 페이지, 개인정보 보호정책 페이지 구현</li>
  <li>회원 탈퇴 기능 구현</li>
  <li>로그인 여부와 접속 페이지에 따라 다르게 출력되는 네비게이션바 기능 구현</li>
