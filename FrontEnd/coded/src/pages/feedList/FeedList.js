import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import FeedPostDetail from '../../component/FeedPostDetail/FeedPostDetail';

const FeedPostOuter = styled('div')`
  margin: auto;
  width: 80%;
  border: 1px solid black;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

function FeedList({
  feedPostList,
  thumbNailList,
  memberList,
  userProfileList,
  hashTagLists,
}) {
  useEffect(() => {
    console.log('데이터 설정 완료');
  }, [feedPostList]);

  return (
    <FeedPostOuter>
      {feedPostList && feedPostList.length > 0 ? (
        feedPostList.map((feedpost, i) => (
          <FeedPostDetail
            feedPost={feedpost}
            thumbNail={thumbNailList[i]}
            member={memberList[i]}
            userProfile={userProfileList[i]}
            hashTagList={hashTagLists[i]}
          ></FeedPostDetail>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </FeedPostOuter>
  );
}

function MakeFeedList() {
  const [cpage, setCpage] = useState(1);
  const [feedPost, setFeedPost] = useState([]);
  const [thumbNail, setThumbnail] = useState([]);
  const [member, setMember] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [hashTagList, setHashTagList] = useState([]);

  const addFeedList = () => {
    axios({
      method: 'GET',
      url: '/feedpost/selectAllFeedPost/',
      params: {
        cpage: cpage,
      },
    })
      .then((resp) => {
        console.log(resp.data);

        const {
          feedPostList,
          thumbNailList,
          memberList,
          userProfileList,
          hashTagLists,
        } = resp.data;

        setFeedPost([...feedPostList]);
        setThumbnail([...thumbNailList]);
        setUserProfile([...userProfileList]);
        setMember([...memberList]);
        setHashTagList([...hashTagLists]);
        setCpage(cpage + 1);
      })
      .catch((resp) => console.log(resp));
  };

  // window.onscroll = function () {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     addFeedList();
  //   }
  // };

  useEffect(() => {
    console.log('화면에 나타남');
    addFeedList();
    return () => {
      console.log('화면에 사라짐');
    };
  }, []);

  return (
    <FeedList
      feedPostList={feedPost}
      thumbNailList={thumbNail}
      memberList={member}
      userProfileList={userProfile}
      hashTagLists={hashTagList}
    />
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

//   window.onscroll = function() {
//   if (( window.innerHeight + window.scrollY)>= document.body.offsetHeight ) {
//   var toAdd = document.createElement("div");
//   toAdd.classList.add("box")
//   toAdd.textContent = `${++count}번째`
//   document.querySelector('section').appendChild(toAdd);
//   }
//   }
