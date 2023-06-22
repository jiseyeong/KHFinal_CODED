import React from 'react';
import styled from 'styled-components';
import styles from './Profile.module.scss';

const ProfileTemplateBlock = styled.div`
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

const ProfileFormBlock = styled.div`
  width: 60%;
  margin: 1rem;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
`;

const ProfileTemplate = () => {
  return (
    <ProfileTemplateBlock>
      <WhiteBox>
        <ProfileFormBlock>
          <div className={styles.profileContainer}>
            <div className={styles.title}>프로필</div>
            <div className={styles.info}>
              <div className={styles.profile}>
                <div className={styles.profile1}>
                  <img></img>
                </div>
                <div className={styles.profile2}>
                  <button>사진 바꾸기</button>
                </div>
              </div>
              <div className={styles.btns}>
                <button className={styles.profileImageChangebtn}>
                  변경하기
                </button>
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infocontents}>
                <ul>
                  <li>nick : </li>
                  <li>id : </li>
                  <li>pw : </li>
                  <li>bio : </li>
                  <li>hashtag : </li>
                  <li>location : </li>
                </ul>
              </div>
              <div className={styles.btns}>
                <button className={styles.PwChangeBtn}>비밀번호 변경</button>
                <button className={styles.EditBtn}>수정하기</button>
                <button className={styles.EditCancelBtn}>수정취소</button>
                <button className={styles.EditComBtn}>수정완료</button>
              </div>
            </div>
          </div>
        </ProfileFormBlock>
      </WhiteBox>
    </ProfileTemplateBlock>
  );
};

export default ProfileTemplate;
