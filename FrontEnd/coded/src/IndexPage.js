import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Link to="/HomepageTemplate">
        <button style={{ width: '200px', height: '100px' }}>페이지 시작</button>
      </Link>
      <br />
      <br />
      <Link to="/login">로그인 페이지</Link>
      <br />
      <br />
      <Link to="/signup">회원가입 페이지</Link>
      <br />
      <br />
      <Link to="/HomePageTemplate">홈페이지 양식</Link>
      <br />
      <br />
      <Link to="/feed">단순 피드 리스트</Link>
      <br />
      <br />
      <Link to="/feed/id">아이디 검색 결과(테스트)</Link>
      <br />
      <br />
      <Link to="/feed/nick">닉네임 검색 결과(테스트)</Link>
      <br />
      <br />
      <Link to="/feed/hashs">해쉬 검색 결과(테스트)</Link>
      <br />
      <br />
      <Link to="/profile">마이 프로필 페이지</Link>
      <br />
      <br />
      <Link to="/FileUploadTest">파일 업로드 테스트</Link>
      <br />
      <br />
      <Link to="/DMPage">DMRoom</Link>
      <br />
      <br />
      <Link to="/search">검색</Link>
      <br />
      <br />
      <Link to="/ootd">OOTD</Link>
      <br />
      <br />
      <Link to="/login/oauth2/code/kakao">KakaoCodeCallbackPage</Link>
      <br />
      <br />
      <Link to="/login/oauth2/code/naver">NaverCodeCallbackPage</Link>
      <br />
      <br />
      <Link to="/login/oauth2/callback/kakao">LastCallbackPageKAKAO</Link>
      <br />
      <br />
      <Link to="/login/oauth2/callback/naver">LastCallbackPageNaver</Link>
    </div>
  );
};

export default IndexPage;
