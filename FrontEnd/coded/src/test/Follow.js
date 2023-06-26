import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

function Follow() {
  const modalStyle = {
    content: {
      margin: 'auto',
      width: '450px',
      height: '450px',
    },
  };

  const divStyle = {
    content: {},
  };
  const [FollowerIsOpen, setFollowerIsOpen] = useState(false);
  const [FollowingOpen, setFollowingOpen] = useState(false);

  return (
    <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ float: 'left'}}>
          <button onClick={() => setFollowerIsOpen(true)}>Follower 버튼</button>
          <Modal isOpen={FollowerIsOpen} style={modalStyle}>
            <FollowerList />
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setFollowerIsOpen(false)}>
                List창 닫기
              </button>
            </div>
          </Modal>
        </div>

        <div style={{ float: 'left' }}>
          <button onClick={() => setFollowingOpen(true)}>Following 버튼</button>
          <Modal isOpen={FollowingOpen} style={modalStyle}>
            <FollowingList />
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setFollowingOpen(false)}>
                List창 닫기
              </button>
            </div>
          </Modal>
        </div>
    </div>
  );
}

export default Follow;
