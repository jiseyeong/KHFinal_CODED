import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import ToastUI from './ToastUI';
import FeedUpdate from './FeedUpdate';
import { CloseBtn } from '../../../assets/ModalAsset/IconAsset';
import { styled } from 'styled-components';

const customStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
};

function FeedInsert() {
  const modalStyle = {
    content: {
      margin: 'auto',
      width: '1000px',
      height: '700px',
    },
  };

  const insertModalStyle = {
    overlay: {
      zIndex: 101, // 다른 요소보다 큰 z-index 값 설정
    },
    content: {
      margin: 'auto',
      width: '1100px',
      height: '700px',
      padding: '2.5rem',
      position: 'relative',
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
        {/* ariaHideApp 추가(console에러를 없애기 위함)=> 바깥 요소를 숨기지 않음 */}
        <Modal
          isOpen={FeedPostInsertOpen}
          style={insertModalStyle}
          ariaHideApp={false}
        >
          <CloseBtn
            customStyle={customStyle}
            onClick={() => {
              setFeedPostInsertOpen(false);
            }}
          />
          <ToastUI
            clickdata={insertButtonClick}
            setFeedPostInsertOpen={setFeedPostInsertOpen}
          />
          {/* <div style={{ textAlign: 'right' }}>
            <button onClick={() => setFeedPostInsertOpen(false)}>
              글쓰기 취소
            </button>
            &nbsp;
            <button onClick={insertfeed}>완료</button>
          </div> */}
        </Modal>
      </div>

      <button onClick={() => setFeedPostUpdateOpen(true)}>글수정 버튼</button>
      <div>
        {/* ariaHideApp 추가(console에러를 없애기 위함)=> 바깥 요소를 숨기지 않음 */}
        <Modal
          isOpen={FeedPostUpdateOpen}
          style={insertModalStyle}
          ariaHideApp={false}
        >
          <CloseBtn
            customStyle={customStyle}
            onClick={() => {
              setFeedPostUpdateOpen(false);
            }}
          />
          <FeedUpdate clickdata={updateButtonClick}
          setFeedPostUpdateOpen={setFeedPostUpdateOpen}
          />
          {/* <div style={{ textAlign: 'right' }}>
            <button onClick={() => setFeedPostUpdateOpen(false)}>
              글수정 취소
            </button>
            &nbsp;
            <button onClick={updatefeed}>완료</button>
          </div> */}
        </Modal>
      </div>
    </div>
  );
}

export default FeedInsert;
