import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import ChatBox from './Component/ChatBox';
import SearchMember from './Component/SearchMember';
import ListElement from './Component/ListElement';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { setDMNONE } from '../../modules/Redux/DMSetting';




function DMList() {
  const accessToken = useSelector((state) => state.member.access);
  const loginUserNo = useSelector((state) => state.member.userNo);
  const settingChatUserNo = useSelector((state)=> state.dmSetting.userNo); // 마이픽에서 넘어올 시 userNo
  const settingIsUserAlert = useSelector((state)=> state.dmSetting.isUserAlert)
  const [DMRoomList, setDMRoomList] = useState([]); //채팅중인 모든 방 정보
  const [DMRoom, setDMRoom] = useState({}); // 클릭한 한사람의 정보
  const [DMList, setDMList] = useState([]); // 클릭한 사람과의 대화 내용

  const [stompClient, setStompClient] = useState();
  
  const dispatch = useDispatch();
  const onSetDMNONE = useCallback(()=> dispatch(setDMNONE(), [dispatch]))


  // DMList 페이지에 올 시 웹소켓 연결을 준비하여 STOMP를 연결하는 코드
  useEffect(() => {
    const socketUrl = `http://localhost:9999/ws`;
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
        (receivedMessage) => {
          // console.log(receivedMessage.body);
          setDMList((prev) => [...prev, JSON.parse(receivedMessage.body)]);
        },{}
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, DMRoom.roomId]);


  // More버튼을 통한 나가기 버튼 클릭시 채팅방 나가기
  const disconnect =()=> {
    if (stompClient && DMRoom.roomId) {
      axios({
        method: 'delete',
        url: '/DM/deleteUserDMRoomUser',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          userNo: loginUserNo,
          roomId: DMRoom.roomId
        },
      })
        .then(() => {
          onSetDMNONE();
          updateRoomList();
          updateDMList();
        })
        .catch((error) => console.log(error));
    }
  }

  // 검색결과에서 클릭한 사람과 채팅 시작
  
  useEffect(()=>{
    if(settingChatUserNo){
      axios({
        method: 'get',
        url: '/DM/createRoom',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          loginUserNo: loginUserNo,
          clickuserNo: settingChatUserNo
        },
      })
        .then((resp) => {
          console.log(resp.data)
          if (resp.data!==''){
          
          setDMRoomList(resp.data);
          }else{
            if(settingIsUserAlert){
            alert("이미 채팅중인 유저입니다.")
            }
          }
        })
        .catch((error) => console.log(error));
      }
  },[settingChatUserNo])



  //sendBtn 컴포넌트로 넘겨주어 send버튼 클릭시 메세지를 보내고 채팅내역에 추가
  const Send = (message) => {
    const currentTime = new Date().getTime();
    {console.log(currentTime);}
    console.log(message);
    stompClient.send('/app/chat/'+DMRoom.roomId,{},
    JSON.stringify(
      {
        userNo:loginUserNo,
        message:message,
        writeDate : currentTime
      }
    ))
  }

  // ListElement(채팅목록 클릭시 채팅창에 유저정보 출력)
  const handleListElementClick = (room) => {
    setDMRoom(room);
  };


  // 로그인UserNo를 통한 채팅목록 불러오기
  const updateRoomList = () =>{
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
  }

  useEffect(() => {
    updateRoomList()
  }, [loginUserNo]);
  

  //ListElement(채팅목록 클릭시 DB를 통한 DM내역 불러오기)
  const updateDMList = () => {
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
}

  useEffect(() => {
    updateDMList();
  }, [DMRoom.roomId]);


  

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
          disconnect={disconnect}
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

const DMListOuter = styled.div`
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
      background-color: white;
      border: 1px solid lightgray;
      border-radius: 5px;
      overflow-wrap: break-word; 
      overflow: overlay;
      padding:1rem;
    }
  `;

export default DMList;