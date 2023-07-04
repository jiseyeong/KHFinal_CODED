import React, { useEffect, useState } from 'react';
import './FollowList.scss';
import { CloseBtn2 } from '../../assets/ModalAsset/IconAsset';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../Common/ConfirmDialog';

function FollowerList({ setFollowerIsOpen, followModalMode, userNo }) {
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [showFollowingStats, setShowFollowingStats] = useState(followModalMode);
  const myUserNo = useSelector((state) => state.member.userNo); //내 유저번호 뽑아오기(로그인한 유저)

  // 초기 데이터 세팅
  useEffect(() => {
    axios
      .all([
        axios.get('/follow/selectfollowerlist', {
          params: {
            targetUserNo: userNo,
            myUserNo: myUserNo,
          },
        }),
        axios.get('/follow/selectfollowinglist', {
          params: {
            targetUserNo: userNo,
            myUserNo: myUserNo,
          },
        }),
      ])

      .then(([resp1, resp2]) => {
        setFollowerList(resp1.data);
        setFollowingList(resp2.data);
        console.log(resp1.data);
        console.log(resp2.data);
        // 리스트 내에 내가 그 유저를 팔로우 했는 지 여부도 가져옴
        // 로그인 되어있지 않다면 무조건 언팔로우 상태 (userNo : defaultValue=0)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="followContainer">
      <div className="modalTitle">
        Follow List
        <CloseBtn2
          className="closeBtn"
          onClick={() => {
            setFollowerIsOpen(false);
          }}
        />
      </div>
      <div className="modalNavi">
        <div
          className="followBox"
          onClick={() => {
            setShowFollowingStats(true);
          }}
          style={
            showFollowingStats
              ? {
                  fontWeight: '600',
                  borderBottom: '1px solid black',
                }
              : {}
          }
        >
          Follower
        </div>
        <div
          className="followBox"
          onClick={() => {
            setShowFollowingStats(false);
          }}
          style={
            !showFollowingStats
              ? {
                  fontWeight: '600',
                  borderBottom: '1px solid black',
                }
              : {}
          }
        >
          Following
        </div>
      </div>
      <div className="modalBody">
        <ul className="userList">
          {!showFollowingStats &&
            followerList &&
            followerList.map((item, index) => {
              console.log(item);
              return (
                <FollowUser
                  key={index}
                  followUser={item}
                  isFollow={item.isFollow === 1 ? true : false}
                  myUserNo={myUserNo}
                />
              );
            })}
          {showFollowingStats &&
            followingList &&
            followingList.map((item, index) => {
              console.log(item);
              return (
                <FollowUser
                  key={index}
                  followUser={item}
                  isFollow={item.isFollow === 1 ? true : false}
                  myUserNo={myUserNo}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}

const FollowUser = ({ followUser, isFollow, myUserNo }) => {
  const [followCheck, setFollowCheck] = useState(isFollow);
  // console.log(followCheck + ' / ' + followUser.userNo);
  const [isLogintrue, setIsLogintrue] = useState(false);

  function follow(toUserNo) {
    //버튼 클릭시 insert, delete..

    if (myUserNo) {
      axios({
        method: 'post',
        url: '/follow/handleFollow',
        params: {
          toUserNo: toUserNo,
          fromUserNo: myUserNo,
        },
      })
        .then((response) => {
          setFollowCheck((prev) => !prev);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsLogintrue(true);
    }
  }

  return (
    <li className="user">
      <div className="profileLayout">
        <a href={`/myPickPage?userNo=${followUser.userNo}`}>
          {followUser.sysName ? (
            <img className="profile" src={`/images/${followUser.sysName}`} />
          ) : (
            <img className="profile" src={`/images/test.jpg`} />
          )}
        </a>
      </div>
      <div className="infoLayout">
        <div className="userNickName">{followUser.userNickName}</div>
        <div className="userId">{followUser.userId}</div>
      </div>
      <div className="btnLayout">
        {myUserNo !== followUser.userNo &&
          (followCheck ? (
            <button
              className="followingBtn"
              onClick={() => {
                follow(followUser.userNo);
              }}
            >
              Following
            </button>
          ) : (
            <button
              className="followBtn"
              onClick={() => {
                follow(followUser.userNo);
              }}
            >
              Follow
            </button>
          ))}
      </div>
      {isLogintrue && <ConfirmDialog setAlertCheck={setIsLogintrue} />}
    </li>
  );
};

export default FollowerList;
