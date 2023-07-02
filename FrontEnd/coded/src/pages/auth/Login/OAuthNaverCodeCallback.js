import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PageLoadingBar from '../../../component/Common/PageLoadingBar';

function NaverCodeCallbackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const accessToken = useSelector((state) => state.member.access);
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (change) {
      const code = searchParams.get('code');
      if (code) {
        setLoading(true);
        axios({
          method: 'get',
          url: '/login/oauth2/naver',
          params: {
            code: code,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            setLoading(false);
            let url = '/login/oauth2/callback?message=' + response.data;
            navigate(url);
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
    return <div>오류 발생!</div>;
  }
  return <div>콜백</div>;
}

export default NaverCodeCallbackPage;
