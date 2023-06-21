import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
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
  commentInfo,
  isLike,
  feedPostId,
  depth,
  readComments,
}) {
  const [onReply, setOnReply] = useState(false);
  const editorRef = useRef(null);
  const accessToken = useSelector((state) => state.member.access);

  useEffect(() => {
    if (editorRef.current) {
      // editorRef.current.getInstance.removeHook('addImageBlobHook');
      console.log(editorRef.current.getInstance());
    }
  }, [editorRef.current]);

  function handleOnReply() {
    setOnReply(!onReply);
  }

  function onSubmit() {
    axios({
      method: 'post',
      url: '/feedpost/nestedComment',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        feedPostId: feedPostId,
        parentId: commentInfo.feedCommentId,
        body: editorRef.current.getInstance().getMarkdown(),
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
      <div>작성자: {userNickName}</div>
      <div>작성자 ID : {userId}</div>
      <div>본문: {commentInfo.body}</div>
      <div>작성일시: {commentInfo.writeDate}</div>
      <div>좋아요: {isLike ? 'heart' : HeartIcons.empty}</div>
      {depth < 1 &&
        <button onClick={handleOnReply}>답글</button>
      }

      {onReply && (
        <div>
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="150px"
            initialEditType="wysiwyg"
            language="ko-KR"
            hideModeSwitch="true"
            toolbarItems={[['bold', 'italic', 'strike']]}
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
