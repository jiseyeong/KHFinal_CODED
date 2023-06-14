import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import palette from '../../styles/palette.scss';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setRefresh } from '../../modules/tokens';
import cookie from 'react-cookies';
import refreshTokenUse from '../../lib/RefreshTokenUse';

/*
    회원가입 또는 로그인 폼
 */

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    /* color: ${palette.gray}; */
    margin-bottom: 1rem;
  }
`;

/*
    스타일링 된 인풋
*/
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  /* border-bottom: 1px solid ${palette.gray}; */
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    /* border-bottom: 1px solid ${palette.gray}; */
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    /* color: ${palette.gray}; */
    text-decoration: underline;
    &:hover {
      /* color: ${palette.gray}; */
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const AuthForm = ({ type }) => {
  const text = textMap[type];
  const navigate = useNavigate();

  //const access = useSelector((state) => state.token.access);
  const dispatch = useDispatch();
  const onLogin = useCallback(
    (accessToken) => dispatch(login(accessToken)),
    [dispatch],
  );
  const onLogout = useCallback(() => dispatch(logout(), [dispatch]));
  const onSetRefresh = useCallback(
    (refreshToken) => dispatch(setRefresh(refreshToken)),
    [dispatch],
  );

  //const [cookies, setCookie] = useCookies(['CodedRefreshToken']);

  function doRegister(e) {
    //e.preventDefault();

    //또는 axios.post("/auth/join", null, {params : {~}})
    // 두번째 인자가 data긴 한데, 들어가는 방식이 Query 방식이 아님.
    //따라서 쿼리방식의 '@RequestParam'을 쓰려면 이하 또는 세번쨰 인자 써야 함.
    axios({
      method: 'post',
      url: '/auth/member',
      params: {
        userId: idRef.current.value,
        pw: pwRef.current.value,
        userNickName: nickNameRef.current.value,
      },
      timeout: 5000,
      //responseType:"json" // or "stream"
    })
      .then(function (response) {
        console.log(response.data);
        navigate('/login');
        //return JSON.parse(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function doLogin(e) {
    axios({
      method: 'get',
      url: '/auth/login',
      params: {
        userId: idRef.current.value,
        pw: pwRef.current.value,
      },
      timeout: 5000,
    })
      .then(function (response) {
        let refreshToken = cookie.load('CodedRefreshToken');
        console.log(refreshToken);
        refreshToken = refreshToken.substr(
          'Bearer '.length,
          refreshToken.length,
        );
        onLogin(response.data);
        onSetRefresh(refreshToken);
      })
      .catch(function (e) {
        console.log(e);
        onLogout();
      });
  }

  function doRefrshTest() {
    axios({
      type: 'GET',
      url: '/auth/refresh',
    })
      .then(function (response) {
        //엑세스 토큰 설정
        onLogin(response.data);
        let refreshToken = cookie.load('CodedRefreshToken');
        refreshToken = refreshToken.substr(
          'Bearer '.length,
          refreshToken.length,
        );
        onSetRefresh(refreshToken);
      })
      .catch(function (e) {
        console.log(e);
        onLogout();
        //history.go('/login');
      });
  }

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

  const nickNameRef = useRef(null);
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const pwConfirmRef = useRef(null);

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      {type === 'register' && (
        <StyledInput
          type="text"
          autoComplete="name"
          name="userNickName"
          placeholder="닉네임"
          ref={nickNameRef}
        />
      )}
      <StyledInput
        type="text"
        autoComplete="username"
        name="userId"
        placeholder="아이디"
        ref={idRef}
      />
      <StyledInput
        autoComplete="new-password"
        name="pw"
        placeholder="비밀번호"
        type="password"
        ref={pwRef}
      />
      {type === 'register' && (
        <StyledInput
          autoComplete="new-password"
          name="pwConfirm"
          placeholder="비밀번호 확인"
          type="password"
          ref={pwConfirmRef}
        />
      )}
      {type === 'login' && (
        <>
          <button onClick={doKakaoLogin}>카카오 로그인</button>
          <button onClick={doNaverLogin}>네이버 로그인</button>
          <button onClick={doRefrshTest}>리프레시 테스트</button>
        </>
      )}
      <ButtonWithMarginTop
        cyan={true}
        fullWidth
        onClick={type === 'register' ? doRegister : doLogin}
      >
        {text}
      </ButtonWithMarginTop>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
