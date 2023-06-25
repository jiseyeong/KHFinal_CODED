import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import FeedCommentList from './FeedCommentList';
import axios from 'axios';

const HeartIcons = {
  empty: (
    <svg
      className="like"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  heart: null,
};

function FeedComment({ commentInfo, feedPostId, depth, readComments }) {
  const [onReply, setOnReply] = useState(false);
  const [profileSysName, setProfileSysName] = useState(
    commentInfo.sysName ? commentInfo.sysName : 'test',
  );
  const editorRef = useRef(null);
  const accessToken = useSelector((state) => state.member.access);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (accessToken) {
      axios({
        method: 'get',
        url: '/feedpost/comment/like',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          commentId: commentInfo.feedCommentId,
        },
      })
        .then((response) => {
          setIsLike(response.data);
        })
        .catch((error) => {
          if (error.request.status === 400) {
            console.log('먼저 로그인을 해주세요.');
          } else {
            console.log(error);
          }
        });
    }
  }, [accessToken]);

  function handleOnReply() {
    setOnReply((prev) => {
      return !prev;
    });
  }

  function handleIsLike() {
    axios({
      method: 'post',
      url: '/feedpost/comment/like',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        commentId: commentInfo.feedCommentId,
      },
    })
      .then((response) => {
        setIsLike(response.data);
      })
      .catch((error) => {
        if (error.request.status === 400) {
          console.log('저 로그인을 해주세요.');
        } else {
          console.log(error);
        }
      });
  }

  function writeComment() {
    console.log(editorRef.current.innerText);
    axios({
      method: 'post',
      url: '/feedpost/nestedComment',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        feedPostId: feedPostId,
        parentId: commentInfo.feedCommentId,
        body: editorRef.current.innerText,
        depth: depth + 1,
      },
    })
      .then((response) => {
        readComments();
      })
      .catch((error) => {
        if (error.request.status === 400) {
          console.log('먼저 로그인을 해주세요.');
        } else {
          console.log(error);
        }
      });
  }
  return (
    <div>
      <div>
        <img src={`/images/${profileSysName}`} alt="유저 프로필 사진"></img>
      </div>
      <div>nick : {commentInfo.userNickName}</div>
      <div>id : {commentInfo.userId}</div>
      <div>content : {commentInfo.body}</div>
      <div>write date : {commentInfo.formedWriteDate}</div>
      <div onClick={handleIsLike}>
        like : {isLike ? 'heart' : HeartIcons.empty}
      </div>
      {depth < 1 && accessToken && (
        <button onClick={handleOnReply}>comment</button>
      )}

      {onReply && (
        <div>
          <div ref={editorRef} contentEditable="true" />
          <button onClick={writeComment}>전송</button>
        </div>
      )}
      <div>
        {/* 답글 리스트 */}
        <FeedCommentList
          feedPostId={feedPostId}
          depth={depth + 1}
          parentId={commentInfo.feedCommentId}
        />
      </div>
    </div>
  );
}

export default FeedComment;
