import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Modal from '../../pages/ootd/Main/Modal';
const ParentDiv = styled('div')`
  width: 18%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  /* column-fill: auto;
  column-count: 5; */
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
  /* break-inside: auto; */
`;

const FeedImageDiv = styled('div')`
  border: 1px solid black;
  width: 80%;
  /* height: 60%; */
  height: auto;
  margin: 10px 20px 10px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const ThumbNail = styled('img')`
  width: auto;
  min-height: 200px;
  max-height: 300px;
  object-fit: cover;
`;

const FeedInfoDiv = styled('div')`
  width: 80%;
  height: 20%;
  border: 1px solid black;
  word-wrap: break-word;
`;

const FeedPostDetail = (props) => {
  const { feedPost, thumbNail, member, userProfile, hashTagList } = props;
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

  useEffect(() => {
    console.log(thumbNail);
  }, []);

  return (
    <ParentDiv>
      <FeedInnerLayoutDiv onClick={openModal}>
        <FeedImageDiv>
          {thumbNail != null ? (
            <ThumbNail
              src={`/images/${thumbNail.sysName}`}
              alt="abc"
            ></ThumbNail>
          ) : (
            <ThumbNail></ThumbNail>
          )}
        </FeedImageDiv>
        <FeedInfoDiv>
          <div>{feedPost.feedPostId}</div>
          <div>{feedPost.body}</div>
        </FeedInfoDiv>
      </FeedInnerLayoutDiv>
      {modal && <Modal modal={modal} closeModal={closeModal} id={props.id} />}
    </ParentDiv>
  );
};

export default FeedPostDetail;
