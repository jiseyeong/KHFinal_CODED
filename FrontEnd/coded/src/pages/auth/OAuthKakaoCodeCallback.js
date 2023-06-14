import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import usePromise from "../../lib/usePromise";

function KakaoCodeCallbackPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const code = searchParams.get('code');

    if(code != null || code != undefined || cpde != ""){
        const [loading, response, error] = usePromise(()=>{
            return axios({
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
        },[]);
        if(loading){
            return (
                <div>
                    진행 중...
                </div>
            )
        }
        if(error){
            return (
                <div>
                    에러 발생!
                </div>
            )
        }
    }else{
        navigate("/login");
    }
    return(
        <div>
        </div>
    )
}

export default KakaoCodeCallbackPage;