import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SockJsClient from 'react-stomp';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import ChatBox from './Component/ChatBox';
import SearchMember from './Component/SearchMember';
import ListElement from './Component/ListElement';

function DMList() {
  const accessToken = useSelector((state) => state.member.access);
  const loginUserNo = useSelector((state) => state.member.userNo);
  const [DMRoomList, setDMRoomList] = useState([]); //채팅중인 모든 방 정보
  const [SearchMemberList, setSearchMemberList] = useState([]);
  const [DMRoom, setDMRoom] = useState({}); // 클릭한 한사람의 정보
  const [DMList, setDMList] = useState([]); // 클릭한 사람과의 대화 내용
  const [RoomId, setRoomId] = useState(0); // 클릭한 사람과의 방 번호

  useEffect(() => {
    if (loginUserNo > 0) {
      axios({
        method: 'get',
        url: '/DM/selectChatList',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          userNo: loginUserNo,
        },
      })
        .then((resp) => {
          console.log(resp);
          setDMRoomList(resp.data);
        })
        .catch((error) => console.log(error));
    }
  }, [loginUserNo]);

  // const handleClick = (RoomId) => {
  //     setRoomId(RoomId);
  //     console.log(RoomId)
  // }

  useEffect(() => {
    axios
      .request({
        url: '/DM/selectDMbyRoomid',
        method: 'get',
        params: {
          roomId: RoomId,
        },
      })
      .then((resp) => {
        setDMList(resp.data);
      })
      .catch((error) => console.log(error));
  }, [RoomId]);

  const DMListOuter = styled('div')`
    padding-top: 10px;
    margin: auto;
    width: 1000px;
    height: 600px;
    display: flex;

    .chatBox {
      height: 100%;
      width: 60%;
      padding: 5px;
    }
    .List {
      height: 100%;
      width: 40%;
      border-radius: 20px;
      padding: 5px;
    }
    .searchBox {
      height: 10%;
      width: 100%;
      background-color: lightgray;
      border-radius: 5px;
      margin-bottom: 10px;
      padding-top: 15px;
    }
    .chatList {
      height: 88%;
      width: 100%;
      background-color: lightgray;
      border-radius: 5px;
    }
  `;

  return (
    <DMListOuter>
      <div className="chatBox">
        <ChatBox
          DMList={DMList}
          loginUserNo={loginUserNo}
          DMRoomList={DMRoomList}
          DMRoom={DMRoom}
        ></ChatBox>
      </div>
      <div className="List">
        <div className="searchBox">
          <SearchMember></SearchMember>
          {/* <input className='search' type='text'></input> */}
        </div>
        <div className="chatList">
          {DMRoomList.map((dto) => (
            <ListElement
              room={dto}
              setRoomId={setRoomId}
              setDMRoom={setDMRoom}
            />
          ))}
        </div>
      </div>
    </DMListOuter>
  );
}

export default DMList;
