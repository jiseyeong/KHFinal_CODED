import axios from 'axios';
import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import { useSelector } from 'react-redux';

const SOCKET_URL = 'http://192.168.50.218:9999/ws-message';

const App = () => {
  const [message, setMessage] = useState('You server message here.');
  const accessToken = useSelector((state) => state.member.access);

  // axios({
  //   method: 'get',
  //   url: '/auth/userDTO',
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   }
  // })


  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
  }

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />


      <div>{message}</div>
    </div>
  );
}

export default App;