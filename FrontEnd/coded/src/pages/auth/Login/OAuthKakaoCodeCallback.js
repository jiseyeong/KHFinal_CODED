import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PageLoadingBar from '../../../component/Common/PageLoadingBar';

function KakaoCodeCallbackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const accessToken = useSelector((state) => state.member.access);
  const [change, setChange] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (change) {
      const code = searchParams.get('code');
      if (code) {
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
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }).then((response) => {
                setLoading(false);
                let url = '/login/oauth2/callback?message=' + response.data;
                navigate(url);
              });
            });
          })
          .catch((error) => {
            setLoading(false);
            setError(true);
            console.log(error);
          });
      } else {
        navigate('/login');
      }
    }
  }, [change]);

  useEffect(() => {
    if (accessToken) {
      setChange((prev) => {
        return !prev;
      });
    } else {
      setTimeout(() => {
        setChange((prev) => {
          return !prev;
        });
      }, 1000);
    }
  }, [accessToken]);

  if (loading) {
    return <PageLoadingBar />;
  }
  if (error) {
    return <div>에러 발생!</div>;
  }
  return <div></div>;
}

export default KakaoCodeCallbackPage;
