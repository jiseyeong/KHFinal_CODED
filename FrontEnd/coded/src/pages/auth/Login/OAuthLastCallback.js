import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../modules/Redux/members';

function LastCallbackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogin = useCallback(
    (accessToken) => dispatch(login(accessToken)),
    [dispatch],
  );

  useEffect(()=>{
    const paramMessage = searchParams.get('message');
    if (paramMessage != 'T' && paramMessage != 'F' && paramMessage != 'FF') {
      onLogin(paramMessage);
      navigate("/");
    } else if (paramMessage == 'T') {
      // setMessage('등록되었습니다.');
      navigate("/profile");
    } else if (paramMessage == 'F') {
      setMessage(
        '회원가입 및 로그인 후 등록을 먼저 해주셔야 이용하실 수 있습니다.',
      );
    } else if(paramMessage == 'FF'){
      setMessage('이미 다른 계정에 연동되어 있는 소셜 계정입니다.');
    }
    else {
      setMessage('알 수 없는 오류입니다. 관리자에게 문의해주십시오.');
    }
  },[]);
  return (
    <div>
      <div>{message}</div>
    </div>
    );
}

export default LastCallbackPage;
