import React, { useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import palette from '../../lib/styles/pallets';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

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
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/*
    스타일링 된 인풋
*/
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const AuthForm = ({ type }) => {
  const text = textMap[type];

  function doRegister(e) {
    //e.preventDefault();

    //또는 axios.post("/auth/join", null, {params : {~}})
    // 두번째 인자가 data긴 한데, 들어가는 방식이 Query 방식이 아님.
    //따라서 쿼리방식의 '@RequestParam'을 쓰려면 이하 또는 세번쨰 인자 써야 함. 
    axios({
      method: 'post',
      url: '/auth/join',
      params: {
        userID: idRef.current.value,
        pw: pwRef.current.value,
        userNickName: nickNameRef.current.value,
      },
      timeout: 5000,
      //responseType:"json" // or "stream"
    })
      .then(function (response) {
        console.log(response.data);
        //return JSON.parse(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function doLogin(e){
    axios.post("/auth/login", null, {params:{
        userID: idRef.current.value,
        pw: pwRef.current.value,
    }});
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
            autoComplete="name"
            name="userNickName"
            placeholder="닉네임"
            ref={nickNameRef}
          />
        )}
        <StyledInput
          autoComplete="userID"
          name="userID"
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
        <ButtonWithMarginTop cyan={true} fullWidth onClick={type==='register' ? (doRegister) : (doLogin)}>
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
