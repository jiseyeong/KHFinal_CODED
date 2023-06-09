import styled from 'styled-components';
import React from 'react';

const FeedPostInner = (props) => {
  return (
    <FeedInnerLayoutDiv>
      <FeedImageDiv />
      <FeedInfoDiv>
        <div>{props.id}</div>
        <div>{props.body}</div>
      </FeedInfoDiv>
    </FeedInnerLayoutDiv>
  );
};

const FeedInnerLayoutDiv = styled('div')`
  width: 200px;
  height: 300px;
  margin: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const FeedImageDiv = styled('div')`
  border: 1px solid black;
  width: 80%;
  height: 60%;
  margin: 10px 20px 10px;
  display: flex;
  justify-content: center;
`;

const FeedInfoDiv = styled('div')`
  width: 80%;
  height: 20%;
  border: 1px solid black;
`;

export default FeedPostInner;
