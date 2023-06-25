import { useEffect, useRef, useState } from 'react';
import './MyPickPage.scss';
import FeedPostDetail from '../../component/FeedPostDetail/FeedPostDetail';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MyPickPage = () => {
  const accessToken = useSelector((state) => state.member.access);
  const [feedPost, setFeedPost] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});

  useEffect(() => {
    if (accessToken) {
      // 1. 토큰 값으로 유저의 정보를 반환
      axios({
        url: 'auth/userWithProfileDTO',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        // 2. 고유 넘버로
        .then((resp) => {
          const { userNo, userId, userNickName, email, bio, hashTag, sysName } =
            resp.data;
          setMemberInfo({
            userNo: userNo,
            userId: userId,
            userNickName: userNickName,
            email: email,
            bio: bio,
            hashTag: hashTag,
            sysName: sysName,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

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
