import React, { Component, useEffect, useRef, useState } from 'react';
// import "../styles/common.scss";
// import "../styles/reset.scss";
import './FeedModal.scss';
//import Image from "../image/326548_bookmark_icon.png";
import { useSelector } from 'react-redux';
import axios from 'axios';
import FeedCommentList from '../../../component/FeedPostDetail/FeedCommentList';
import {
  OptionBox,
  Like,
  ScrapImage,
} from '../../../assets/ModalAsset/ModalAsset';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import weatherIcons from '../../../component/WeatherCommon/WeatherIcons';
import CreatableSelect from 'react-select/creatable';
import ReportModal from '../../../component/Report/component/ReportModal';

const ImageLayout = styled('div')`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FeedModal({
  // modalData,
  // data,
  // setData,
  closeModal,
  feedPost,
  feedLikeCount,
  setFeedLikeCount,
  isFeedLike,
  setIsFeedLike,
  hashTagList,
}) {
  const carrouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, //한번에 보이는 수
    slidesToScroll: 1, //넘어가는 수
    centerMode: true,
    centerPadding: '0px',
    vertical: false,
    arrows: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    pauseOnFocus: true,
    pauseOnHover: true,
    fade: false,
  };

  // const [feedPost,setFeedPost] = useState({});
  // const [photoList,setPhotoList] = useState([]);
  // const [writeMember,setWriteMember] = useState({});
  // const [userProfile,setUserProfile] = useState({});
  // const [feedLikeCount,setFeedLikeCount] = useState(0);
  // const [isFeedLike,setFeedLike] = useState();

  const [userBio, setUserBio] = useState('');

  const [imageList, setImageList] = useState([]);

  const [optionListDiv, setOptionListDiv] = useState(false);

  // const [comment, setComment] = useState('');
  // const [comments, setComments] = useState([]);
  // const [description, setDescription] = useState(
  //   modalData?.modalData?.modalData?.description,
  // ); // 그냥 modalData?.description으로 바꿔볼 것.
  // const [res, setRes] = useState([]);
  //const [isLikeBtn, setIsLikeBtn] = useState(false);
  // const [isRepleLikeBtn, setIsRepleLikeBtn] = useState(false);
  // const [follower, setFollower] = useState(
  //   modalData?.modalData?.modalData?.follower,
  // ); // 그냥 modalData?.follower로 바꿔볼 것.
  // const [isFollowBtn, setIsFollowBtn] = useState(false);
  const accessToken = useSelector((state) => state.member.access);
  const userNo = useSelector((state) => state.member.userNo);
  const [weatherIcon, setWeatherIcon] = useState('');

  // 신고 모달창 관련 on/off
  const [reportModal, setReportModal] = useState(false);

  let num = 0;

  useEffect(() => {
    updateImageList();
    // 스크랩 여부 가져오기
    updateScrap();

    if (feedPost.ptyCode == 1 || feedPost.ptyCode == 2) {
      setWeatherIcon(weatherIcons.rain);
    } else if (feedPost.ptyCode == 3) {
      setWeatherIcon(weatherIcons.snow);
    } else if (feedPost.ptyCode == 4) {
      setWeatherIcon(weatherIcons.heavyRain);
    } else {
      if (feedPost.skyCode == 1) {
        setWeatherIcon(weatherIcons.sun);
      } else {
        setWeatherIcon(weatherIcons.cloud);
      }
    }
  }, []);

  function updateImageList() {
    axios({
      method: 'get',
      url: '/photo/feedpost',
      params: {
        feedPostId: feedPost.feedPostId,
      },
    })
      .then((response) => {
        console.log(response);
        setImageList((prev) => {
          return [...response.data];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function optionBoxClick() {
    console.log('test');
    setOptionListDiv((prev) => {
      return !prev;
    });
  }

  function deleteFeedPost() {
    if (accessToken) {
      axios({
        method: 'delete',
        url: '/feedpost/deleteFeedPost',
        params: {
          feedPostId: feedPost.feedPostId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(() => {
          closeModal();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  //  수정하기 ---------------------------------------
  const [FeedPost, setFeedPost] = useState(feedPost);
  const [HashTag, setHashTag] = useState(hashTagList);
  const [editYN, setEditYN] = useState(false);
  // 수정 버튼 눌렀을때
  function editFeedPost() {
    setEditYN(true);
  }

  // 수정하기 완료
  function editComplate() {
    axios({
      method: 'put',
      url: '/feedpost/updatefeed',
      params: {
        feedPostId: feedPost.feedPostId,
        body: FeedPost.body,
        hashtag: HashTag,
      },
    })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }

  // function editCancel(){
  //
  // }

  // 좋아요, 스크랩 기능들------------------------
  const [likeScale, setLikeScale] = useState(1);
  const [isFeedScrap, setIsFeedScrap] = useState();
  const [scrapScale, setScrapScale] = useState(1);

  // 초기 마운트 시 스크랩 여부 확인
  function updateScrap() {
    axios({
      method: 'get',
      url: '/feedpost/isScrap',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        feedPostId: feedPost.feedPostId,
      },
    })
      .then((response) => {
        console.log(response.data);
        setIsFeedScrap(response.data);
      })
      .catch((error) => {
        if (error.request.status === 400) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  }

  // 피드의 좋아요 반영 ( 추가 / 삭제 )
  function setFeedLike() {
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
        setLikeScale(!isFeedLike ? 1.2 : 1);
        setTimeout(() => {
          setLikeScale(1);
        }, 200);
      })
      .catch((error) => {
        // if (error.request.status === 400) {
        //   console.log(error.response.data);
        // } else {
        console.log(error);
        // }
      });
  }

  // 피드의 스크랩 반영 ( 추가 / 삭제 )
  function setFeedScrap() {
    axios({
      method: 'post',
      url: '/feedpost/insertFeedScrap',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        feedPostId: feedPost.feedPostId,
      },
    })
      .then((resp) => {
        // 스크랩 상태로 변경
        setIsFeedScrap((prev) => !prev);
        // 스크랩 눌렀을 시 카운트 반영 및 애니메이션
        setScrapScale(!isFeedScrap ? 1.2 : 1);
        setTimeout(() => {
          setScrapScale(1);
        }, 200);
      })
      .catch((error) => {
        // if (error.request.status === 400) {
        //   console.log(error.response.data);
        // } else {
        console.log(error);
        // }
      });
  }

  //------------------------------------------------

  // function handleClickLike(e) {
  //   e.preventDefault();
  //   if (!isLikeBtn) {
  //     setIsLikeBtn(true);
  //     setFollower(modalData?.modalData?.modalData?.follower + 1); //modalData?.follower + 1 로 고쳐봐도 될 것.
  //   } else {
  //     setIsLikeBtn(false);
  //     setFollower(modalData?.modalData?.modalData?.follower - 1);
  //   }
  // }

  // function handleRepleLike(e) {
  //   if (!isRepleLikeBtn) {
  //     setIsRepleLikeBtn(true);
  //   } else {
  //     setIsRepleLikeBtn(false);
  //   }
  // }

  // function followBtnActive() {
  //   if (isFollowBtn) {
  //     setIsFollowBtn(false);
  //   } else {
  //     setIsFollowBtn(true);
  //   }
  // }

  // function getData(e) {
  //   e.preventDefault();
  //   setComment(e.target.value);
  //   setData(e.target.value);
  // }

  // function handleKeyPress(e) {
  //   e.preventDefault();
  //   if (e.key === 'Enter') {
  //     if (!comment) {
  //       e.preventDefault();
  //     } else {
  //       // handleComment();
  //     }
  //   }
  // }

  // useEffect(()=>{
  //     axios({
  //       method:'get',
  //       url:'/feedpost/selectFeedDetail',
  //       headers:{
  //         Authorization:'Bearer '+accessToken
  //     },
  //     params:{
  //       feedPostId:feedPostId
  //    }
  //     }).then((response)=>{
  //       const {
  //         feedPost,
  //         photoList,
  //         writeMember,
  //         userProfile,
  //         feedLikeCount,
  //         isFeedLike
  //       } = response.data;
  //       setFeedPost(feedPost);
  //       setPhotoList(photoList);
  //       setWriteMember(writeMember);
  //       setUserProfile(userProfile);
  //       setFeedLikeCount(feedLikeCount);
  //       setFeedLike(isFeedLike);
  //     }).catch((error)=>{
  //       console.log(error);

  //     })
  // },[])

  // const API = `http://   /ootds/${modalData?.modalData?.modalData?.id}/comments`;
  // function handleComment(e) {
  //   axios({
  //     method: 'post',
  //     url: API,
  //     headers: {
  //       Authorization: 'Bearer ' + accessToken,
  //     },
  //     params: {
  //       content: comment,
  //       user_id: modalData?.modalData?.modalData?.id,
  //     },
  //   })
  //     .then((response) => {
  //       setRes(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   setComments((prev) => {
  //     return [...prev, comment];
  //   });
  //   setComment('');
  //   num += 1;
  // }

  // useEffect(() => {
  //   console.log('id값', modalData?.modalData?.modalData?.id);
  // });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 520, // 원하는 가로 크기로 변경
      height: 50, // 원하는 높이로 변경
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: 'rotate(180deg)', // 화살표 회전
    }),
  };

  return (
    <div className="wrapper">
      <div className="mainWrapper">
        <div className="modalWrapper" onClick={closeModal}>
          <div className="innerWrapper" onClick={(e) => e.stopPropagation()}>
            <div className="leftWrapper">
              <div className="imgWrapper">
                <Slider {...carrouselSettings}>
                  {imageList.map((item, index) => {
                    return (
                      <ImageLayout key={index}>
                        <img
                          src={`/images/${item.sysName}`}
                          style={{
                            maxWidth: '100%',
                            height: '585px',
                            objectFit: 'contain',
                            margin: 'auto',
                            display: 'block',
                          }}
                        />
                      </ImageLayout>
                    );
                  })}
                </Slider>
                {/* <img
                  className="image"
                  //src={modalData?.modalData?.modalData?.contentImg}
                  src={"/images/" + feedPost.thumbNailSysName}
                /> */}
                {/* <div
                  className={
                    modalData?.modalData?.modalData?.contentImg?.length > 1
                      ? 'smallImages'
                      : 'displayNone'
                  }
                > */}
                {/* <figure className="smallImagesWrapper">
                    <img
                      className="smallImage"
                      src={modalData?.modalData?.modalData?.contentImg[0]}
                    />
                  </figure>
                  <figure className="smallImagesWrapper">
                    <img
                      className="smallImage"
                      src={modalData?.modalData?.modalData?.contentImg[1]}
                    />
                  </figure> */}
                {/* </div> */}
              </div>
              <div className="information">
                <div className="commentData">
                  <div className="commentUserImgWrapper">
                    {console.log(feedPost)}
                    <Link to={`/myPickPage?userNo=${feedPost.userNo}`}>
                      <img
                        className="commentUserImg"
                        //src={modalData?.modalData?.modalData?.authorImg}
                        src={'/images/' + feedPost.profileSysName}
                        width="40"
                        height="40"
                      />
                    </Link>
                  </div>
                  <div className="authorInfomation">
                    <div className="author">
                      {/* sungha123 */}
                      {/* {modalData?.modalData?.modalData?.author} */}
                      {feedPost.userNickName}
                    </div>
                    <div className="introduction">
                      {/* 김성하 */}
                      {/* {modalData?.modalData?.modalData?.introdution} */}
                      {userBio}
                    </div>
                  </div>

                  {/* 수정하기 눌렀을 때 숨김 */}

                  {editYN === false && (
                    <div className="optionBox">
                      {feedPost.userNo === userNo && (
                        <div className="optionBox" onClick={optionBoxClick}>
                          <OptionBox></OptionBox>
                        </div>
                      )}
                      {optionListDiv && (
                        <div className="optionList">
                          <div className="optionListDiv">
                            <a onClick={editFeedPost}>수정하기</a>
                          </div>
                          <div className="optionListDiv">
                            <a onClick={deleteFeedPost}>삭제</a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* <hr className="hrTag"></hr> */}
                <div className="authorDescription">
                  {/* 수정하기 에디터블 */}
                  {/* {
<div className="feedPostBody">{feedPost.body}</div> //{feedPost.body}숨김

<div className="feedPostBody"><textarea
              className="post"
              placeholder="내용을 입력해주세요"
              style={{height:"100%", width:"100%", resize:"none", border:"1px solid black"}}
              defaultValue={feedPost.body}
            ></textarea></div>

} */}
                  {editYN === false ? (
                    <div className="feedPostBody">{feedPost.body}</div>
                  ) : (
                    <div className="feedPostBody">
                      <textarea
                        className="post"
                        placeholder="내용을 입력해주세요"
                        style={{
                          height: '100%',
                          width: '100%',
                          resize: 'none',
                          border: '1px solid black',
                        }}
                        defaultValue={feedPost.body}
                      ></textarea>
                    </div>
                  )}
                  <div className="feedPostWidth"></div>
                  <div className="feedPostWeather">
                    <div className="weatherIcon">{weatherIcon}</div>
                    <div className="writeTemp">{feedPost.writeTemp}º</div>
                  </div>
                </div>

                {/* 
                  수정하기 눌렀을 때

                  <div>
                  <CreatableSelect
              placeholder="해시태그 추가"
              isMulti
              options={options}
              ref={selectRef}
            />
            </div>
            <div>
            <button onclick={()=>{editComplate}}>수정 완료</button>
            <button onclick={editCancel}>수정 취소</button>
            <div>
            넣고 오른쪽에

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

                  숨기기
                  */}
                {editYN === false ? (
                  <div className="hashTagBody">
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
                ) : (
                  <div className="hashTagBody">
                    <div className="selectLayout">
                      <CreatableSelect
                        className="crSelect"
                        placeholder="해시태그 추가"
                        isMulti
                        options={hashTagList}
                        menuPlacement="top"
                        styles={customStyles}
                        // ref={selectRef}
                      />
                    </div>
                    <div className="buttons">
                      <button>수정 완료</button>
                      <button>수정 취소</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rightWrapper">
              <div className="authorPopularity">
                <div
                  className="btnLayout"
                  style={{ transform: `scale(${likeScale})` }}
                  onClick={setFeedLike}
                >
                  <div className={isFeedLike ? 'likeBox' : 'disLikeBox'}>
                    <Like />
                  </div>
                  <div className="likeNumBox">
                    <span className="likeNum">
                      {/* {' '} */}
                      {/* 100 */}
                      {/* {modalData?.modalData?.modalData?.follower} */}
                      {feedLikeCount}
                    </span>
                  </div>
                </div>
                <div
                  className="btnLayout"
                  style={{ transform: `scale(${scrapScale})` }}
                  onClick={setFeedScrap}
                >
                  <div className={isFeedScrap ? 'scrapBox' : 'disScrapBox'}>
                    <ScrapImage />
                  </div>
                  <button
                    onClick={(e) => {
                      console.log('trueture');
                      setReportModal(true);
                    }}
                  >
                    테스트
                  </button>
                </div>
              </div>

              <FeedCommentList
                feedPostId={feedPost.feedPostId}
                depth={0}
                parentId={0}
              />

              {/* Report insert 기능 완료 */}
              {/* Report 모달창 구현 완료 */}
              {/* 단 모달창 안에서 모달창을 띄우질 못함 */}
              {/* 1. Modal.js의 이름을 바꾸어야함 (Modal 라이브러리의 <Modal>과 이름이 겹치기 때문) */}
              {/* {이것은 별도의 컴포넌트로 이름을 바꾸어 import를 해도 안쪽에 <Modal>이 존재하여 소용이 없음} */}
              {/* 2. 이름 바꾼 후 신고 창이 활성화가 안됨 여기가 문제 */}
              {/* 아래 주석 해제 시 그냥 페이지 전환으로 기능 */}
              {/* {reportModal && <ReportModal />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeedModal;
