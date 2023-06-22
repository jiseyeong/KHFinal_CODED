import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import ToastUITest from './ToastUITest';
import CaroselImage from './CaroselImage';

function FeedInsertTest() {
  const modalStyle = {
    content: {
      margin: 'auto',
      width: '1000px',
      height: '600px',
    },
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgBase64, setImgBase64] = useState([]);
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <button onClick={() => setModalIsOpen(true)}>글쓰기 버튼</button>
      <div>
        <Modal isOpen={modalIsOpen} style={modalStyle}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            <div
              style={{
                width: '40%',
                float: 'left',
              }}
            >
              <CaroselImage imgBase64={imgBase64} />
            </div>
            <div
              style={{
                width: '60%',
                height: '100%',
                float: 'left',
                display: 'flex',
                margin: '1rem',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
              }}
            >
              <div>
                <ToastUITest setImgBase64={setImgBase64} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <button onClick={() => setModalIsOpen(false)}>
                  글쓰기 취소
                </button>
                &nbsp;
                <button>완료</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default FeedInsertTest;
