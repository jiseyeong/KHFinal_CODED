import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import FollowerList from './FollowList';

function Follow() {
  // 팔로우 모달의 스타일 적용
  const modalStyle = {
    content: {
      margin: 'auto',
      width: '400px',
      height: '400px',
      border: '1px solid silver',
      borderRadius: '10px',
      padding: '0',
    },
  };

  const [FollowerIsOpen, setFollowerIsOpen] = useState(false);

  return (
    <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
      <div style={{ float: 'left' }}>
        <button onClick={() => setFollowerIsOpen(true)}>Follower 버튼</button>
        <Modal isOpen={FollowerIsOpen} style={modalStyle}>
          <FollowerList setFollowerIsOpen={setFollowerIsOpen} />
        </Modal>
      </div>
    </div>
  );
}

export default Follow;
