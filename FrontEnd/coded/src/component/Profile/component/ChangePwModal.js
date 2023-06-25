import React, { Component, useEffect, useState } from 'react';
import './ChangePwModal.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ChangePwModal({ toggleChangePwModal }) {
  const accessToken = useSelector((state) => state.member.access);

  let num = 0;

  return (
    <div className="ChangePwModalWrapper">
      <div className="mainWrapper">
        <div className="modalWrapper" onClick={toggleChangePwModal}>
          <div className="innerWrapper" onClick={(e) => e.stopPropagation()}>
            <div className="infoWrapper">
              <p>비밀번호를 변경해 주세요!</p>
            </div>
            <div className="inputWrapper">
              <div className="inputLayout">
                <input type="password" placeholder="기존 비밀번호" />
              </div>
              <div className="inputLayout">
                <input type="password" placeholder="새 비밀번호" />
              </div>
              <div className="inputLayout">
                <input type="password" placeholder="새 비밀번호 확인" />
              </div>
              <div className="btnLayout">
                <button>변경 완료</button>
              </div>
            </div>
            <div className="blankWrapper"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangePwModal;
