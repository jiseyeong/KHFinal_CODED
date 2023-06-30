import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import ChatBox from './Component/ChatBox';
import SearchMember from './Component/SearchMember';
import ListElement from './Component/ListElement';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';



function DMList() {
  const accessToken = useSelector((state) => state.member.access);
  const loginUserNo = useSelector((state) => state.member.userNo);
  const [DMRoomList, setDMRoomList] = useState([]); //채팅중인 모든 방 정보
  const [DMRoom, setDMRoom] = useState({}); // 클릭한 한사람의 정보
  const [DMList, setDMList] = useState([]); // 클릭한 사람과의 대화 내용
  const [Message, setMessage] = useState(); // 작성한 DM 내용

  const [stompClient, setStompClient] = useState();
  
  // DMList 페이지에 올 시 웹소켓 연결을 준비하여 STOMP를 연결하는 코드
  useEffect(() => {
    const socketUrl = `http://192.168.50.218:9999/ws`;
    const socket = new SockJS(socketUrl);
    const client = Stomp.over(socket);
    setStompClient(client);
    console.log("웹소켓 준비")

    client.connect({}, () => {
      console.log('STOMP 연결 성공');
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);


  

  // stompClient 와 DMRoom의 roomId 를 확인하여 둘다 정상존재할 시 roomId를 구독을 수행하는 코드 
  // stompClient 와 DMRoom의 roomId 가 변경될 때마다 데이터를 얻어와 새로 구독을 시행함
  // ListElement가 언마운트 될 시 구독해지하여 채팅을 받지않기로 함.
  useEffect(() => {
    if (stompClient && DMRoom.roomId) {
      const subscription = stompClient.subscribe(
        `/topic/${DMRoom.roomId}`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log(Message)
          setDMList((prevDMList) => [...prevDMList, receivedMessage]);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, DMRoom.roomId]);

  //메세지 보내기
  const Send = () => {
    const currentTime = new Date().toLocaleString();
    {console.log(currentTime);}

    stompClient.send(

      '/app/chat/'+DMRoom.roomId,
      {
          roomId: DMRoom.roomId,
          userNo: loginUserNo,
          time: currentTime
      }
      ,Message
  )
  }


  const handleListElementClick = (room) => {
    setDMRoom(room);
  };

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
          setDMRoomList(resp.data);
        })
        .catch((error) => console.log(error));
    }
  }, [loginUserNo]);

  useEffect(() => {
    if (accessToken) {
      axios
        .request({
          url: '/DM/selectDMbyRoomid',
          method: 'get',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            roomId: DMRoom.roomId,
          },
        })
        .then((resp) => {
          setDMList(resp.data);
        })
        .catch((error) => console.log(error));
    }
  }, [DMRoom.roomId]);


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
          stompClient={stompClient}
          DMList={DMList}
          setDMList={setDMList}
          loginUserNo={loginUserNo}
          DMRoomList={DMRoomList}
          DMRoom={DMRoom}
          Send={Send}
          setMessage={setMessage}
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
              key={dto.roomId}
              room={dto}
              setDMRoom={handleListElementClick}
            />
          ))}
        </div>
      </div>
    </DMListOuter>
  );
}

export default DMList;