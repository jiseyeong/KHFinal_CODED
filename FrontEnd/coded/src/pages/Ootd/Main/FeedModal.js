import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
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
import ConfirmDialog from '../../../component/Common/ConfirmDialog';

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

  const [userBio, setUserBio] = useState('');
  const [imageList, setImageList] = useState([]);
  const [optionListDiv, setOptionListDiv] = useState(false);
  const accessToken = useSelector((state) => state.member.access);
  const userNo = useSelector((state) => state.member.userNo);
  const [weatherIcon, setWeatherIcon] = useState('');

  const [isLogintrue, setIsLogintrue] = useState(false);

  // 신고 모달창 관련 on/off
  const [reportModal, setReportModal] = useState(false);

  let num = 0;

  useEffect(() => {
    console.log(selectHashTag.length);

    let arrTemp = [];
    hashTagList.forEach((item) => {
      let temp = { value: item.hashTag, label: item.hashTag };
      setSelectHashTag((preview) => [...preview, temp]);
      arrTemp = arrTemp.concat({
        value: item.hashTag,
        label: item.hashTag,
      });
      setHashTag([...HashTag, ...arrTemp]);
    });

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

    axios({
      method: 'get',
      url: '/PostHashs/selectAllPostTagNames',
    }).then((resp) => {
      const HashTagNameList = resp.data;
      let arrTemp = [];
      HashTagNameList.forEach((hashTag) => {
        arrTemp = arrTemp.concat({
          value: hashTag.hashTag,
          label: hashTag.hashTag,
        });
        setOptions([...options, ...arrTemp]);
      });
    });
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
    setOptionListDiv((prev) => {
      return !prev;
    });
  }

  function deleteFeedPost() {
    setOptionListDiv((prev) => {
      return !prev;
    });
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
          alert('삭제가 완료 되었습니다.');
          closeModal();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  //  수정하기 ---------------------------------------
  const [FeedPost, setFeedPost] = useState({});
  const [selectHashTag, setSelectHashTag] = useState([]); //수정 전
  const [HashTag, setHashTag] = useState(hashTagList); //삭제하고 나서의
  const [editYN, setEditYN] = useState(false);
  const [content, setContent] = useState(''); //수정 후
  const selectRef = useRef();
  const contentRef = useRef(); // 바디 레퍼런스
  const [options, setOptions] = useState([]); //가져오기 해쉬태그 리스트
  // 수정 버튼 눌렀을때

  function editFeedPost() {
    setOptionListDiv((prev) => {
      return !prev;
    });
    setEditYN(true);
  }

  // 수정하기 완료
  function editComplate() {
    if (
      contentRef.current.value === '' ||
      contentRef.current.value === undefined
    ) {
      alert('내용을 입력해주세요');
      return;
    }
    if (selectRef.current.getValue().length === 0) {
      alert('최소 한 개 이상의 해시태그를 입력해 주세요');
      return;
    }
    setSelectHashTag([]);
    const formData = new FormData();
    formData.append('feedPostId', feedPost.feedPostId);
    formData.append('userNo', feedPost.userNo);
    formData.append('body', contentRef.current.value);
    selectRef.current.getValue().forEach((item) => {
      formData.append('hashTag', item.value);
      console.log(item.value);
      setSelectHashTag((prev) => {
        return [...prev, item.value];
      });
    });
    console.log(contentRef.current.value)
    setContent(contentRef.current.value);
    setEditYN(false);

    setFeedPost((prevFeedPost) => {
      return {
        ...prevFeedPost,
        body: contentRef.current.value,
      };
    });
    axios({
      method: 'put',
      url: '/feedpost/updatefeed',
      data: formData,
    })
      .then(() => {
        alert('수정이 완료되었습니다 :)');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 520, // 원하는 가로 크기로 변경
      height: 52.3, // 원하는 높이로 변경
      lineHeight: 'normal',
      fontSize: 14,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: 'rotate(180deg)', // 화살표 회전
    }),
  };

  let [inputCount, setInputCount] = useState(200-feedPost.body.length);
  const inputCountRef = useRef();

  const onTextareaHandler = (e) => {
    const value = e.target.value.length;
    const value2 = 200 - value;
  setInputCount(value2)
    if (value2 >= 0) {
      inputCountRef.current.style.color = 'blue';
    } else {
      inputCountRef.current.style.color = 'red';
    }
  };
  //글 수정

  // 글 취소

  function editCancel() {
    setSelectHashTag([]);
    hashTagList.forEach((e) => {
      setSelectHashTag((prev) => {
        return [...prev, { value: e.hashTag, label: e.hashTag }];
      });
    });
      setInputCount(200-feedPost.body.length);
    setContent(feedPost.body);
    setEditYN(false);
  }

  const handleInputChange = (event) => {};

  // const handleSaveClick = () => {
  //   setPreviousValue(value);
  // };

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
    } else {
      setIsLogintrue(true);
    }
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
        console.log(error);
      });
  }

  //------------------------------------------------


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
                            height: '100%',
                            objectFit: 'contain',
                            margin: 'auto',
                            display: 'block',
                          }}
                        />
                      </ImageLayout>
                    );
                  })}
                </Slider>
              </div>
              <div className="information">
                <div className="commentData">
                  <div className="commentUserImgWrapper">
                    {/* {console.log(feedPost)} */}
                    <Link to={`/myPickPage?userNo=${feedPost.userNo}`}>
                      <img
                        className="commentUserImg"
                        src={'/images/' + feedPost.profileSysName}
                        width="40"
                        height="40"
                      />
                    </Link>
                  </div>
                  <div className="authorInfomation">
                    <div className="author">
                      {feedPost.userNickName}
                    </div>
                    <div className="introduction">
                      {userBio}
                    </div>
                  </div>

                  {/* 수정하기 눌렀을 때 숨김 */}
                  {editYN === false && (
                    <div className="optionBox">
                      <div className="optionBox" onClick={optionBoxClick}>
                        <OptionBox></OptionBox>
                      </div>
                      {optionListDiv &&
                        (feedPost.userNo === userNo ? (
                          <div className="optionList">
                            <div className="optionListDiv">
                              <a onClick={editFeedPost}>수정하기</a>
                            </div>
                            <div className="optionListDiv">
                              <a onClick={deleteFeedPost}>삭제</a>
                            </div>
                          </div>
                        ) : (
                          <div className="optionList">
                            <div className="optionListDiv">
                              <a
                              // onClick={reportFeedPost}
                              >
                                신고하기
                              </a>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className="authorDescription">
                  {editYN === false ? (
                    <div className="feedPostBody">{feedPost.body}</div>
                  ) : (
                    <div className="feedPostBody">
                      <textarea
                        className="post"
                        placeholder="content"
                        maxLength="200"
                        ref={contentRef}
                        onChange={onTextareaHandler}
                        onInput={(e) => {
                          setFeedPost(() => {
                            return { ...FeedPost, body: e.target.value };
                          });
                        }}
                      >
                        {feedPost.body}
                      </textarea>
                    </div>
                  )}
                  <div className="feedPostBodyRight">
                    <div className="feedPostBodyRightTop">
                      <div className="feedPostWidth"></div>
                      <div className="feedPostWeather">
                        <div className="weatherIcon">{weatherIcon}</div>
                        <div className="writeTemp">{feedPost.writeTemp}º</div>
                      </div>
                      <div className="feedPostWidth"></div>
                    </div>
                    <div className="feedPostBodyRightBottom">
                      {editYN !== false && (
                        <div className="inputCount" ref={inputCountRef}>
                          {inputCount}자
                        </div>
                      )}
                    </div>
                  </div>
                </div>

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
                        options={options}
                        value={selectHashTag}
                        ref={selectRef}
                        onChange={(selectedOptions) => {
                          setSelectHashTag(selectedOptions);
                          setTimeout(() => {
                            if (selectRef.current.getValue().length > 5) {
                              alert('해시 태그는 5개 까지 입력 가능합니다.');
                              setSelectHashTag((prevValues) =>
                                prevValues.slice(0, -1),
                              );
                            }
                          }, 100);
                        }}
                        menuPlacement="top"
                        styles={customStyles}
                      />
                    </div>
                    <div className="buttons">
                      <button onClick={editComplate}>수정 완료</button>
                      <button onClick={editCancel}>수정 취소</button>
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
                      {feedLikeCount}
                    </span>
                  </div>
                </div>
                <div
                  className="btnLayout"
                  style={{ transform: `scale(${scrapScale})` }}
                  onClick={setFeedScrap}
                >
                  <div
                    className={isFeedScrap ? 'scrapBox' : 'disScrapBox'}
                    onClick={() => {
                      setReportModal(true);
                    }}
                  >
                    <ScrapImage />
                  </div>
                  {/* <button
                    onClick={(e) => {
                      console.log('trueture');
                      setReportModal(true);
                    }}
                  >
                    테스트
                  </button> */}
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
        {isLogintrue && <ConfirmDialog setAlertCheck={setIsLogintrue} />}
      </div>
    </div>
  );
}
export default FeedModal;
