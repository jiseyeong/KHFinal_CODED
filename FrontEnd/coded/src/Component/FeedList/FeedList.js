import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import FeedPostDetail from '../FeedPostDetail/FeedPostDetail';

const FeedPostOuter = styled('div')`
  margin: auto;
  width: 80%;
  border: 1px solid black;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

function FeedList() {
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

        console.log({ thumbNailList });

        setFeedPost(feedPostList);
        setThumbnail([...thumbNailList]);
        setUserProfile([...userProfileList]);
        setMember([...memberList]);
        setHashTagList([...hashTagLists]);
        setCpage(cpage + 1);
      })
      .catch((error) => console.log(error));
  };

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addFeedList();
    }
  };

  useEffect(() => {
    console.log('화면에 나타남');
    addFeedList();
    return () => {
      console.log('화면에 사라짐');
    };
  }, []);

  return (
    <FeedPostOuter>
      {feedPost.map((e, i) => (
        <FeedPostDetail
          feedPost={e}
          thumbNail={thumbNail[i]}
          member={member[i]}
          userProfile={userProfile[i]}
          hashTagList={hashTagList[i]}
        ></FeedPostDetail>
      ))}
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

//   window.onscroll = function() {
//   if (( window.innerHeight + window.scrollY)>= document.body.offsetHeight ) {
//   var toAdd = document.createElement("div");
//   toAdd.classList.add("box")
//   toAdd.textContent = `${++count}번째`
//   document.querySelector('section').appendChild(toAdd);
//   }
//   }