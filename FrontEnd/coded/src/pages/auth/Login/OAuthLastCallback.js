import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../modules/Redux/members';
import ErrorConfirmPage from '../../../assets/ButtonAsset/ErrorConfirmPage';

function LastCallbackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogin = useCallback(
    (accessToken) => dispatch(login(accessToken)),
    [dispatch],
  );

  useEffect(() => {
    const paramMessage = searchParams.get('message');
    if (paramMessage != 'T' && paramMessage != 'F' && paramMessage != 'FF') {
      onLogin(paramMessage);
      location.href = '/';
      // navi로 이동하는 경우 App.js에서 '/auth/refresh'로 accessToken을 못 받는 경우가 있어
      // 별도의 새로고침 과정이 없이 login정보가 필요한 곳에 바로 접근 시, 에러가 납니다.
      // location.href로 임시로 바꿔놨으니 나중에 확인하시면 되겠습니다.
      // 서버쪽 로그 :  토큰이 Bearer String 으로 시작하지 않습니다. target : /login/oauth2/google (kakao, 기타...)
      // navigate('/');
    } else if (paramMessage == 'T') {
      location.href = '/profile';
      // setMessage('등록되었습니다.');
      // navigate('/profile');
    } else if (paramMessage == 'F') {
      setMessage('MEMBER-ONLY SERVICE. SignUp/Login First!');
    } else if (paramMessage == 'FF') {
      setMessage('이미 다른 계정에 연동되어 있는 소셜 계정입니다.');
    } else {
      setMessage('알 수 없는 오류입니다. 관리자에게 문의해주십시오.');
    }
  }, []);
  return (
    <div>
      <ErrorConfirmPage message={message} backPagesCount={-2} />
    </div>
  );
}

export default LastCallbackPage;
