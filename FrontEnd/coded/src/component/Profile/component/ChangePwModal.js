import React, { Component, useEffect, useState, useRef } from 'react';
import './ChangePwModal.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ChangePwModal({ toggleChangePwModal }) {
  const accessToken = useSelector((state) => state.member.access);

  const [password, setPassword] = useState({ currentPw: '', pw: '', repw: '' });
  const [pwConfirmCheck, setPwConfirmCheck] = useState(true);
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
      alert('현재 비밀번호와 다른 새 비밀번호를 입력해주세요');
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
    if (pwRef1.current.value === pwRef2.current.value) {
      setPwConfirmCheck(true);
    } else {
      setPwConfirmCheck(false);
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
                {/* 느낌표 아이콘?? 을 넣으면 좋을듯 */}
                <img alt="느낌표 아이콘"></img>
              </div>
              <h2>비밀번호 변경</h2>
              <h4>아래에 현재 비밀번호와 새 비밀번호를 입력해주세요.</h4>
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
                {pwConfirmCheck ? (
                  <div className="checkpw">비밀번호가 일치합니다.</div>
                ) : (
                  <div className="checkpw">비밀번호가 일치하지 않습니다.</div>
                )}
              </div>
              <div className="btnLayout">
                <button onClick={submitInput}>변경 완료</button>
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
