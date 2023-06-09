import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import FeedPostInner from './FeedPostStyled';

const FeedPostOuter = styled('div')`
  margin: auto;
  width: 1202px;
  border: 1px solid black;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`;

const FeedList = () => {
  const [num, setNum] = useState(0);
  const [test, setTest] = useState([]);
  var count = 2;

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      axios({
        method: 'GET',
        url: '/feedpost/selectfeedlisttestscroll/',
      })
        .then((resp) => {
          let temp = [];
          resp.data.forEach((i) => {
            console.log(i);
            temp = [...temp, { id: i.feedPostId, body: i.body }];
          });
          setTest([...test, ...temp]);
        })
        .catch(console.log('false'));
    }
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/feedpost/selectfeedlisttestscroll/',
    })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        let temp = [];
        resp.data.forEach((i) => {
          console.log(i);
          temp = [...temp, { id: i.feedPostId, body: i.body }];
        });
        setTest([...test, ...temp]);
      })
      .catch(console.log('false'));
  }, []);

  return (
    <FeedPostOuter>
      {test.map((i) => (
        <FeedPostInner id={i.id} body={i.body} />
      ))}
    </FeedPostOuter>
  );
};

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
