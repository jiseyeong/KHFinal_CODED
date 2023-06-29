import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './modules/Redux/members';
import axios from 'axios';
import ReportModal from './component/Report/component/ReportModal';
import { color } from 'framer-motion';

const IndexPage = () => {
  const [reportView, setReportView] = useState(false);
  const [reportViewStyle, setReportViewStyle] = useState({
    width: '480px',
    height: '770px',
    background: 'black',
    position: '',
  });
  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const accessToken = useSelector((state) => state.member.access);

  function onReportView() {
    setReportView(!reportView);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Link to="/feedList">
        <button style={{ width: '200px', height: '100px' }}>페이지 시작</button>
      </Link>
      <br />
      <br />
      <Link to="/login">로그인 페이지</Link> // Completed!
      <br />
      <br />
      <Link to="/signup">회원가입 페이지</Link> // Completed!
      <br />
      <br />
      <Link to="/feedList">단순(최신순) 피드 리스트</Link>
      <br />
      <br />
      <Link to="/feedPopularList">인기순 피드 리스트</Link>
      <br />
      <br />
      <Link to="/profile">마이 프로필 페이지</Link> // Completed!
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
      <Link to="myPickPage">마이픽 페이지</Link> // Completed!
      <br />
      <br />
      <Link to="/TestComponent">기능 테스트</Link>
      <br />
      <br />
      <Link to="/test/feedComment">피드 댓글 테스트</Link>
      <br />
      <br />
      <Link to="/FeedInsert">피드 작성 테스트</Link>
      <br />
      <br />
      <Link to="/followList">팔로워 팔로잉 리스트 테스트</Link>
      <br />
      <br />
      <Link to="/todayWeather">오늘의 날씨</Link>
      <br />
      <br />
      <Link to="/Admin">관리자페이지</Link>
      {/* <Link to="/confirmDialog">로그인안내창</Link> */}
      <br />
      <br />
      <button onClick={onReportView}>신고하기</button>
      <br />
      <br />
      <button onClick={onLogout}>로그아웃</button>
      <br />
      <br />
      {reportView && <ReportModal onReportView={onReportView} />}
    </div>
  );
};

export default IndexPage;
