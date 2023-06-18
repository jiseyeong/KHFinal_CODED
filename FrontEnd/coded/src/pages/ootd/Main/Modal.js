import React, { Component } from "react";
import "../styles/common.scss";
import "../styles/reset.scss";
import "./modal.scss";
import Image from "../image/326548_bookmark_icon.png";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: [],
      description: this.props.modalData?.modalData?.modalData?.description,
      res: [],
      isLikeBtn: false,
      follower: this.props.modalData?.modalData?.modalData?.follower,
    };
  }
  num = 0;

  handleClickLike = (e) => {
    e.preventDefault();
    if (this.state.isLikeBtn === false) {
      this.setState({
        isLikeBtn: true,
        follower: this.props.modalData?.modalData?.modalData?.follower + 1,
      });
    } else {
      this.setState({
        isLikeBtn: false,
        follower: this.props.modalData?.modalData?.modalData?.follower - 1,
      });
    }
  };

  handleRepleLike = (e) => {
    if (this.state.isLikeBtn === false) {
      this.setState({
        isLikeBtn: true
      });
    } else {
      this.setState({
        isLikeBtn: false
      });
    }
    }


  followBtnActive = () => {
    if (this.state.followBtn) {
      this.setState({
        followBtn: false,
      });
    } else {
      this.setState({
        followBtn: true,
      });
    }
  };

  getData = (e) => {
    e.preventDefault();

    this.setState({
      comment: e.target.value,
    });
    this.props.getData({
      getData: e.target.value,
    });
  };

  // API = `http://   /ootds/${this.props.modalData?.modalData?.modalData?.id}/comments`;

  handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      if (!this.state.comment) {
        e.preventDefault();
      } else {
        this.handleComment();
      }
    }
  };

  // handleComment = (e) => {
  //   fetch(this.API, {
  //     method: 'POST',
  //     // headers: {
  //     //   Authorization: localStorage.getItem("token"),
  //     // },
  //     body: JSON.stringify({
  //       content: this.state.comment,
  //       // user_id: this.props.modalData?.modalData?.modalData?.id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) =>
  //       this.setState({
  //         res: res,
  //       }),
  //     );
  //   const { comment, comments } = this.state;
  //   comments.push({ comment });
  //   this.setState({
  //     comment: '',
  //   });
  //   this.num += 1;
  // };

  render() {
    console.log("id값", this.props.modalData?.modalData?.modalData?.id);
    const { closeModal, id, modalData } = this.props;
    const { followBtn, comments, isLikeBtn } = this.state;

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
                        ? "smallImages"
                        : "displayNone"
                    }
                  >
                    <div>
                      
                    </div>
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
                              sungha123
                              {modalData?.modalData?.modalData?.author}
                            </div>
                            <div className="introduction">
                              김성하
                              {modalData?.modalData?.modalData?.introdution}
                            </div>
                          </div>
                          <div className="followBtnBox">
                            <svg
                              className={
                                followBtn ? "followBtnActive" : "followBtn"
                              }
                              onClick={this.followBtnActive}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              stroke="currentColor"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                              <path
                                fill-rule="evenodd"
                                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                              />
                            </svg>
                          </div>
                        </div>
                        <hr className="hrTag"></hr>
                        <div className="authorDescription">
                          <span>데일리룩 #OOTD #청바지 #셔츠
                            {modalData?.modalData?.modalData?.description}
                          </span>
                        </div>
                      </div>
              </div>

              <div className="rightWrapper">
                <div className="authorPopularity">
                  <div className={isLikeBtn ? "likeBox" : "dislikeBox"}>
                    <svg
                      className="like"
                      onClick={this.handleClickLike}
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="likeNumBox">
                    <span classNum="likeNum"> 100
                      {modalData?.modalData?.modalData?.follower}
                    </span>
                  </div>
                  <div className="scrapBox">
                    {/* <img src={Image} className="scrapImage"></img> */}
                    <svg
                      className="scrapImage"
                      fill="currentColor"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4zm0 30l-10-4.35L14 36V10h20v26z" />
                      <path d="M0 0h48v48H0z" fill="none" />
                    </svg>
                  </div>
                  <div className="optionBox">
                    <svg
                      className="option"
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M255.8 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM102 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM410 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38z"></path>
                    </svg>
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
                    )
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
                          />{" "}
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
                            <span className="commentCreateBtn">
                              {" "}
                              답글 달기{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <form className="inputWrapper" onSubmit={this.handleComment}>
                    <input
                      type="text"
                      placeholder="댓글을 남기세요..."
                      onChange={this.getData}
                      onKeyUp={this.handleKeyPress}
                      value={this.state.comment}
                      className="inputReple"
                    />
                  </form>
                  <div className="reple">
                  <div className="repleBox1">
                  <div className="repleProfile"><img></img></div>
                  <div className="repleContents">
                  <div className="repleNickname">한유 @hanyu3677</div>
                  <div className="repleWrite">데일리룩 잘 봤습니다</div>
                  </div>
                  <div className="repleLike">
                  <svg
                      className="like"
                      onClick={handleRepleLike}
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
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
}
export default Modal;
