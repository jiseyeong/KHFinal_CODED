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
            <div className="centerWrapper">
              <div className="inputLayout">
                <input type="password" placeholder="비밀번호를 입력해주세요" />
              </div>
              <div className="inputLayout">
                <input
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요"
                />
              </div>
              <div className="btnLayout">
                <button>submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangePwModal;
