import React, { Component, useEffect, useState } from 'react';
// import "../styles/common.scss";
// import "../styles/reset.scss";
import './Modal.scss';
//import Image from "../image/326548_bookmark_icon.png";
import { useSelector } from 'react-redux';
import axios from 'axios';
import {OptionBox, Like, ScrapImage, RepleImage} from '../../../assets/ModalAsset/ModalAsset';

function Modal({ modalData, data, setData, closeModal, feedPostId }) {


  const [feedPost,setFeedPost] = useState({});

  const [photoList,setPhotoList] = useState([]);
  const [writeMember,setWriteMember] = useState({});
  const [userProfile,setUserProfile] = useState({});
  const [feedLikeCount,setFeedLikeCount] = useState(0);
  const [isFeedLike,setFeedLike] = useState();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [description, setDescription] = useState(
    modalData?.modalData?.modalData?.description,
  ); // 그냥 modalData?.description으로 바꿔볼 것.
  const [res, setRes] = useState([]);
  const [isLikeBtn, setIsLikeBtn] = useState(false);
  const [isRepleLikeBtn, setIsRepleLikeBtn] = useState(false);
  const [follower, setFollower] = useState(
    modalData?.modalData?.modalData?.follower,
  ); // 그냥 modalData?.follower로 바꿔볼 것.
  const [isFollowBtn, setIsFollowBtn] = useState(false);
  const accessToken = useSelector((state) => state.member.access);

  let num = 0;

  function handleClickLike(e) {
    e.preventDefault();
    if (!isLikeBtn) {
      setIsLikeBtn(true);
      setFollower(modalData?.modalData?.modalData?.follower + 1); //modalData?.follower + 1 로 고쳐봐도 될 것.
    } else {
      setIsLikeBtn(false);
      setFollower(modalData?.modalData?.modalData?.follower - 1);
    }
  }

  function handleRepleLike(e) {
    if (!isRepleLikeBtn) {
      setIsRepleLikeBtn(true);
    } else {
      setIsRepleLikeBtn(false);
    }
  }

  function followBtnActive() {
    if (isFollowBtn) {
      setIsFollowBtn(false);
    } else {
      setIsFollowBtn(true);
    }
  }

  function getData(e) {
    e.preventDefault();
    setComment(e.target.value);
    setData(e.target.value);
  }

  function handleKeyPress(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      if (!comment) {
        e.preventDefault();
      } else {
        // handleComment();
      }
    }
  }
  
  useEffect(()=>{
      axios({
        method:'get',
        url:'/feedpost/selectFeedDetail',
        headers:{
          Authorization:'Bearer '+accessToken
      },
      params:{
        feedPostId:feedPostId
     }
      }).then((response)=>{
        const {
          feedPost,
          photoList,
          writeMember,
          userProfile,
          feedLikeCount,
          isFeedLike
        } = response.data;
        setFeedPost(feedPost);
        setPhotoList(photoList);
        setWriteMember(writeMember);
        setUserProfile(userProfile);
        setFeedLikeCount(feedLikeCount);
        setFeedLike(isFeedLike);
      }).catch((error)=>{
        console.log(error);

      })
  },[])

  // const API = `http://   /ootds/${modalData?.modalData?.modalData?.id}/comments`;
  function handleComment(e) {
    axios({
      method: 'post',
      url: API,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      params: {
        content: comment,
        user_id: modalData?.modalData?.modalData?.id,
      },
    })
      .then((response) => {
        setRes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setComments((prev) => {
      return [...prev, comment];
    });
    setComment('');
    num += 1;
  }

  useEffect(() => {
    console.log('id값', modalData?.modalData?.modalData?.id);
  });

  return (
    <div className="wrapper">
      <div className="mainWrapper">
        <div className="modalWrapper" onClick={closeModal}>
          <div className="innerWrapper" onClick={(e) => e.stopPropagation()}>
            <div className="leftWrapper">
              <div className="imgWrapper">
                <img
                  className="image"
                  src={modalData?.modalData?.modalData?.contentImg}
                />
                <div
                  className={
                    modalData?.modalData?.modalData?.contentImg?.length > 1
                      ? 'smallImages'
                      : 'displayNone'
                  }
                >
                  <div></div>
                  {/* <figure className="smallImagesWrapper">
                    <img
                      className="smallImage"
                      src={modalData?.modalData?.modalData?.contentImg[0]}
                    />
                  </figure>
                  <figure className="smallImagesWrapper">
                    <img
                      className="smallImage"
                      src={modalData?.modalData?.modalData?.contentImg[1]}
                    />
                  </figure> */}
                </div>
              </div>
              <div className="information">
                <div className="commentData">
                  <div className="commentUserImgWrapper">
                    <img
                      className="commentUserImg"
                      src={modalData?.modalData?.modalData?.authorImg}
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className="authorInfomation">
                    <div className="author">
                      {writeMember.userId}
                    </div>
                    <div className="introduction">
                      {writeMember.userNickname}
                    </div>
                  </div>
                  <div className="optionBox">
                  <OptionBox></OptionBox>
                </div>
                </div>
                <hr className="hrTag"></hr>
                <div className="authorDescription">
                  <span>
                    {feedPost.body}
                  </span>
                </div>
              </div>
            </div>

            <div className="rightWrapper">
              <div className="authorPopularity">
                <div className={isLikeBtn ? 'likeBox' : 'dislikeBox'}>
                  <Like></Like>
                </div>
                <div className="likeNumBox">
                  <span className="likeNum">
                    {' '}
                    100
                    {modalData?.modalData?.modalData?.follower}
                  </span>
                </div>
                <div className="scrapBox">
                  <ScrapImage></ScrapImage>
                </div>
              </div>

              <div className="commentWrapper">
                <div className="commentNum">
                  <span>
                    댓글({modalData?.modalData?.modalData?.commentNum})
                  </span>
                </div>
                {modalData?.modalData?.modalData?.comments.map(
                  (comment, idx) => (
                    <div className="commentBox" key={idx * 1300}>
                      <div className="imgWrapper">
                        <img
                          className="commentUserImg"
                          width="30px"
                          height="30px"
                          src={
                            modalData?.modalData?.modalData?.comments[0]
                              ?.commentAuthorImg
                          }
                        />
                      </div>
                      <div className="commentInfoWrapper">
                        <div className="commentContentWrapper">
                          <span className="commentUser">
                            {comment.commentAuthor}
                          </span>
                          <span className="commentContent">
                            {comment.comment}
                          </span>
                        </div>
                        <div className="commentBtnWrapper">
                          <span className="commentDate">
                            {comment.commentCreatedAt}
                          </span>
                          <span className="commentBtn"> 답글 달기 </span>
                        </div>
                      </div>
                    </div>
                  ),
                )}

                {comments.map((commentText) => {
                  return (
                    <div className="commentCreateBox" key={commentText.id}>
                      <div className="commentCreateImgWrapper">
                        <img
                          className="commentCreateUserImg"
                          width="30px"
                          height="30px"
                          src={commentText.commentAuthorImg}
                        />{' '}
                      </div>
                      <div className="commentCreateInfoWrapper">
                        <div className="commentCreateContentWrapper">
                          <span className="commentCreateUser">
                            {commentText.commentAuthor}
                          </span>
                          <span className="commentCreateContent">
                            {commentText.comment}
                          </span>
                        </div>
                        <div className="commentCreateBtnWrapper">
                          <span className="commentCreateDate">
                            {commentText.commentCreatedAt}
                          </span>
                          <span className="commentCreateBtn"> 답글 달기 </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <form className="inputWrapper" onSubmit={handleComment}>
                  <input
                    type="text"
                    placeholder="댓글을 남기세요..."
                    onChange={getData}
                    onKeyUp={handleKeyPress}
                    value={comment}
                    className="inputReple"
                  />
                </form>
                <div className="reple">
                  <div className="repleBox1">
                    <div className="repleProfile">
                      <img></img>
                    </div>
                    <div className="repleContents">
                      <div className="repleNickname">한유 @hanyu3677</div>
                      <div className="repleWrite">데일리룩 잘 봤습니다</div>
                    </div>
                    <div className = {isRepleLikeBtn ? 'likeRepleBox' : 'dislikeRepleBox'}>
                      <RepleImage></RepleImage>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
