import React, { useEffect, useState } from 'react';
import './FollowList.scss';
import { CloseBtn2 } from '../../assets/ModalAsset/IconAsset';
import axios from 'axios';
import { useSelector } from 'react-redux';

function FollowerList({ setFollowerIsOpen, followModalMode, userNo }) {
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [showFollowStats, setShowFollowStats] = useState(followModalMode);
  const myUserNo = useSelector((state) => state.member.userNo); //내 유저번호 뽑아오기(로그인한 유저) 
  const [isFollowerList,setIsFollowerList] = useState([]);
  const [isFollowingList,setIsFollowingList] = useState([]);

  const toFollowing = () => {
    setShowFollowStats(true);
  };
  const toFollower = () => {
    setShowFollowStats(false);
  };

  // 초기 데이터 세팅
  useEffect(() => {
    axios
      .all([
        axios.get('/follow/selectfollowerlist', {
          params: {
            toUserNo: userNo,
            myUserNo: myUserNo
          },
        }),
        axios.get('/follow/selectfollowinglist', {
          params: {
            fromUserNo: userNo,
            myUserNo: myUserNo
          },
        }),
        // axios.get('follow/isFollow', {
        //   params:{
        //     toUserNo:userNo,
        //     FromUserNo:myUserNo
        //   },
        // })
      ])
      .then(([resp1,resp2]) => {
          //resp1 -> 팔로워 리스트
          //resp2 -> 팔로잉 리스트
          const {resp1FollowerList,resp1IsFollowerList} = resp1.data;
          setFollowerList(resp1FollowerList);
          console.log(resp1FollowerList)
          setIsFollowerList(resp1IsFollowerList);

  
          const {resp2FollowingList,resp2IsFollowingList} = resp2.data;
        
          setFollowingList(resp2FollowingList);
          setIsFollowingList(resp2IsFollowingList);
          // 해당 유저넘버의 팔로잉 리스트와 팔로우 리스트들을 받아온다
          // 리스트들의 데이터 => 프로필, id, 닉네임
          // 나를 팔로워한 유저들의 정보를 가져올 때, 내가 그 유저를 팔로우 했는 지 그 여부도 알아야 한다
          // => axios요청을 한 번 더 보내도됨 근데 바로 가져올 수 있게 하는 걸 추천


        }).catch((error) => {
        console.log(error);
      });
  }, []);

  function follow (myUserNo,toUserNo) { //버튼 클릭시 insert, delete..
    axios({
      method:'post',
      url:'/follow/insertfollow',
      params:{
        toUserNo:toUserNo,
        fromUserNo:myUserNo
      }
    }).then((response)=>{

    }).catch((error)=>{
      console.log(error);
    })
  }
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
          {console.log(followerList)}
          {showFollowStats
            ? followingList && followingList.map((item,index) => {
                <FollowUser followUser={item} isFollow={isFollowingList[index]} follow={follow}/>;
              })
            : followerList.length>0 && followerList.map((item,index) => {
                <FollowUser followUser={item} isFollow={isFollowerList[index]} follow={follow} />;
              })}
        </ul>
      </div>
    </div>
  );
}

const FollowUser = (followUser,isFollow) => {
  return (
    
    <li className="user">
      <div className="profileLayout">
        <img className="profile" src={`/images/${followUser.sysName}.jpg`}/>
      </div>
      <div className="infoLayout">
        <div className="userNickName">{followUser.userNickName}</div>
        <div className="userId">{followUser.userId}</div>
      </div>
      <div className="btnLayout">
        {isFollow ? (
           <button className="followingBtn" onClick={()=>{follow(myUserNo,followUser.userNo)}}>팔로잉</button>
        ):(
          <button className="followBtn" onClick={()=>{follow(myUserNo,followUser.userNo)}}>팔로우</button>
        )  
      }
      </div>
    </li>
  );
};

export default FollowerList;
