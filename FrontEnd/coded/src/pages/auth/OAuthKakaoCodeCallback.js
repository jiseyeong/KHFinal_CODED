import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function KakaoCodeCallbackPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const code = searchParams.get('code');
        console.log("Code : " + code);
        if(code != null || code != undefined || cpde != ""){
            axios({
                method:"get",
                url:"/login/oauth2/kakao/tokenInfo"
            }).then((response)=>{
                axios({
                    method:"post",
                    url:"https://kauth.kakao.com/oauth/token",
                    params:{
                        grant_type:"authorization_code",
                        client_id:response.data.client_id,
                        client_secret:response.data.client_secret,
                        redirect_uri:response.data.redirect_uri,
                        code:code
                    }
                }).then((response)=>{
                    axios({
                        method:'get',
                        url:'/login/oauth2/kakao',
                        params:{
                            accessToken:response.data.access_token
                        }
                    }).then((response)=>{
                        console.log(response);
                        let url = "/login/oauth2/callback/kakao?message="+response.data;
                        navigate(url);
                    })
                })
            })
        }
    },[]);
    return(
        <div>
            콜백
        </div>
    )
}

export default KakaoCodeCallbackPage;