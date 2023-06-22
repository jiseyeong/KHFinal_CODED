import React from 'react';
import styled from 'styled-components';
import styles from './Profile.module.scss';

const ProfileTemplateBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 0;
  width: 100%;
`;

const ProfileFormBlock = styled.div`
  width: 50%;
  height: 400px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
`;

const ProfileTemplate = () => {
  return (
    <ProfileTemplateBlock>
      <WhiteBox>
        <ProfileFormBlock>
          <div className={styles.container}>
            <div className={styles.imageBox}>
              <div className={styles.proImage}>
                <img src=""></img>
                // 프로필 사진 이미지
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
                <button className={styles.MemberOutBtn}>회원탈퇴</button>
              </div>
            </div>
          </div>
        </ProfileFormBlock>
      </WhiteBox>
    </ProfileTemplateBlock>
  );
};

export default ProfileTemplate;
