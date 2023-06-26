import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './DeleteAccountCom.scss';

const TemplateBlock = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  margin-bottom: 120px;
`;

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    text-align: center;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  width: 400px;
  background: white;
  border-radius: 2px;
`;

const removeAccount = () => {
  let checkPw = '';
  if (comfirm('정말로 회원을 탈퇴하시겠습니까?')) {
    checkPw = prompt('비밀번호를 다시 입력해주세요.');
  }
  axios({
    url: '/auth/deleteMemberWithoutId',
    method: 'delete',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      checkPw: checkPw,
    },
  }).then((resp) => {
    if (resp.data === 0) {
      alert('회원 탈퇴가 완료되었습니다.');
      navi('/');
    } else {
      alert('회원 번호가 일치하지 않습니다.');
      return;
    }
  });
};

const DeleteAccountCom = () => {
  return (
    <TemplateBlock>
      <WhiteBox>
        <div className={styles.deleteContainer}>
          <div className={styles.innerWrapper}>
          <div className={styles.iconLayout}>
            <svg
              className="icon"
              height="130"
              viewBox="0 0 20 20"
              width="130"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM10 12.5C10.4142 12.5 10.75 12.8358 10.75 13.25C10.75 13.6642 10.4142 14 10 14C9.58579 14 9.25 13.6642 9.25 13.25C9.25 12.8358 9.58579 12.5 10 12.5ZM10 6C10.2455 6 10.4496 6.17688 10.4919 6.41012L10.5 6.5V11C10.5 11.2761 10.2761 11.5 10 11.5C9.75454 11.5 9.55039 11.3231 9.50806 11.0899L9.5 11V6.5C9.5 6.22386 9.72386 6 10 6Z"
                fill="#000000"
              />
            </svg>
            </div>
            <h2>WE'LL MISS YOU</h2>
            <h4>아래에 현재 비밀번호를 입력해주세요.</h4>
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLayout}>
              <input
                type="password"
                placeholder="현재 비밀번호"
                name="currentPw"
                value={password.currentPw || ''}
                onChange={handleInput}
              />
            </div>
            <div className={styles.buttonLayout}>
              {
                <button className={styles.DeleteAccountComBtn} onCLick={removeAccount}>
                  byebye..
                </button>
              }
            </div>
          </div>
        </div>
      </WhiteBox>
    </TemplateBlock>
  );
};

export default DeleteAccountCom;
