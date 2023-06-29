import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import ToastUI from './ToastUI';
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

function FeedInsert({ feedWriteModal, setFeedWriteModal }) {
  const insertModalStyle = {
    overlay: {
      zIndex: 101,
    },
    content: {
      margin: 'auto',
      width: '1100px',
      height: '700px',
      padding: '2.5rem',
      position: 'relative',
    },
  };

  return (
    <Modal isOpen={feedWriteModal} style={insertModalStyle} ariaHideApp={false}>
      <CloseBtn
        customStyle={customStyle}
        onClick={() => {
          setFeedWriteModal(false);
        }}
      />
      <ToastUI setFeedPostInsertOpen={setFeedWriteModal} />
    </Modal>
  );
}

export default FeedInsert;
