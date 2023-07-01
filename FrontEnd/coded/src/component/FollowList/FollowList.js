import React, { useEffect, useState } from 'react';
import './FollowList.scss';
import { CloseBtn2 } from '../../assets/ModalAsset/IconAsset';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function FollowerList({ setFollowerIsOpen, followModalMode, userNo }) {
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [showFollowingStats, setShowFollowingStats] = useState(followModalMode);
  const myUserNo = useSelector((state) => state.member.userNo); //내 유저번호 뽑아오기(로그인한 유저)

  // 초기 데이터 세팅
  useEffect(() => {
    axios
      .all([
        axios.get('/follow/selectfollowinglist', {
          params: {
            targetUserNo: userNo,
            myUserNo: myUserNo,
          },
        }),
        axios.get('/follow/selectfollowerlist', {
          params: {
            targetUserNo: userNo,
            myUserNo: myUserNo,
          },
        }),
      ])

      .then(([resp1, resp2]) => {
        console.log(resp1.data);
        console.log(resp2.data);
        setFollowingList(resp1.data);
        setFollowerList(resp2.data);

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
        팔로우 리스트
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
          팔로잉
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
          팔로워
        </div>
      </div>
      <div className="modalBody">
        <ul className="userList">
          {showFollowingStats
            ? followingList &&
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
              })
            : followerList &&
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
        </ul>
      </div>
    </div>
  );
}

const FollowUser = ({ followUser, isFollow, myUserNo }) => {
  const [followCheck, setFollowCheck] = useState(isFollow);
  function follow(toUserNo) {
    //버튼 클릭시 insert, delete..

    axios({
      method: 'post',
      url: '/follow/insertfollow',
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
              className="followBtn"
              onClick={() => {
                follow(followUser.userNo);
              }}
            >
              팔로잉
            </button>
          ) : (
            <button
              className="followBtn"
              onClick={() => {
                follow(followUser.userNo);
              }}
            >
              팔로우
            </button>
          ))}
      </div>
    </li>
  );
};

export default FollowerList;
