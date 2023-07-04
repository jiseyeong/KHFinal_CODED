import React from 'react';
import { FadeLoader } from 'react-spinners';

const FeedListImgLoadingBar = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        left: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
        width: '100%',
        height: '100%',
      }}
    >
      {/* <h3>잠시만 기다려주세요.</h3> */}
      <FadeLoader color="#ffc6dc" />
    </div>
  );
};

export default FeedListImgLoadingBar;
