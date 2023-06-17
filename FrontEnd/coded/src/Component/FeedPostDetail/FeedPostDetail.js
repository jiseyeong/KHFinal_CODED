import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../pages/ootd/Main/Modal';
import styles from './FeedPostDetail.module.scss';
const ParentSpan = styled('span')`
  display: inline-block;
  width: 100%;
  height: fit-content;
  position: relative;
  top: 0px;
`;

const FeedInnerLayoutDiv = styled('div')`
  border: 1px solid black;
  width: 100%;
  height: auto;
  margin: 10px;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  /* break-inside: auto; */
`;

const FeedImageDiv = styled('div')`
  border: 1px solid black;
  width: 80%;
  /* height: 60%; */
  height: fit-content;
  margin: 10px 20px 10px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const ThumbNail = styled('img')`
  width: 100%;
  min-height: 150px;
  height: fit-content;
  object-fit: cover;
  overflow: hidden;
`;

const FeedInfoDiv = styled('div')`
  width: 80%;
  height: 100px;
  border: 1px solid black;
  word-wrap: break-word;
`;

const FeedPostDetail = (props) => {
  const { feedPost, thumbNail, member, userProfile, hashTagList } = props;
  const [modal, setModal] = useState(false);

  const openModal = () => {
    if (!modal) {
      setModal(true);
    }
  };

  const closeModal = () => {
    if (modal) {
      setModal(false);
    }
  };

  return (
    // <ParentSpan>
    //   <FeedInnerLayoutDiv onClick={openModal}>
    //     <FeedImageDiv>
    //       {thumbNail != null ? (
    //         <ThumbNail
    //           src={`/images/${thumbNail.sysName}`}
    //           alt="abc"
    //         ></ThumbNail>
    //       ) : (
    //         <ThumbNail></ThumbNail>
    //       )}
    //     </FeedImageDiv>
    //     <FeedInfoDiv>
    //       <div className={styles.userProfileLayout}>
    //         <img className={styles.userProfile}></img>
    //       </div>
    //       <div className={styles.userInfoLayout}>
    //         <div>{member.userNickName}</div>
    //         <div>{feedPost.body}</div>
    //       </div>
    //     </FeedInfoDiv>
    //   </FeedInnerLayoutDiv>
    //   {modal && <Modal modal={modal} closeModal={closeModal} id={props.id} />}
    // </ParentSpan>

    <ParentSpan>
      <FeedInnerLayoutDiv onClick={openModal}>
        <FeedImageDiv>
          {thumbNail != null ? (
            <ThumbNail src={`/images/${thumbNail.sysName}`}></ThumbNail>
          ) : (
            <ThumbNail src={`/images/test.jpg`}></ThumbNail>
          )}
        </FeedImageDiv>
        <FeedInfoDiv>
          <div className={styles.userProfileLayout}>
            <img className={styles.userProfile} src={`/images/test.jpg`}></img>
          </div>
          <div className={styles.userInfoLayout}>
            <div>Heeesam</div>
            <div className={styles.userHashTagLayout}>
              #여름옷 #여름 #여름코디
            </div>
          </div>
        </FeedInfoDiv>
        {modal && <Modal modal={modal} closeModal={closeModal} id={props.id} />}
      </FeedInnerLayoutDiv>
    </ParentSpan>
  );
};

export default FeedPostDetail;
