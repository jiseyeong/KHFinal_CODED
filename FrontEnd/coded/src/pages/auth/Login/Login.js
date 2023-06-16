import React from 'react';
import AuthTemplate from '../../../component/auth/AuthTemplate';
import AuthForm from '../../../component/auth/AuthForm';

const Login = () => {
  return (
    <AuthTemplate>
      <AuthForm type="login" />
    </AuthTemplate>
  );
};

export default Login;
