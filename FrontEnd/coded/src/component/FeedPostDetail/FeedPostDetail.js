import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../pages/Ootd/Main/Modal';
import styles from './FeedPostDetail.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const FeedPostDetail = (props) => {
  const {
    index,
    feedPost,
    // thumbNail,
    // member,
    // userProfile,
    //hashTagList,
    // feedLike,
    // isFeedLike,
    // columnHeights,
    // setColumnHeights,
  } = props;
  const [modal, setModal] = useState(false);
  const [feedLikeCount, setFeedLikeCount] = useState(0);
  const [isFeedLike, setIsFeedLike] = useState(false);
  const [hashTagList, setHashTagList] = useState([]);
  const accessToken = useSelector((state)=>state.member.access);
  
  const myRef = useRef(null);

  useEffect(()=>{
    //likeCount 초기값 세팅
    getFeedLikeCount();
  },[]);
  useEffect(()=>{
    //피드 라이크가 변경된다면, likeCount 갱신하기.
    getFeedLikeCount();
  }, [isFeedLike]);
  useEffect(()=>{
    //엑세스 토큰이 있다면, 로그인 유저의 isLike 정보 긁어오기
    axios({
      method:'get',
      url:'/feedpost/isLike',
      headers:{
        Authorization:`Bearer ${accessToken}`
      },
      params:{
        feedPostId:feedPost.feedPostId
      }
    })
    .then((response)=>{
      setIsFeedLike(response.data);
    })
    .catch((error)=>{
      if (error.request.status === 400) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    });
  }, [accessToken]);

  function getFeedLikeCount(){
    axios({
      method:'get',
      url:'/feedpost/likeCount',
      params:{
        feedPostId:feedPost.feedPostId
      }
    })
    .then((response)=>{
      setFeedLikeCount(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  function setFeedLike(){
    axios({
      method:'post',
      url:'/feedpost/inserFeedLike',
      headers:{
        Authorization:`Bearer ${accessToken}`
      },
      params:{
        feedPostId:feedPost.feedPostId
      },
    })
    .catch((error)=>{
      if (error.request.status === 400) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    });
  };

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
      <div className={styles.feedInnerLayoutDiv} ref={myRef}>
        <div className={styles.feedImageDiv} onClick={openModal}>
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
            {/* 해당 유저의 마이픽 페이지로 이동 */}
            {userProfile !== null ? (
              <Link to="#">
                <img
                  className={styles.userProfile}
                  src={`/images/${userProfile.sysName}`}
                ></img>
              </Link>
            ) : (
              <img
                className={styles.userProfile}
                src={`/images/test.jpg`}
              ></img>
            )}
          </div>
          <div className={styles.userInfoLayout}>
            <div className={styles.userInfo}>
              {/* 해당 유저의 마이픽 페이지로 이동 */}
              <Link to="#">
                <span className={styles.userNameLayout}>
                  {member.userNickName}
                </span>
              </Link>
              <div className={styles.feedPostIdLayout}>
                {feedPost.feedPostId}
              </div>
            </div>
            <div className={styles.userHashTagLayout}>
              {hashTagList.length > 0 ? (
                hashTagList.map((e, i) => (
                  <Link to={`/feed/search?keyword=${e.hashTag}`} key={i}>
                    <span>
                      #{e.hashTag}
                      &nbsp;&nbsp;
                    </span>
                  </Link>
                ))
              ) : (
                <span>태그 없음</span>
              )}
            </div>
          </div>
        </div>
        {modal && (
          <Modal
            modal={modal}
            closeModal={closeModal}
            feedPostId={feedPost.feedPostId}
            feedLikeCount={feedLikeCount}
            isLike={isFeedLike}
            setIsLike={setFeedLike}
          />
        )}
      </div>
    </div>
  );
};

export default FeedPostDetail;
