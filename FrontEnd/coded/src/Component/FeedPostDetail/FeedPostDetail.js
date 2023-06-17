import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../pages/ootd/Main/Modal';
import styles from './FeedPostDetail.module.scss';

const FeedInnerLayoutDiv = styled('div')`
  break-inside: avoid;
  border: 1px solid black;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const FeedImageDiv = styled('div')`
  border: 1px solid black;
  width: 80%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const ThumbNail = styled('img')`
  width: 100%;
  min-height: 150px;
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

  const myRef = useRef(null);

  useEffect(() => {
    // 피드 내 정렬 설정
    const sort = () => {
      const columnIndex = index % 5; // 다섯 개의 컬럼 번갈아가며 배치
      const currentColumnHeight = columnHeights[columnIndex];

      myRef.current.style.marginTop = currentColumnHeight + 'px'; // 현재 컬럼의 높이만큼 marginTop 설정

      const cardHeight = myRef.current.offsetHeight; // 카드의 세로 길이
      setColumnHeights((prev) => {
        const newArray = [...prev];
        newArray[index] = columnHeights[columnIndex] + cardHeight;
        return newArray;
      });
    };

    const handleImageLoad = () => {
      sort();

      const image = myRef.current.querySelector('img');
      image.addEventListener('load', handleImageLoad);

      return () => {
        image.removeEventListener('load', handleImageLoad);
      };
    };
  }, [columnHeights]);

  return (
    <FeedInnerLayoutDiv onClick={openModal} ref={myRef}>
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
            {feedPost.feedPostId}#여름옷 #여름 #여름코디
          </div>
        </div>
      </FeedInfoDiv>
      {modal && <Modal modal={modal} closeModal={closeModal} id={props.id} />}
    </FeedInnerLayoutDiv>
  );
};

export default FeedPostDetail;
