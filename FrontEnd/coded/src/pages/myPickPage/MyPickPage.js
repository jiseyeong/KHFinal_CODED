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
            <img src="/images/test.jpg" alt="Profile Picture" />
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

            {currentUserNo !== loginUserNo && (
            <svg className='DMButton' height="100" viewBox="0 0 20 20" width="100" xmlns="http://www.w3.org/2000/svg" onClick={handleDMButtonClick}>
            <path d="M10.4809 13.8423H15.4C16.2962 13.8423 17 13.1288 17 12.2764V5.56582C17 4.71348 16.2962 4 15.4 4H4.6C3.70383 
            4 3 4.71348 3 5.56582V12.2764C3 13.1288 3.70383 13.8423 4.6 13.8423H6.19908L6.2 17L6.20346 16.9997L6.20502 16.9988L10.4809 
            13.8423ZM6.79895 17.8034C6.35668 18.1298 5.73 18.0406 5.39921 17.6042C5.26989 17.4335 5.2 17.2262 5.2 17.0133L5.19937 
            14.8423H4.6C3.16406 14.8423 2 13.6935 2 12.2764V5.56582C2 4.14876 3.16406 3 4.6 3H15.4C16.8359 3 18 4.14876 18 5.56582V12.2764C18 
            13.6935 16.8359 14.8423 15.4 14.8423H10.81L6.79895 17.8034Z" fill="#212121" />
          </svg>
            )}

            

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
