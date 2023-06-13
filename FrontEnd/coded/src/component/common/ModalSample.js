import React, { useState } from 'react';
import style from './ModalSample.module.css';

const ModalSample = (props) => {
  const { modal, closeModal, id } = props;

  return (
    <div>
      <div className={style.modalContainer}>
        <div className={style.modalContent}>
          <p>모달 창 입니다.</p>
          <p>{id}</p>
          <button className={style.modalCloseButton} onClick={closeModal}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSample;
