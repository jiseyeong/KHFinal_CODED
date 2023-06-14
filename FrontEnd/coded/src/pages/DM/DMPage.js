import React from 'react';
import style from './DMPage.module.css';
import { Stomp } from '@stomp/stompjs';

const DMPage = () => {
  const socket = new WebSocket('ws://192.168.50.221/chatchat');
  const stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    function () {
      console.log('연결 성공');
      stompClient.subscribe('/topic/dialog', function (message) {
        console.log('일반 메세지'); // message
      });
    },
    function (error) {
      console.log('연결 실패');
    },
  );

  return (
    <div className={style.chatLayout}>
      <div className={style.chatBox}>
        <div className={style.messageArea}></div>
        <div className={style.inputArea}>
          <input
            type="text"
            className={style.chat}
            placeholder="메세지를 입력해주세요"
          />
        </div>
      </div>
    </div>
  );
};

export default DMPage;
