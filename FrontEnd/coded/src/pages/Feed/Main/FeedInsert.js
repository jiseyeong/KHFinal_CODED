import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import ToastUI from './ToastUI';
import FeedUpdate from './FeedUpdate';

function FeedInsert() {
  const modalStyle = {
    content: {
      margin: 'auto',
      width: '800px',
      height: '565px',
    },
  };
  const [FeedPostInsertOpen, setFeedPostInsertOpen] = useState(false);
  const [FeedPostUpdateOpen, setFeedPostUpdateOpen] = useState(false);

  const [insertButtonClick, setinsertButtonClick] = useState(false);

  const [updateButtonClick, setupdateButtonClick] = useState(false);

  const insertfeed = () => {
    setinsertButtonClick(true);
  };

  const updatefeed = () => {
    setupdateButtonClick(true);
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <button onClick={() => setFeedPostInsertOpen(true)}>글쓰기 버튼</button>
      <div>
        <Modal isOpen={FeedPostInsertOpen} style={modalStyle}>
          <ToastUI clickdata={insertButtonClick} />
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => setFeedPostInsertOpen(false)}>
              글쓰기 취소
            </button>
            &nbsp;
            <button onClick={insertfeed}>완료</button>
          </div>
        </Modal>
      </div>

      <button onClick={() => setFeedPostUpdateOpen(true)}>글수정 버튼</button>
      <div>
        <Modal isOpen={FeedPostUpdateOpen} style={modalStyle}>
          <FeedUpdate clickdata={updateButtonClick} />
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => setFeedPostUpdateOpen(false)}>
              글수정 취소
            </button>
            &nbsp;
            <button onClick={updatefeed}>완료</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default FeedInsert;
