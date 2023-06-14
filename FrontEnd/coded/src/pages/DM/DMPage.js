import React from 'react';
import style from './DMPage.module.css';
import { Stomp } from '@stomp/stompjs';

const DMPage = () => {
  const socket = new WebSocket('ws://192.168.120.57/chatchat');
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, function () {
    console.log('연결 성공');
  });

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
