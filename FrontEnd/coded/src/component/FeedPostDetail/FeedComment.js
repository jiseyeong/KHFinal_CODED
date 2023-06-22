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

function FeedComment({
  userNickName,
  userId,
  userProfile,
  commentInfo,
  feedPostId,
  depth,
  readComments,
}) {
  const [onReply, setOnReply] = useState(false);
  const [profileSysName, setProfileSysName] = useState(userProfile ? userProfile.sysName : "");
  const editorRef = useRef(null);
  const accessToken = useSelector((state) => state.member.access);
  const [isLike, setIsLike] = useState(false);


  useEffect(()=>{
    if(accessToken){
      axios({
        method:'get',
        url:'/feedpost/comment/like',
        headers:{
          Authorization:`Bearer ${accessToken}`
        },
        params:{
          commentId:commentInfo.feedCommentId,
        },
      })
      .then((response)=>{
        setIsLike(response.data);
      })
      .catch((error)=>{
        if(error.request.status === 400){
          console.log("로그인 부터 진행해주셔야 합니다.");
        }else{
          console.log(error);
        }
      })
    }
  }, [accessToken]);

  function handleOnReply() {
    setOnReply((prev)=>{return !prev});
  }

  function handleIsLike(){
    axios({
      method:'post',
      url:'/feedpost/comment/like',
      headers:{
        Authorization:`Bearer ${accessToken}`
      },
      params:{
        commentId:commentInfo.feedCommentId,
      },
    }).then((response)=>{
      setIsLike(response.data);
    }).catch((error)=>{
      if(error.request.status === 400){
        console.log("로그인부터 진행해주셔야 합니다.");
      }else{
        console.log(error);
      }
    })
  }

  function onSubmit() {
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
          console.log('로그인부터 진행해주서야 합니다.');
        } else {
          console.log(error);
        }
      });
  }
  return (
    <div>
      <div><img src={`/images/${profileSysName}`} alt="유저 프로필 사진"></img></div>
      <div>작성자: {userNickName}</div>
      <div>작성자 ID : {userId}</div>
      <div>본문: {commentInfo.body}</div>
      <div>작성일시: {commentInfo.formedWriteDate}</div>
      <div onClick={handleIsLike}>좋아요: {isLike ? 'heart' : HeartIcons.empty}</div>
      {(depth < 1 && accessToken) &&
        <button onClick={handleOnReply}>답글</button>
      }

      {onReply && (
        <div>
          <div
            ref={editorRef}
            contentEditable="true"
          />
          <button onClick={onSubmit}>전송</button>
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
