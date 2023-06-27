import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { styled } from 'styled-components';
import FeedPostDetail from '../FeedPostDetail/FeedPostDetail';
import Masonry from 'react-masonry-component';
import { useLocation } from 'react-router-dom';
import NoticeBar from './NoticeBar';
import NoneSearchedBar from './NoneSearchedBar';

// 벽돌형 리스트 출력을 위해 react-masonry-component를 사용

// masonry의 옵션 세팅
const masonryOptions = {
  // 내부 요소들 선택자 지정
  itemSelector: '.grid-item',
  // 열 사이 간격
  gutter: 30,

  // 출력 순서 => 가로 방향 우선
  horizontalOrder: true,

  // 요소 내 가로 사이즈 동일
  isEqualSize: true,
  fitWidth: true,
};

const FeedPostOuter = styled('div')`
  margin: auto;
  width: 85%;
  display: flex;
  justify-content: center;
  border: 0px;
  padding: 20px;

  .my-masonry-grid {
    width: 100%;
    border: 0px;
  }
  .grid-item {
    // 행 사이 간격
    margin-bottom: 30px;
    border: 0px;
  }
`;

function SearchedFeedList() {
  const [feedPost, setFeedPost] = useState([]);
  // const [thumbNail, setThumbnail] = useState([]);
  // const [member, setMember] = useState([]);
  // const [userProfile, setUserProfile] = useState([]);
  // const [hashTagList, setHashTagList] = useState([]);
  // const [columnHeights, setColumnHeights] = useState([0, 0, 0, 0, 0]);
  const [newSearch, setNewSearch] = useState(false);
  const feedPostOuterRef = useRef(null);
  // const [cpage, setCpage] = useState(1);
  const cpage = useRef(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  let pageLoading = false;

  // useEffect(() => {
  //   setkeywordInput();
  // }, [keywordInput]);
  useEffect(() => {
    cpage.current = 1;
    setNewSearch(true);
    addSearchedFeedList(keyword);
    console.log(keyword);
    window.onscroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setNewSearch(false);
        addSearchedFeedList(keyword);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [keyword]);

  // 현재 위치 (현재 페이지) 별 피드 리스트 출력
  const addSearchedFeedList = (keyword) => {
    if (!pageLoading) {
      pageLoading = true;
      axios
        .request({
          method: 'GET',
          url: `/feedpost/selectSearchHashFeedList/${keyword}`,
          params: {
            cpage: cpage.current,
          },
        })
        .then((resp) => {
          // console.log(resp.data);
          // const {
          //   feedPostList,
          //   thumbNailList,
          //   memberList,
          //   userProfileList,
          //   hashTagLists,
          // } = resp.data;
          pageLoading = false;
          // 새로 검색했을 때,
          if (newSearch) {
            setFeedPost(() => [...resp.data]);
            // setThumbnail(() => [...thumbNailList]);
            // setUserProfile(() => [...userProfileList]);
            // setMember(() => [...memberList]);
            // setHashTagList(() => [...hashTagLists]);
          } else {
            setFeedPost((prev) => [...prev, ...resp.data]);
            // setThumbnail((prev) => [...prev, ...thumbNailList]);
            // setUserProfile((prev) => [...prev, ...userProfileList]);
            // setMember((prev) => [...prev, ...memberList]);
            // setHashTagList((prev) => [...prev, ...hashTagLists]);
          }

          // setCpage((prev) => {
          //   return (prev + 1);
          // });
          console.log(resp.data);
          cpage.current = cpage.current + 1;
        })
        .catch((error) => {
          console.log(error);
          pageLoading = false;
        });
    }
  };

  // window.innerHeight 실제 보이는 창의 높이
  // window.scrollY 페이지 상단에서부터 스크롤된 값
  // document.body.offsetHeight 페이지 전체 높이

  return (
    <>
      {feedPost.length > 0 ? (
        <>
          <NoticeBar keyword={keyword}></NoticeBar>
          <FeedPostOuter ref={feedPostOuterRef}>
            <Masonry className={'my-masonry-grid'} options={masonryOptions}>
              {feedPost.map((e, i) => (
                <div className="grid-item" key={i}>
                  <FeedPostDetail
                    index={i}
                    // columnHeights={columnHeights}
                    // setColumnHeights={setColumnHeights}
                    feedPost={e}
                    // thumbNail={thumbNail[i]}
                    // member={member[i]}
                    // userProfile={userProfile[i]}
                    // hashTagList={hashTagList[i]}
                  ></FeedPostDetail>
                </div>
              ))}
            </Masonry>
          </FeedPostOuter>
        </>
      ) : (
        <NoneSearchedBar />
      )}
    </>
  );
}

export default SearchedFeedList;

// window.innerHeight 실제 보이는 창의 높이
// window.scrollY 페이지 상단에서부터 스크롤된 값
// document.body.offsetHeight 페이지 전체 높이

// 구현내용
// (표시되는 영역 + 스크롤 값)이 (콘텐츠 전체 높이) 보다 클 때, 새로운 요소 추가.
//    <section>
//       <div class="box"></div>
//       <div class="box">2번째</div>
//    </section>
// <script>
//   var count = 2;

// window.onscroll = function () {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     var toAdd = document.createElement('div');
//     toAdd.classList.add('box');
//     toAdd.textContent = `${++count}번째`;
//     document.querySelector('section').appendChild(toAdd);
//   }
// };
