import React from 'react';

const FollowingList = () => {
  return (
    <div className="container">
      <div
        style={{
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ border: '1px solid black', width: '20%' }}>사진</div>
        <div style={{ border: '1px solid black', width: '50%' }}>
          <div>아이디</div>
          <div>닉네임</div>
        </div>
        <div style={{ border: '1px solid black', width: '30%' }}>
          <button>팔로잉 버튼</button>
        </div>
      </div>
    </div>
  );
};

export default FollowingList;
