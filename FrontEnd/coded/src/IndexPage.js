import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './modules/Redux/members';
import axios from 'axios';

const IndexPage = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const accessToken = useSelector((state) => state.member.access);

  function doKakaoLogin() {
    axios({
      method: 'get',
      url: '/login/oauth2/kakao/codeInfo',
    })
      .then(function (response) {
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${response.data.client_id}&redirect_uri=${response.data.redirect_uri}&response_type=code`;
        window.location.href = KAKAO_AUTH_URL;
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  function doNaverLogin() {
    axios({
      method: 'get',
      url: '/login/oauth2/naver/codeInfo',
    })
      .then(function (response) {
        const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${response.data.client_id}&redirect_uri=${response.data.redirect_uri}&state=test`;
        window.location.href = NAVER_AUTH_URL;
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  function doGoogleLogin() {
    axios({
      method: 'get',
      url: '/login/oauth2/google/codeInfo',
    })
      .then((response) => {
        console.log(response);
        const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${response.data.client_id}&redirect_uri=${response.data.redirect_uri}&response_type=code&scope=profile`;
        window.location.href = GOOGLE_AUTH_URL;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function kakaoUnlink() {
    if (accessToken) {
      axios({
        method: 'put',
        url: 'auth/kakaoUnlink',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  function naverUnlink() {
    if (accessToken) {
      axios({
        method: 'put',
        url: 'auth/naverUnlink',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  function googleUnlink() {
    if (accessToken) {
      axios({
        method: 'put',
        url: 'auth/googleUnlink',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Link to="/feedList">
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
      <Link to="/feedList">단순 피드 리스트</Link>
      <br />
      <br />
      <Link to="/profile">마이 프로필 페이지</Link>
      <br />
      <br />
      <Link to="/DMPage">DMRoom</Link>
      <br />
      <br />
      <Link to="/ootd">OOTD</Link>
      <br />
      <br />
      <Link to="/weekly">Weekly</Link>
      <br />
      <br />
      <Link to="myPickPage">마이픽 페이지</Link>
      <br />
      <br />
      <Link to="/TestComponent">기능 테스트</Link>
      <br />
      <br />
      <Link to="/searchBox">검색 테스트</Link>
      <br />
      <br />
      <Link to="/test/feedComment">피드 댓글 테스트</Link>
      <br />
      <br />
      <Link to="/test/FeedInsert">피드 작성 테스트</Link>
      <br />
      <br />
      <Link to="/test/TodayAndAdForm">오늘의 날씨 및 광고 테스트</Link>
      <br />
      <br />
      <button onClick={onLogout}>로그아웃</button>
      <br />
      <br />
      <button onClick={doKakaoLogin}>카카오 소셜 등록</button>
      <button onClick={kakaoUnlink}>카카오 소셜 해제</button>
      <br />
      <button onClick={doNaverLogin}>네이버 소셜 등록</button>
      <button onClick={naverUnlink}>네이버 소셜 해제</button>
      <br />
      <button onClick={doGoogleLogin}>구글 소셜 등록</button>
      <button onClick={googleUnlink}>구글 소셜 해제</button>
    </div>
  );
};

export default IndexPage;
