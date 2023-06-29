import React, { useEffect, useState } from 'react';
import './FollowList.scss';
import { CloseBtn2 } from '../../assets/ModalAsset/IconAsset';
import axios from 'axios';

function FollowerList({ setFollowerIsOpen, followModalMode, userNo }) {
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [showFollowStats, setShowFollowStats] = useState(followModalMode);

  const toFollowing = () => {
    setShowFollowStats(true);
  };
  const toFollower = () => {
    setShowFollowStats(false);
  };

  // 초기 데이터 세팅
  useEffect(() => {
    axios({
      url: '',
      method: 'post',
      param: {
        userNo: userNo,
      },
    })
      .then((resp) => {
        // 해당 유저넘버의 팔로잉 리스트와 팔로우 리스트들을 받아온다
        // 리스트들의 데이터 => 프로필, id, 닉네임
        // 나를 팔로워한 유저들의 정보를 가져올 때, 내가 그 유저를 팔로우 했는 지 그 여부도 알아야 한다
        // => axios요청을 한 번 더 보내도됨 근데 바로 가져올 수 있게 하는 걸 추천
        const { followingList, followerList } = resp.data;
        setFollowingList(followingList);
        setFollowerList(followerList);
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
          onClick={toFollowing}
          style={
            showFollowStats
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
          onClick={toFollower}
          style={
            !showFollowStats
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
          {showFollowStats
            ? followingList.map((item) => {
                <FollowUser followUser={item} />;
              })
            : followerList.map((item) => {
                <FollowUser followUser={item} />;
              })}
        </ul>
      </div>
    </div>
  );
}

const FollowUser = () => {
  return (
    <li className="user">
      <div className="profileLayout">
        <img className="profile" src="/images/test.jpg" />
      </div>
      <div className="infoLayout">
        <div className="userNickName">닉네임</div>
        <div className="userId">아이디</div>
      </div>
      <div className="btnLayout">
        <button className="followBtn">팔로우</button>
      </div>
    </li>
  );
};

export default FollowerList;
