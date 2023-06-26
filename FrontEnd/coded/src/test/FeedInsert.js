import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import ToastUI from './ToastUI';
import axios from 'axios';

function FeedInsert() {
  const modalStyle = {
    content: {
      margin: 'auto',
      width: '800px',
      height: '565px',
    },
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const insertfeed = () => {
    axios({
      method: 'POST',
      url: '/feedpost/feedpost',
      params: {
        fdto: 피드,
        hdto: 해시태그,
        files: 사진
      },
    })
      .then((resp) => {
      })
      .catch((error) => {
      });
    }
  

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <button onClick={() => setModalIsOpen(true)}>글쓰기 버튼</button>
      <div>
        <Modal isOpen={modalIsOpen} style={modalStyle}>
          <ToastUI />
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
