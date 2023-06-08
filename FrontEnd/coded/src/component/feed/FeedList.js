import axios from 'axios';
import React, { createElement, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

const StyledFeedListLayoutDiv = styled('div')`
  margin: auto;
  width: 1200px;
  border: 1px solid black;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`;

const FeedImage = styled('div')`
  border: 1px solid black;
  width: 200px;
  height: 250px;
  margin: 20px;
`;

const FeedList = () => {
  const [num, setNum] = useState(0);
  const [test, setTest] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/feedpost/selectfeedlist',
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
    <StyledFeedListLayoutDiv>
      {test.map(() => (
        <FeedImage key={test.id}>{test.id}</FeedImage>
      ))}
    </StyledFeedListLayoutDiv>
  );
};

export default FeedList;
