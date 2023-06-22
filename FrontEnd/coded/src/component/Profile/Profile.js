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
              <div className={styles.infoLayout}>
                <div className={styles.email}>dltkdn97@naver.com</div>
                <div className={styles.name}>이상우</div>
              </div>
            </div>
          </div>
        </ProfileFormBlock>
      </WhiteBox>
    </ProfileTemplateBlock>
  );
};

export default ProfileTemplate;
