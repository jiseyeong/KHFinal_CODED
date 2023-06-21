import React, { Component } from "react";
import "./Hashtag.scss";

class Hashtag extends Component {
  render() {
    const { tagList } = this.props;

    return (
      <div className="hashtag">
        <div className="cardList">
          {tagList?.map((tag, idx) => {
            return (
              <div className="eachCard" key={idx}>
                <div className="tagImgBox">
                  <img
                    className="tagImg"
                    alt="태그코디사진"
                    src={tag?.tag_image}
                  ></img>
                </div>
                <div className="tagDescBox">
                  <div>
                    <span className="userName">{tag?.tag_userName}</span>
                    <span className="userId">{tag?.tag_userId}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Hashtag;
