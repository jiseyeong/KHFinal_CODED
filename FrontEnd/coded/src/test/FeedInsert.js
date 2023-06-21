import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import ToastUI from './ToastUI';

function FeedInsert() {
  const modalStyle = {
    content: {
      margin: 'auto',
      width: '500px',
      height: '600px',
    },
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <button onClick={() => setModalIsOpen(true)}>글쓰기 버튼</button>
      <div>
        <Modal isOpen={modalIsOpen} style={modalStyle}>
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => setModalIsOpen(false)}>글쓰기 취소</button>
          </div>
          <br />
          <div>
            <ToastUI />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default FeedInsert;
