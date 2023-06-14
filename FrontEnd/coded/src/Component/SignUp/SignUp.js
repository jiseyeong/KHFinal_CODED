import React from 'react';
import AuthTemplate from '../../Component/auth/AuthTemplate';
import AuthForm from '../../Component/auth/AuthForm';

const SignUp = () => {
  return (
    <AuthTemplate>
      <AuthForm type="register"></AuthForm>
    </AuthTemplate>
  );
};

export default SignUp;
