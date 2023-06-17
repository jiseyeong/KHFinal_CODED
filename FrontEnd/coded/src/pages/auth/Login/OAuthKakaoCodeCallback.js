import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function KakaoCodeCallbackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code != null || code != undefined || cpde != '') {
      setLoading(true);
      axios({
        method: 'get',
        url: '/login/oauth2/kakao/tokenInfo',
      })
        .then((response) => {
          axios({
            method: 'post',
            url: 'https://kauth.kakao.com/oauth/token',
            params: {
              grant_type: 'authorization_code',
              client_id: response.data.client_id,
              client_secret: response.data.client_secret,
              redirect_uri: response.data.redirect_uri,
              code: code,
            },
          }).then((response) => {
            axios({
              method: 'get',
              url: '/login/oauth2/kakao',
              params: {
                accessToken: response.data.access_token,
              },
            }).then((response) => {
              setLoading(false);
              console.log(response);
              let url = '/login/oauth2/callback/kakao?message=' + response.data;
              navigate(url);
            });
          });
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });
    } else {
      navigate('/login');
    }
  }, []);

  if (loading) {
    return <div>진행 중...</div>;
  }
  if (error) {
    return <div>에러 발생!</div>;
  }
  return <div></div>;
}

export default KakaoCodeCallbackPage;
