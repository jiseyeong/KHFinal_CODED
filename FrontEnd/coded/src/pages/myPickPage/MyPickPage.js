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

  const loginUserNo = useSelector((state) => state.member.userNo);
  

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


  const handleDMButtonClick = () => {
    if (accessToken) {
      if (!subscribed) {
        // 새로 구독
        // TODO: 구독할 토픽 및 구독 관련 로직 추가
  
        // 구독 시작 후 DMList 페이지로 이동
        setSubscribed(true);
        history.push('/dm-list');
      } else {
        // 이미 구독 중인 경우
        // DMList 페이지로 이동
        history.push('/dm-list');
      }
    
      // 토큰이 있을 때의 동작
      // 구독 상태인지 확인하고, 구독되지 않았을 경우 구독 요청을 보내고 DMList 페이지로 이동
      // 구독 상태라면 DMList 페이지로 이동
    } else {

      // 토큰이 없을 때의 동작
      denyAccess(); 
    }
  };


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
            <div className="id">@{memberInfo.userId}</div>
            <div>{memberInfo.bio}</div>
            {memberInfo.bio !== '' ? (
              <div className="bio">{memberInfo.bio}</div>
            ) : (
              <div className="bio">no bio</div>
            )}
            {memberInfo.hashTag !== '' ? (
              <div className="hashTag">#{memberInfo.hashTag}</div>
            ) : (
              <div className="hashTag">no hashtag</div>
            )}
          </div>

          <div className="profileStatsLayout">
            <div className="followStatus">
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
              {currentUserNo !== loginUserNo && (
              <div className="dmBtnLayout">
                <svg
                  className="dmBtnSvg"
                  height="40"
                  viewBox="0 0 20 20"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="dmButton"
                    d="M8.53828 2C4.94843 2 2.03828 4.91015 2.03828 8.5C2.03828 9.651 2.33787 10.7334 2.86353 11.6719L2.06779 13.7542C1.7745 14.5216 2.48048 15.2957 3.2716 15.0741L5.75898 14.3774C6.60219 14.7768 7.5448 15 8.53828 15C12.1281 15 15.0383 12.0899 15.0383 8.5C15.0383 4.91015 12.1281 2 8.53828 2ZM3.03828 8.5C3.03828 5.46243 5.50071 3 8.53828 3C11.5758 3 14.0383 5.46243 14.0383 8.5C14.0383 11.5376 11.5758 14 8.53828 14C7.63615 14 6.78612 13.7832 6.03606 13.3993L5.86185 13.3101L3.0019 14.1111L3.97101 11.5753L3.84272 11.3655C3.33247 10.5313 3.03828 9.55079 3.03828 8.5ZM11.5009 18C9.53124 18 7.76622 17.1239 6.57422 15.7402C7.13727 15.8926 7.7266 15.981 8.33392 15.9973C9.22932 16.629 10.3218 17 11.5009 17C12.403 17 13.253 16.7832 14.0031 16.3993L14.1773 16.3101L17.0373 17.1111L16.0681 14.5752L16.1964 14.3655C16.7067 13.5313 17.0009 12.5508 17.0009 11.5C17.0009 10.3455 16.6452 9.27414 16.0374 8.38943C16.0286 7.78165 15.9475 7.19137 15.8024 6.6268C17.1506 7.81779 18.0009 9.5596 18.0009 11.5C18.0009 12.651 17.7013 13.7333 17.1756 14.6719L17.9714 16.7542C18.2646 17.5216 17.5587 18.2957 16.7675 18.0741L14.2802 17.3774C13.437 17.7768 12.4943 18 11.5009 18Z"
                    fill="#222"
                  />
                </svg>
              </div>
            </div>
            )}
            <div className="followBtnLayout">
              <button className="followButton">Follow</button>
            </div>

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
