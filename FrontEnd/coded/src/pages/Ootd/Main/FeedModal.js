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
  setfeedPost,
  updatehashTagList,
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

  let num = 0;

  //  수정하기 ---------------------------------------
  const [FeedPost, setFeedPost] = useState({});
  const [selectHashTag, setSelectHashTag] = useState([]); // 해시태그 벨류값만 보내는거
  const [HashTag, setHashTag] = useState([]); // 해시태그 벨류랑 라벨 다보내야됨
  const [editYN, setEditYN] = useState(false);
  const [content, setContent] = useState(feedPost.body); //콘텐트 기본값, 수정하기
  const selectRef = useRef();
  const contentRef = useRef(); // 바디 레퍼런스
  const [options, setOptions] = useState([]); //가져오기 해쉬태그 리스트

  // 신고 모달 온오프
  const [reportFeedPost, setReportFeedPost] = useState(false);

  useEffect(() => {
    let arrTemp = [];
    hashTagList.forEach((item) => {
      let tempselect = item.hashTag;
      let temp = { value: item.hashTag, label: item.hashTag };
      setSelectHashTag((preview) => [...preview, item.hashTag]);
      arrTemp = arrTemp.concat({
        value: item.hashTag,
        label: item.hashTag,
      });
      setHashTag([...arrTemp]);
    });

    updateImageList();
    // 스크랩 여부 가져오기
    updateScrap();

    if (feedPost.writePtyCode == 1 || feedPost.writePtyCode == 2) {
      setWeatherIcon(weatherIcons.rain);
    } else if (feedPost.writePtyCode == 3) {
      setWeatherIcon(weatherIcons.snow);
    } else if (feedPost.writePtyCode == 4) {
      setWeatherIcon(weatherIcons.heavyRain);
    } else {
      if (feedPost.writeSkyCode == 1) {
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
  // 옵션을 가져와서 가져옴

  useEffect(() => {}, [selectHashTag]);

  useEffect(() => {}, [HashTag]);

  function updateImageList() {
    axios({
      method: 'get',
      url: '/photo/feedpost',
      params: {
        feedPostId: feedPost.feedPostId,
      },
    })
      .then((response) => {
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

  // 수정 버튼 눌렀을때

  function editFeedPost() {
    setOptionListDiv((prev) => {
      return !prev;
    });
    setEditYN(true);
  }

  // 수정하기 완료
  function editComplate() {
    const Contentvalue = contentRef.current.value;
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
      setSelectHashTag((prev) => {
        return [...prev, item.value];
      });
    });
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
        setfeedPost((prev) => {
          return { ...prev, body: Contentvalue };
        });
        setContent(Contentvalue);
        updatehashTagList();
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

  let [inputCount, setInputCount] = useState(200 - feedPost.body.length);
  const inputCountRef = useRef();

  const onTextareaHandler = (e) => {
    const value = e.target.value.length;
    const value2 = 200 - value;
    setInputCount(value2);
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
    HashTag.forEach((e) => {
      setSelectHashTag((prev) => {
        return [...prev, e.value];
      });
    });
    // setInputCount(200 - content.value.length);
    setContent(content);
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
    if (accessToken) {
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
    } else {
      setIsLogintrue(true);
    }
  }

  // 신고 모달창 닫기
  const handleFeedReportModal = () => {
    setReportFeedPost(false);
  };

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
                    <div className="author">{feedPost.userNickName}</div>
                    <div className="introduction">{userBio}</div>
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
                              <a onClick={editFeedPost}>edit</a>
                            </div>
                            <div className="optionListDiv">
                              <a onClick={deleteFeedPost}>delete</a>
                            </div>
                          </div>
                        ) : (
                          <div className="optionList">
                            <div
                              className="optionListDiv"
                              onClick={() => {
                                if (accessToken) {
                                  setReportFeedPost(true);
                                } else {
                                  setIsLogintrue(true);
                                }
                              }}
                            >
                              신고하기
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className="authorDescription">
                  {editYN === false ? (
                    <div className="feedPostBody">{content}</div>
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
                        {content}
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
                    {selectHashTag.length > 0 ? (
                      selectHashTag.map((e, i) => (
                        <Link to={`/feedList/search?keyword=${e}`} key={i}>
                          <span>
                            #{e}
                            &nbsp;&nbsp;
                          </span>
                        </Link>
                      ))
                    ) : (
                      <span>no tag</span>
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
                        value={HashTag}
                        ref={selectRef}
                        onChange={(selectedOptions) => {
                          setHashTag(selectedOptions);
                          setSelectHashTag([]);
                          selectedOptions.forEach((e) => {
                            setSelectHashTag((prev) => {
                              return [...prev, e.value];
                            });
                          });

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
                      <button onClick={editComplate}>upload</button>
                      <button onClick={editCancel}>cancel</button>
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
                    <span className="likeNum">{feedLikeCount}</span>
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
                </div>
              </div>

              <FeedCommentList
                feedPostId={feedPost.feedPostId}
                depth={0}
                parentId={0}
              />
            </div>
          </div>
        </div>
        {isLogintrue && <ConfirmDialog setAlertCheck={setIsLogintrue} />}
        {reportFeedPost && (
          <ReportModal
            feedPostId={feedPost.feedPostId}
            onReportView={handleFeedReportModal}
          />
        )}
      </div>
    </div>
  );
}
export default FeedModal;
