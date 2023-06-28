import { useEffect, useRef, useState, useCallback } from 'react';
import './MyPickPage.scss';
import FeedPostDetail from '../../component/FeedPostDetail/FeedPostDetail';
import { useDispatch, useSelector } from 'react-redux';
import { setNonMember } from '../../modules/Redux/navbarSetting';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const MyPickPage = () => {
  const [feedPost, setFeedPost] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});
  const cpage = useRef(1);

  const loginUserNo = useSelector((state) => state.member.userNo);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.member.access);
  const denyAccess = useCallback(() => dispatch(setNonMember()), [dispatch]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navi = useNavigate();

  const [currentUserNo, setCurrentUserNo] = useState(
    searchParams.get('userNo'),
  );

  useEffect(() => {
    // 쿼리스트링으로 해당 유저의 userNo를 가져옴
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
            setCurrentUserNo(resp.data);
          })
          // 2. 고유 넘버로 유저 정보 반환
          // .then(getMyPickData)
          .catch((error) => {
            console.log(error);
          });
      } else {
        denyAccess();
      }
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

  useEffect(() => {
    if (currentUserNo) {
      getMyPickData();
    }
  }, [currentUserNo]);

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

  const Profile = () => {
    navi('/profile');
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
              {currentUserNo !== loginUserNo ? (
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
              ) : (
                <div className="writeBtnLayout">
                  <svg
                    className="writeBtnSvg"
                    height="40"
                    viewBox="0 0 20 20"
                    width="30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="writeButton"
                      d="M13.9988 7.4995C13.9988 8.32784 13.3273 8.99934 12.499 8.99934C11.6706 8.99934 10.9991 8.32784 10.9991 7.4995C10.9991 6.67117 11.6706 5.99967 12.499 5.99967C13.3273 5.99967 13.9988 6.67117 13.9988 7.4995ZM12.9989 7.4995C12.9989 7.22339 12.7751 6.99956 12.499 6.99956C12.2228 6.99956 11.999 7.22339 11.999 7.4995C11.999 7.77562 12.2228 7.99945 12.499 7.99945C12.7751 7.99945 12.9989 7.77562 12.9989 7.4995ZM3 5.99967C3 4.343 4.343 3 5.99967 3H13.9988C15.6555 3 16.9985 4.343 16.9985 5.99967V9.00234C16.6571 9.0179 16.3179 9.0941 15.9986 9.23094V5.99967C15.9986 4.89522 15.1032 3.99989 13.9988 3.99989H5.99967C4.89522 3.99989 3.99989 4.89522 3.99989 5.99967V13.9988C3.99989 14.3714 4.10179 14.7202 4.27923 15.0188L8.94803 10.4312C9.53155 9.85784 10.4669 9.85784 11.0504 10.4312L12.7951 12.1455L12.088 12.8526L10.3496 11.1444C10.1551 10.9533 9.84333 10.9533 9.64883 11.1444L4.98802 15.7242C5.2848 15.8986 5.63056 15.9986 5.99967 15.9986H9.47395C9.45833 16.0499 9.44398 16.1017 9.43092 16.1539L9.21979 16.9985H5.99967C4.343 16.9985 3 15.6555 3 13.9988V5.99967ZM10.9789 15.3758L15.8078 10.5469C16.538 9.81666 17.722 9.81666 18.4523 10.5469C19.1826 11.2772 19.1826 12.4612 18.4523 13.1915L13.6234 18.0204C13.3419 18.3019 12.9891 18.5016 12.6028 18.5982L11.1051 18.9726C10.4537 19.1355 9.86376 18.5455 10.0266 17.8942L10.401 16.3964C10.4976 16.0101 10.6973 15.6574 10.9789 15.3758Z"
                      fill="#222"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="editBtnLayout">
              <button className="editButton" onClick={Profile}>
                Edit
              </button>
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
