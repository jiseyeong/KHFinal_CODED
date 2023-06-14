import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import ModalSample from '../ModalSample';

const ParentDiv = styled('div')`
  width: 18%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
`;

const FeedInnerLayoutDiv = styled('div')`
  width: 100%;
  height: auto;
  margin: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  &:hover {
    cursor: pointer;
  }
`;

const FeedImageDiv = styled('div')`
  border: 1px solid black;
  width: 80%;
  /* height: 60%; */
  min-height: 200px;
  max-height: 300px;
  margin: 10px 20px 10px;
  display: flex;
  justify-content: center;
`;

const FeedInfoDiv = styled('div')`
  width: 80%;
  height: 20%;
  border: 1px solid black;
  word-wrap: break-word;
`;

const FeedPostInner = (props) => {
  const { feedpost, thumbnail, member, userProfile, hashTagList } = props;
  const [modal, setModal] = useState(false);

  const openModal = () => {
    if (!modal) {
      setModal(true);
    }
  };

  const closeModal = () => {
    if (modal) {
      setModal(false);
    }
  };

  return (
    <ParentDiv>
      {feedPostList.map((e, i) => (
        <FeedInnerLayoutDiv onClick={openModal}>
          <FeedImageDiv>
            <img src="/image/feedPost"></img>
          </FeedImageDiv>
          <FeedInfoDiv>
            <div>{e.feedPostId}</div>
            <div>{e.body}</div>
            <div>
              TestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
            </div>
          </FeedInfoDiv>
        </FeedInnerLayoutDiv>
      ))}
      {modal && (
        <ModalSample modal={modal} closeModal={closeModal} id={props.id} />
      )}
    </ParentDiv>
  );
};

export default FeedPostDetail;
