import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import FeedModal from '../../pages/Ootd/Main/FeedModal';
import styles from './FeedPostDetail.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LoadingBar from '../Common/LoadingBar';
import FeedListNavi from './FeedListNavi';
import { Like, Temperature } from '../../assets/ModalAsset/ModalAsset';
import ConfirmDialog from '../Common/ConfirmDialog';

const FeedPostDetail = (props) => {
  const { index, feedPost } = props;
  const [modal, setModal] = useState(false);
  const [hashTagList, setHashTagList] = useState([]);
  const [isThumbNailLoaded, setIsTuhmbNailLoaded] = useState(false);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const accessToken = useSelector((state) => state.member.access);
  const myRef = useRef(null);

  const [feedLikeCount, setFeedLikeCount] = useState(0);
  const [isFeedLike, setIsFeedLike] = useState(false);
  const [scale, setScale] = useState(1);
  const [loginCheckModal, setLoginCheckModal] = useState(false);

  const [isLogintrue, setIsLogintrue] = useState(false);

  // 모달 창 열기
  const openModal = () => {
    if (!modal) {
      setModal(true);
    }
  };

  // 모달 창 닫기
  const closeModal = () => {
    if (modal) {
      setModal(false);
    }
  };

  function handleThumbNailLoaded() {
    setIsTuhmbNailLoaded(true);
  }

  function handleProfileLoaded() {
    setIsProfileLoaded(true);
  }

  const shortCutRef = useRef();

  // 마우스 올렸을 때 바로가기 네비 보여기
  // const viewShortCutMenu = () => {
  //   shortCutRef.current.style.transform = 'translateY(0px)';
  // };

  // 마우스 떨어졌을 때 바로가기 네비 숨기기
  // const noneShortCutMenu = () => {
  //   shortCutRef.current.style.transform = 'translateY(60px)';
  // };

  useEffect(() => {
    //likeCount 초기값 세팅
    getFeedLikeCount();
    //hashTagList 초기값 세팅
    axios({
      method: 'get',
      url: '/feedpost/hashtagList',
      params: {
        feedPostId: feedPost.feedPostId,
      },
    })
      .then((response) => {
        setHashTagList((prev) => {
          return [...prev, ...response.data];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    //피드 라이크가 변경된다면, likeCount 갱신하기.
    getFeedLikeCount();
  }, [isFeedLike]);

  useEffect(() => {
    if (accessToken) {
      //엑세스 토큰이 있다면, 로그인 유저의 isLike 정보 긁어오기
      axios({
        method: 'get',
        url: '/feedpost/isLike',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          feedPostId: feedPost.feedPostId,
        },
      })
        .then((response) => {
          setIsFeedLike(response.data);
        })
        .catch((error) => {
          if (error.request.status === 400) {
            console.log(error.response.data);
          } else {
            console.log(error);
          }
        });
    }
  }, [accessToken]);

  // 초기 마운트 시 좋아요 개수 받아오기
  function getFeedLikeCount() {
    axios({
      method: 'get',
      url: '/feedpost/likeCount',
      params: {
        feedPostId: feedPost.feedPostId,
      },
    })
      .then((response) => {
        setFeedLikeCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 피드의 좋아요 반영 ( 추가 / 삭제 )
  function setFeedLike() {
    if (accessToken) {
      axios({
        method: 'post',
        url: '/feedpost/insertFeedLike',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          feedPostId: feedPost.feedPostId,
        },
      })
        .then((resp) => {
          // 반영된 좋아요 수 저장
          setFeedLikeCount(resp.data);
          // 좋아요 상태로 변경
          setIsFeedLike((prev) => !prev);
          // 좋아요 눌렀을 시 카운트 반영 및 애니메이션
          setScale(!isFeedLike ? 1.2 : 1);
          setTimeout(() => {
            setScale(1);
          }, 200);
        })
        .catch((error) => {
          if (error.request.status === 400) {
            console.log(error.response.data);
          } else {
            console.log(error);
          }
        });
    } else {
      setIsLogintrue(true);
    }
  }

  return (
    <div className={styles.feedInnerParentDiv}>
      <div className={styles.feedInnerLayoutDiv} ref={myRef}>
        <div
          className={styles.feedImageDiv}
          onClick={openModal}
          // onMouseOver={viewShortCutMenu}
          // onMouseLeave={noneShortCutMenu}
        >
          <nav className={styles.shortCutMenu} ref={shortCutRef}>
            <FeedListNavi></FeedListNavi>
          </nav>
          {feedPost.thumbNailSysName != null ? (
            <img
              className={styles.thumbNail}
              src={`/images/${feedPost.thumbNailSysName}`}
              onLoad={handleThumbNailLoaded}
              onError={handleThumbNailLoaded}
            ></img>
          ) : (
            <img
              className={styles.thumbNail}
              src={`/images/test.jpg`}
              onLoad={handleThumbNailLoaded}
            ></img>
          )}
          {isThumbNailLoaded ? null : <LoadingBar />}
        </div>
        <div className={styles.feedInfoDiv}>
          <div className={styles.userProfileLayout}>
            {/* 해당 유저의 마이픽 페이지로 이동 */}
            <Link to={`/myPickPage?userNo=${feedPost.userNo}`}>
              {feedPost.profileSysName != null ? (
                <img
                  className={styles.userProfile}
                  src={`/images/${feedPost.profileSysName}`}
                  onLoad={handleProfileLoaded}
                  onError={handleProfileLoaded}
                ></img>
              ) : (
                <img
                  className={styles.userProfile}
                  src={`/images/test.jpg`}
                  onLoad={handleProfileLoaded}
                ></img>
              )}
            </Link>
            {isProfileLoaded ? null : <LoadingBar />}

            {/* 좋아요 버튼 */}
            <div
              className={`${styles.FeedLikeLayout} ${
                isFeedLike ? styles['liked'] : ''
              }`}
              style={{ transform: `scale(${scale})` }}
              onClick={setFeedLike}
            >
              <span className={`${styles.heartButton}`}>
                <Like isFeedLike={isFeedLike ? styles['liked'] : ''} />
              </span>
              <span>{feedLikeCount}</span>
            </div>
          </div>
          <div className={styles.userInfoLayout}>
            <div className={styles.userInfo}>
              {/* 해당 유저의 마이픽 페이지로 이동 */}
              <Link to="#">
                <span className={styles.userNameLayout}>
                  {feedPost.userNickName}
                </span>
              </Link>
              <div className={styles.feedWriteDateLayout}>
                {feedPost.formedWriteDate}
              </div>
            </div>
            <div className={styles.feedBottomLayout}>
              <div className={styles.feedHashTagLayout}>
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
                  <span>no tag</span>
                )}
              </div>
              <div className={styles.feedWeatherLayout}>
                <Temperature />
                <span>{feedPost.writeTemp}º</span>
              </div>
            </div>
          </div>
        </div>
        {modal && (
          <FeedModal
            closeModal={closeModal}
            feedPost={feedPost}
            feedLikeCount={feedLikeCount}
            setFeedLikeCount={setFeedLikeCount}
            isFeedLike={isFeedLike}
            setIsFeedLike={setIsFeedLike}
            hashTagList={hashTagList}
          />
        )}

        {isLogintrue && <ConfirmDialog setAlertCheck={setIsLogintrue} />}
      </div>
    </div>
  );
};

export default FeedPostDetail;
