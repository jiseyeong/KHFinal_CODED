import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { styled } from 'styled-components';
import FeedPostDetail from '../FeedPostDetail/FeedPostDetail';
import Masonry from 'react-masonry-component';

const FeedPostOuter = styled('div')`
  margin: auto;
  width: 80%;
  /* column-count: 5;
  column-gap: 20px; */
  padding: 10px 20px 10px;
  .FeedPostDetail {
    // FeedPostDetail 컴포넌트에 대한 스타일을 지정하세요.
    // Masonry 스타일을 구현할 수 있습니다.
  }
`;

const masonryOption = {
  gutter: 16,
  itemSelector: '.FeedPostDetail',
  columnWidth: 200,
  horizontalOrder: true,
};

function FeedList() {
  const [cpage, setCpage] = useState(1);
  const [feedPost, setFeedPost] = useState([]);
  const [thumbNail, setThumbnail] = useState([]);
  const [member, setMember] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [hashTagList, setHashTagList] = useState([]);
  const [columnHeights, setColumnHeights] = useState([0, 0, 0, 0, 0]);

  const feedPostOuterRef = useRef(null);

  const addFeedList = () => {
    axios({
      method: 'GET',
      url: '/feedpost/selectAllFeedPost/',
      params: {
        cpage: cpage,
      },
    })
      .then((resp) => {
        const {
          feedPostList,
          thumbNailList,
          memberList,
          userProfileList,
          hashTagLists,
        } = resp.data;

        setFeedPost((prev) => [...prev, ...feedPostList]);
        setThumbnail((prev) => [...prev, ...thumbNailList]);
        setUserProfile((prev) => [...prev, ...userProfileList]);
        setMember((prev) => [...prev, ...memberList]);
        setHashTagList((prev) => [...prev, ...hashTagLists]);
        setCpage(cpage + 1);
      })
      .catch((error) => console.log(error));
  };

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addFeedList();
    }
  };
  // window.innerHeight 실제 보이는 창의 높이
  // window.scrollY 페이지 상단에서부터 스크롤된 값
  // document.body.offsetHeight 페이지 전체 높이

  useEffect(() => {
    console.log('화면에 나타남');
    addFeedList();

    return () => {
      console.log('화면에 사라짐');
    };
  }, []);

  return (
    <FeedPostOuter ref={feedPostOuterRef}>
      <Masonry breakpointCols={4} options={masonryOption}>
        {feedPost.map((e, i) => {
          console.log(e.feedPostId);
          return (
            <FeedPostDetail
              className="FeedPostDetail"
              key={i}
              index={i}
              columnHeights={columnHeights}
              setColumnHeights={setColumnHeights}
              feedPost={e}
              thumbNail={thumbNail[i]}
              member={member[i]}
              userProfile={userProfile[i]}
              hashTagList={hashTagList[i]}
            ></FeedPostDetail>
          );
        })}
      </Masonry>
    </FeedPostOuter>
  );
}

export default FeedList;

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
