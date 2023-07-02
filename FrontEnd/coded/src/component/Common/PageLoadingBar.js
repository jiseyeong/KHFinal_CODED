import React from 'react';
import { FadeLoader } from 'react-spinners';

const PageLoadingBar = () => {
  return (
    <div
      className="pageLoadingBar" // 페이지 내 css 적용 가능
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '500px',
      }}
    >
      <h3>잠시만 기다려주세요.</h3>
      <FadeLoader color="#ffc6dc" />
    </div>
  );
};

export default PageLoadingBar;
