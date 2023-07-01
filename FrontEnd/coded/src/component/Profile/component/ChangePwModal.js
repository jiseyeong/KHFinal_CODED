import React, { Component, useEffect, useState, useRef } from 'react';
import './ChangePwModal.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ChangePwModal({ toggleChangePwModal }) {
  const accessToken = useSelector((state) => state.member.access);

  const [password, setPassword] = useState({ currentPw: '', pw: '', repw: '' });
  const [pwConfirmCheck, setPwConfirmCheck] = useState(true);
  const [pwConfirmMessage, setPwConfirmMessage] = useState('');
  const pwRef1 = useRef();
  const pwRef2 = useRef();

  // 입력한 비밀번호들을 객체에 저장
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
    console.log(e.target.value);
    handlePw();
  };

  // 비밀번호 변경 버튼
  const submitInput = () => {
    if (
      password.currentPw === '' ||
      password.pw === '' ||
      password.repw === ''
    ) {
      alert('입력 폼을 모두 채워주세요.');
      return;
    }
    if (password.currentPw === password.pw) {
      alert('현재 비밀번호와 새 비밀번호를 입력해주세요.');
      setPassword({ currentPw: '', pw: '', repw: '' });
      return;
    }

    if (!pwConfirmCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      setPassword({ currentPw: '', pw: '', repw: '' });
      return;
    }

    axios({
      url: '/auth/updatePwAfterPwCheck',
      method: 'put',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        currentPw: password.currentPw,
        pw: password.pw,
      },
    }).then((resp) => {
      if (resp.data === 0) {
        alert('현재 비밀번호가 일치하지 않습니다.');
        setPassword({ currentPw: '', pw: '', repw: '' });
      } else {
        alert('변경이 완료되었습니다.');
      }
    });

    toggleChangePwModal((prev) => {
      return !prev;
    });
  };

  const handlePw = () => {
    if (pwRef1.current.value && pwRef2.current.value) {
      if (pwRef1.current.value === pwRef2.current.value) {
        setPwConfirmCheck(true);
        setPwConfirmMessage('비밀번호가 일치합니다.');
      } else {
        setPwConfirmCheck(false);
        setPwConfirmMessage('비밀번호가 일치하지 않습니다.');
      }
    } else {
      setPwConfirmCheck(false);
      setPwConfirmMessage('');
    }
  };

  return (
    <div className="ChangePwModalWrapper">
      <div className="mainWrapper">
        <div className="modalWrapper">
          <div className="innerWrapper" onClick={(e) => e.stopPropagation()}>
            <button className="closeBtn" onClick={toggleChangePwModal}>
              x
            </button>
            <div className="blankWrapper1"></div>
            <div className="infoWrapper">
              <div className="iconLayout">
                <svg
                  className="lockicon"
                  height="130"
                  viewBox="0 0 20 20"
                  width="130"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2C11.6569 2 13 3.34315 13 5V6H14C15.1046 6 16 6.89543 16 8V15C16 16.1046 15.1046 17 14 17H6C4.89543 17 4 16.1046 4 15V8C4 6.89543 4.89543 6 6 6H7V5C7 3.34315 8.34315 2 10 2ZM14 7H6C5.44772 7 5 7.44772 5 8V15C5 15.5523 5.44772 16 6 16H14C14.5523 16 15 15.5523 15 15V8C15 7.44772 14.5523 7 14 7ZM10 10.5C10.5523 10.5 11 10.9477 11 11.5C11 12.0523 10.5523 12.5 10 12.5C9.44772 12.5 9 12.0523 9 11.5C9 10.9477 9.44772 10.5 10 10.5ZM10 3C8.89543 3 8 3.89543 8 5V6H12V5C12 3.89543 11.1046 3 10 3Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
              <h2>CHANGE PASSWORD</h2>
            </div>
            <div className="inputWrapper">
              <div className="inputLayout">
                <input
                  type="password"
                  placeholder="현재 비밀번호"
                  name="currentPw"
                  value={password.currentPw || ''}
                  onChange={handleInput}
                />
              </div>
              <div className="inputLayout">
                <input
                  type="password"
                  placeholder="새 비밀번호"
                  name="pw"
                  value={password.pw || ''}
                  ref={pwRef1}
                  onChange={handleInput}
                />
              </div>
              <div className="inputLayout">
                <input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  name="repw"
                  value={password.repw || ''}
                  ref={pwRef2}
                  onChange={handleInput}
                />
                {pwConfirmMessage}
              </div>
              <div className="btnLayout">
                <button onClick={submitInput}>complete</button>
              </div>
            </div>
            <div className="blankWrapper2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangePwModal;
