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
  width: 80%;
  height: 80%;
  border: 1px solid black;
`;

const FeedImageDiv = styled('div')`
  border: 1px solid black;
  width: 200px;
  height: 250px;
  margin: 20px;
  display: flex;
  justify-content: center;
`;

const FeedInfoDiv = styled('div')`
  width: 80%;
  height: 80%;
  border: 1px solid black;
`;

export default FeedPostInner;
