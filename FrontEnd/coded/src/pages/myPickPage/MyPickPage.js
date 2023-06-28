import { useEffect, useRef, useState, useCallback } from 'react';
import './MyPickPage.scss';
import FeedPostDetail from '../../component/FeedPostDetail/FeedPostDetail';
import { useDispatch, useSelector } from 'react-redux';
import { setNonMember } from '../../modules/Redux/navbarSetting';
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const MyPickPage = () => {
  const [feedPost, setFeedPost] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});
  const cpage = useRef(1);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.member.access);
  const denyAccess = useCallback(() => dispatch(setNonMember()), [dispatch]);

  // 쿼리스트링으로 해당 유저의 userNo를 가져옴
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let currentUserNo = searchParams.get('userNo');

  useEffect(() => {
    if (currentUserNo === null) {
      if (accessToken) {
        // 1. 토큰 값으로 나의 고유 넘버를 반환
        axios({
          url: '/auth/userNo',
          method: 'get',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((resp) => {
            currentUserNo = resp.data;
          })
          // 2. 고유 넘버로 유저 정보 반환
          .then(getMyPickData)
          .catch((error) => {
            console.log(error);
          });
      } else {
        denyAccess();
      }
    } else {
      // 또는 해당 유저 넘버의 유저 정보 반환
      getMyPickData(currentUserNo);
    }
    return () => {
      window.onscroll = null;
    };
  }, [accessToken]);

  const getMyPickData = () => {
    axios({
      url: '/auth/selectMyPickPageData',
      method: 'get',
      params: {
        userNo: currentUserNo,
      },
    })
      .then((resp) => {
        console.log(resp.data);
        const {
          userNo: userNo,
          userId: userId,
          userNickName: userNickname,
          bio: bio,
          hashTag: hashTag,
          writeDate: writeDate,
          sysName: sysName,
          postCount: postCount,
          followingCount: followingCount,
          followerCount: followerCount,
        } = resp.data;

        setMemberInfo({
          userNo: userNo,
          userId: userId,
          userNickName: userNickname,
          bio: bio,
          hashTag: hashTag,
          writeDate: writeDate,
          sysName: sysName,
          postCount: postCount,
          followingCount: followingCount,
          followerCount: followerCount,
        });
      })
      .then(addFeedList);
  };

  const addFeedList = () => {
    console.log('addfeedList');
    console.log(memberInfo);
    axios({
      method: 'GET',
      url: '/feedpost/selectUserFeedPost',
      params: {
        userNo: currentUserNo,
        cpage: cpage.current,
      },
    })
      .then((resp) => {
        setFeedPost((prev) => [...prev, ...resp.data]);
        cpage.current = cpage.current + 1;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      addFeedList();
    }
  };

  return (
    <div className="myPickPageLayout">
      <div className="profile">
        <div className="profileHeader">
          <div className="imageLayout">
            {memberInfo.sysName ? (
              <img src={`/images/${memberInfo.sysName}`} />
            ) : (
              <img src="/images/test.jpg" />
            )}
          </div>
          <div className="profileInfo">
            <h1>{memberInfo.userNickName}</h1>
            <div>@{memberInfo.userId}</div>
            <div>{memberInfo.bio}</div>
            {memberInfo.bio !== '' ? (
              <div className="bio">{memberInfo.bio}</div>
            ) : (
              <div className="bio">한줄 소개 없음</div>
            )}
            {memberInfo.hashTag !== '' ? (
              <div className="hashTag">#{memberInfo.hashTag}</div>
            ) : (
              <div className="hashTag">해시 태그 없음</div>
            )}
          </div>
          <div className="profileStatsLayout">
            <ul className="profileStats">
              <li>
                <strong className="statsCount">{memberInfo.postCount}</strong>
                <div className="statsTitle">Posts</div>
              </li>
              <li>
                <strong className="statsCount">
                  {memberInfo.followerCount}
                </strong>
                <div className="statsTitle">Followers</div>
              </li>
              <li>
                <strong className="statsCount">
                  {memberInfo.followingCount}
                </strong>
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
          {feedPost.map((e, i) => (
            <div className="grid-item" key={i}>
              <FeedPostDetail index={i} feedPost={e}></FeedPostDetail>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPickPage;
