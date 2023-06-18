import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
// import Modal from '../../pages/ootd/Main/Modal';
import styles from './FeedPostDetail.module.scss';

const FeedPostDetail = (props) => {
  const {
    feedPost,
    thumbNail,
    member,
    userProfile,
    hashTagList,
    columnHeights,
    setColumnHeights,
    index,
  } = props;
  const [modal, setModal] = useState(false);

  // const openModal = () => {
  //   if (!modal) {
  //     setModal(true);
  //   }
  // };

  // const closeModal = () => {
  //   if (modal) {
  //     setModal(false);
  //   }
  // };

  const myRef = useRef(null);

  // useEffect(() => {
  //   // 피드 내 정렬 설정
  //   const sort = () => {
  //     const columnIndex = index % 5; // 다섯 개의 컬럼 번갈아가며 배치
  //     const currentColumnHeight = columnHeights[columnIndex];
  //     myRef.current.style.marginTop = currentColumnHeight + 'px'; // 현재 컬럼의 높이만큼 marginTop 설정
  //     // myRef.current.style.marginLeft =
  //     const cardHeight = myRef.current.offsetHeight; // 카드의 세로 길이
  //     setColumnHeights((prev) => {
  //       const newArray = [...prev];
  //       newArray[index] = columnHeights[columnIndex] + cardHeight;
  //       return newArray;
  //     });

  //   };
  // }, [columnHeights]);

  return (
    <div className={styles.feedInnerParentDiv}>
      <div
        className={styles.feedInnerLayoutDiv}
        // onClick={openModal}
        ref={myRef}
      >
        <div className={styles.feedImageDiv}>
          {thumbNail != null ? (
            <img
              className={styles.thumbNail}
              src={`/images/${thumbNail.sysName}`}
            ></img>
          ) : (
            <img className={styles.thumbNail} src={`/images/test.jpg`}></img>
          )}
        </div>
        <div className={styles.feedInfoDiv}>
          <div className={styles.userProfileLayout}>
            <img className={styles.userProfile} src={`/images/test.jpg`}></img>
          </div>
          <div className={styles.userInfoLayout}>
            <div>Heeesam</div>
            <div className={styles.userHashTagLayout}>
              {feedPost.feedPostId}#여름옷 #여름 #여름코디
            </div>
          </div>
        </div>
        {/* {modal && <Modal modal={modal} closeModal={closeModal} id={props.id} />} */}
      </div>
    </div>
  );
};

export default FeedPostDetail;
