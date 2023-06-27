import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import ToastUI from './ToastUI';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FeedInsert() {
  const modalStyle = {
    content: {
      margin: 'auto',
      width: '800px',
      height: '565px',
    },
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isButtonClick, setisButtonClick] = useState(false);

  const insertfeed = () => {
    setisButtonClick(true);
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <button onClick={() => setModalIsOpen(true)}>글쓰기 버튼</button>
      <div>
        <Modal isOpen={modalIsOpen} style={modalStyle}>
          <ToastUI clickdata={isButtonClick} />
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => setModalIsOpen(false)}>글쓰기 취소</button>
            &nbsp;
            <button onClick={insertfeed}>완료</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default FeedInsert;
