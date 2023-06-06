import React from 'react'
import AuthTemplate from '../../component/auth/AuthTemplate'
import AuthForm from '../../component/auth/AuthForm'

const RegisterPage = ()=>{
    return (
        <AuthTemplate>
            <AuthForm type="register"></AuthForm>
        </AuthTemplate>
    )
};

export default RegisterPage;