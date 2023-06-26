import React from 'react';
import styled from 'styled-components';
import DeleteAccountCom from './Component/DeleteAccountCom';
import Footer from './../../Footer';
import styles from './DeleteAccount.module.scss';

const DeleteTemplateBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  margin: 0;
  padding: 2rem;
`;

const WhiteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const DeleteFormBlock = styled.div`
  width: 60%;
  margin: 1rem;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
`;

const DeleteAccount = () => {
  return (
    <DeleteTemplateBlock>
      <WhiteBox>
        <DeleteFormBlock>
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
              <h2>ARE YOU SURE?</h2>
              <h4>
                일교차가 큰 날, 얇게 입고 외출했다가 감기에 걸릴 수도...
                <br />
                중요한 약속이 있는 날, 뭘 입을까 고민하다가 지각할 수도...
                <br />
                다른 사람들보다 유행에 반 박자 늦어질 수도...
              </h4>
              <br />
              <h4>그래도 정말 탈퇴하시겠어요???</h4>
              <div className={styles.btnLayout}>
                <button className={styles.DeleteCanBtn} onClick={Footer}>
                  no
                </button>
                <button
                  className={styles.DeleteComBtn}
                  onClick={DeleteAccountCom}
                >
                  yes
                </button>
              </div>
            </div>
          </div>
        </DeleteFormBlock>
      </WhiteBox>
    </DeleteTemplateBlock>
  );
};

export default DeleteAccount;
