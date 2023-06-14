import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../modules/tokens";

function KakaoLastCallbackPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [message, setMessage] = useState(searchParams.get('message'))
    const dispatch = useDispatch();
    const onLogin = useCallback((accessToken) => dispatch(login(accessToken)), [dispatch]);

    useEffect(()=>{
        if(message != "T" && message != "F"){
            onLogin(message);
        }else if(message == "T"){
            setMessage("등록되었습니다.");
        }else if(message == "F"){
            setMessage("회원가입 및 로그인 후 등록을 먼저 해주셔야 이용하실 수 있습니다.");
        }else{
            setMessage("알 수 없는 오류입니다. 관리자에게 문의해주십시오.");
        }
    }, []);
    return(
        <div>
            {message}
        </div>
    )
}

export default KakaoLastCallbackPage;