import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function NaverCodeCallbackPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const code = searchParams.get('code');
        console.log("Code : " + code);
        if(code != null || code != undefined || code != ""){
            axios({
                method:"get",
                url:"/login/oauth2/naver/tokenInfo"
            }).then((response)=>{
                axios({
                    method:"post",
                    url:"https://nid.naver.com/oauth2.0/token",
                    params:{
                        grant_type:"authorization_code",
                        client_id:response.data.client_id,
                        client_secret:response.data.client_secret,
                        code:code,
                        state:"test"
                    }
                }).then((response)=>{
                    axios({
                        method:'get',
                        url:'/login/oauth2/naver',
                        params:{
                            accessToken:response.data.access_token
                        }
                    }).then((response)=>{
                        console.log(response);
                        let url = "/login/oauth2/callback/naver?message="+response.data;
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

export default NaverCodeCallbackPage;