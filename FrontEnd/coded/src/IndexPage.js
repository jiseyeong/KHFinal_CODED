import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './modules/Redux/members';

const IndexPage = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

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
      <Link to="/TestComponent">기능 테스트</Link>
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
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
};

export default IndexPage;
