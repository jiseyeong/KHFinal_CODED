import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import FeedCommentList from './FeedCommentList';
import axios from 'axios';
import { styled } from 'styled-components';
import style from './FeedComment.module.scss';

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
  heart: (
    <svg
      className="like"
      stroke="currentColor"
      fill="#ff0066"
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
};

function FeedComment({ commentInfo, feedPostId, depth, readComments }) {
  const [onReply, setOnReply] = useState(false);
  const [profileSysName, setProfileSysName] = useState(
    commentInfo.sysName ? commentInfo.sysName : 'test',
  );
  const editorRef = useRef(null);
  const accessToken = useSelector((state) => state.member.access);
  const userNo = useSelector((state) => state.member.userNo);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const commentRef = useRef(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    handleLikeCount();
  }, []);

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
            console.log('Login First!');
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
        handleLikeCount();
      })
      .catch((error) => {
        if (error.request.status === 400) {
          console.log('Login First!');
        } else {
          console.log(error);
        }
      });
  }

  function handleLikeCount() {
    axios({
      method: 'get',
      url: '/feedpost/comment/likeCount',
      params: {
        commentId: commentInfo.feedCommentId,
      },
    })
      .then((response) => {
        setLikeCount(response.data);
      })
      .catch((error) => {
        console.log(error);
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
          console.log('Login First!');
        } else {
          console.log(error);
        }
      });
  }

  function handleUpdate() {
    setIsUpdate((prev) => {
      return !prev;
    });
  }
  function updateComment() {
    handleUpdate();
    axios({
      method: 'Put',
      url: '/feedpost/comment',
      params: {
        feedCommentId: commentInfo.feedCommentId,
        body: commentRef.current.innerText,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        readComments();
      })
      .catch((error) => {
        if (error.request.status === 400) {
          console.log('Login First!');
        } else {
          console.log(error);
        }
      });
  }
  function cancelUpdateComment() {
    handleUpdate();
    commentRef.current.innerText = commentInfo.body;
  }
  function deleteComment() {
    axios({
      method: 'Delete',
      url: '/feedpost/comment',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        feedCommentId: commentInfo.feedCommentId,
      },
    })
      .then((response) => {
        readComments();
      })
      .catch((error) => {
        if (error.request.status === 400) {
          console.log('Login First!');
        } else {
          console.log(error);
        }
      });
  }
  return (
    <div className={style.feedCommentBox}>
      <div className={style.feedCommentList}>
        <div className={style.imageBox}>
          <img src={`/images/${profileSysName}`}></img>
        </div>
        <div className={style.contentsBox}>
          <div className={style.userInfo}>
            <span className={style.userNickname}>
              {commentInfo.userNickName}
            </span>
            <span className={style.userId}>{commentInfo.userId}</span>
          </div>
          <div
            contentEditable={isUpdate}
            ref={commentRef}
            suppressContentEditableWarning={true}
            className={style.contents}
          >
            {commentInfo.body}
          </div>
        </div>
        <div className={style.heartBox} onClick={handleIsLike}>
          <div className={style.heartIcon}>
            {isLike ? HeartIcons.heart : HeartIcons.empty}
          </div>
        </div>
      </div>
      <div className={style.feedCommentList2}>
        <div className={style.writeDate}>
          {commentInfo.formedWriteDate}
        </div>
        <div className={style.heartCount}>좋아요 {likeCount}</div>
        <div className={style.repleBtn}>
          {depth < 1 && accessToken && (
            <button onClick={handleOnReply}>댓글 달기</button>
          )}
        </div>
        <div className={style.btnBox}>
          {userNo === commentInfo.userNo &&
            (isUpdate ? (
              <div>
                <button className={style.commentBtn} onClick={updateComment}>
                  확정
                </button>
                <button
                  className={style.commentBtn}
                  onClick={cancelUpdateComment}
                >
                  취소
                </button>
              </div>
            ) : (
              <>
                <button className={style.commentBtn} onClick={handleUpdate}>
                  수정
                </button>
                {/* <span>／</span> */}
              </>
            ))}
          {userNo === commentInfo.userNo && (
            <button className={style.commentBtn} onClick={deleteComment}>
              삭제
            </button>
          )}
        </div>
      </div>
      <div className={style.nestedCommentReple}>
        {onReply && (
          <div>
            <div
              className={style.nestedCommentInput}
              ref={editorRef}
              contentEditable="true"
            />
            <button onClick={writeComment}>전송</button>
          </div>
        )}
      </div>
      <div className={style.nestedComment}>
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
