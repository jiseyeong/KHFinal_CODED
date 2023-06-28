import { useState } from "react";
import SockJS from "sockjs-client";
import { styled } from "styled-components";


const ListElement = (props) => {
    const room = props.room;
    // console.log(room)
    const { setRoomId, setDMRoom } = props;
    const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
    const [subscription, setSubscription] = useState('');
    let stompClient = null; // stompClient 변수 선언

    const connectWebSocket = () => {
        const socketUrl = `http://192.168.50.218:9999/ws`;
        const socket = new SockJS(socketUrl);
        stompClient = Stomp.over(socket);
    
        stompClient.connect({}, () => {
          setIsWebSocketConnected(true);
          console.log('WebSocket connected!');
    
          // Subscribe to the topic
          const topic = `/topic/${room.roomid}`;
          const newSubscription = stompClient.subscribe(topic, (message) => {
            // Handle received messages
            console.log('Received message:', message);
          });
          setSubscription(newSubscription);
        });
      };

        const disconnectWebSocket = () => {
            if (isWebSocketConnected) {
                stompClient.disconnect(() => {
                    setIsWebSocketConnected(false);
                    console.log('WebSocket disconnected!');

                });
            }
        };

        const handleDMRoom = () => {
            setRoomId(room.roomid);
            setDMRoom(room);

            if (isWebSocketConnected) {
                disconnectWebSocket();
            } else {
                connectWebSocket();
            }
        };


        const RoomElement = styled('div')`

      .RoomElement{height:80px; width:100%; padding:5px; display:flex;}
      .RoomElement:hover{cursor:pointer; background-color:white;}
          .profilePic{width:25%; height:100%; display:flex; justify-content:center;}
              .profileImg{height:100%; }
          .profile{width:75%; height:100%;}
              .roomId{display:none; padding:5px;}
              .roomUserId{width:50%; height:50%; padding:5px;}
              .roomUserNickname{width:50%; height:50%; padding:5px;}
    `

        return (
            <RoomElement>
                <div className='RoomElement' onClick={handleDMRoom}>
                    <div className='profilePic'>
                        {room.sysName != null ? (
                            <img
                                src={`/images/${room.sysName}`}
                            ></img>
                        ) : (
                            <img className="profileImg"
                                src={`/images/test.jpg`}
                            ></img>)}
                    </div>
                    <div className='profile'>
                        <div className='roomId'>
                            {room.userNo}
                        </div>
                        <div className='roomUserId'>
                            {room.userId}
                        </div>
                        <div className='roomUserNickname'>
                            {room.userNickname}
                        </div>
                    </div>
                </div>
            </RoomElement>
        );
    }

    export default ListElement;