import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function NaverCodeCallbackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    console.log('Code : ' + code);
    if (code != null || code != undefined || code != '') {
      axios({
        method: 'get',
        url: '/login/oauth2/naver',
        params: {
          code: code,
        },
      }).then((response) => {
        console.log(response);
        let url = '/login/oauth2/callback/naver?message=' + response.data;
        navigate(url);
      });
    }
  }, []);
  return <div>콜백</div>;
}

export default NaverCodeCallbackPage;
