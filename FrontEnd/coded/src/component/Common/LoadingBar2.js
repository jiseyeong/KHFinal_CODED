import React from 'react';
import Spinner from './Spinner.gif';

const LoadingBar2 = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* <h3>잠시만 기다려주세요.</h3> */}
      <img style={{ width: '100%', height: '80%' }} src={Spinner} alt="로딩" />
    </div>
  );
};

export default LoadingBar2;
