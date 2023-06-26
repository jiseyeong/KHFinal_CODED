import { useEffect, useRef, useState } from 'react';
import './MyPickPage.scss';
import FeedPostDetail from '../../component/FeedPostDetail/FeedPostDetail';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MyPickPage = ({ userNo }) => {
  const [feedPost, setFeedPost] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});

  let accessToken;
  if (userNo === undefined) {
    accessToken = useSelector((state) => state.member.access);
  }

  useEffect(() => {
    if (userNo) {
      if (accessToken) {
        // 1. 토큰 값으로 나의 고유 넘버를 반환
        axios({
          url: 'auth/userNo',
          method: 'get',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          // 2. 고유 넘버로 유저 정보 반환
          .then((resp) => {
            console.log(resp.data);
            // userNo = resp.data;
            // return userNo;
          })
          // .then(getUserData(userNo))
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      // 또는 해당 유저 넘버의 유저 정보 반환
      getUserData(userNo);
    }
  }, [accessToken]);

  const getUserData = () => {
    axios({
      url: '/auto/selectMyPickPageData',
      method: 'get',
      param: {
        userNo: userNo,
      },
    }).then((resp) => {
      // const {
      //   userNo: userNo,
      //   userId: userId,
      //   userNickName: userNickname,
      //   bio: bio,
      //   hashTag: hashTag,
      //   sysName: sysName,
      //   postCount: postCount,
      //   followingCount: followingCount,
      //   followerCount: followerCount,
      // } = resp.data;

      console.log(resp.data);
    });
  };

  return (
    <div className="myPickPageLayout">
      <div className="profile">
        <div className="profileHeader">
          <div className="imageLayout">
            <img src="/images/test.jpg" alt="Profile Picture" />
          </div>
          <div className="profileInfo">
            <h1>{memberInfo.userNickName}</h1>
            <div>@{memberInfo.userId}</div>
            <div>여름시러{memberInfo.bio}</div>
            <div>#{memberInfo.hashTag}</div>
          </div>
          <div className="profileStatsLayout">
            <ul className="profileStats">
              <li>
                <strong className="statsCount">1,365</strong>
                <div className="statsTitle">Posts</div>
              </li>
              <li>
                <strong className="statsCount">238M</strong>
                <div className="statsTitle">Followers</div>
              </li>
              <li>
                <strong className="statsCount">67</strong>
                <div className="statsTitle">Following</div>
              </li>
            </ul>
          </div>
          <div className="btnLayout">
            <img alt="이미지 아이콘" className="followButton" />
          </div>
        </div>

        <hr />

        <div className="feed">
          {/* Post 1 */}
          {/* <FeedPostDetail index={i} feedPost={e}></FeedPostDetail> */}
        </div>
      </div>
    </div>
  );
};

export default MyPickPage;
