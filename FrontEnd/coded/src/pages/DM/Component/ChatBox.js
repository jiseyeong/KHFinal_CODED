import { styled } from 'styled-components';
import MenuButton from './MenuButton';
import SendBtn from './sendBtn';
import React, { useEffect, useRef } from 'react';
import style from './ChatBox.module.scss';

const ChatBox = (props) => {
  const stompClient = props.stompClient;
  const setDMList = props.setDMList;
  const DMList = props.DMList;
  const loginUserNo = props.loginUserNo;
  const dmListRef = useRef(null);
  const DMRoom = props.DMRoom;
  const Send = props.Send;
  const disconnect = props.disconnect;

  useEffect(() => {
    scrollToBottom();
  }, [DMList]);

  const scrollToBottom = () => {
    if (dmListRef.current) {
      dmListRef.current.scrollTop = dmListRef.current.scrollHeight;
    }
  };

  return (
    <div className={style.chatBox}>
      <div className={style.chatNavBar}>
        <div className={style.otherInfo}>
          <a href={`/myPickPage?userNo=${DMRoom.userNo}`}>
            <div className={style.otherNickname}>{DMRoom.userNickname}</div>
          </a>
          <div className={style.otherId}>{DMRoom.userId}</div>
        </div>
        <MenuButton disconnect={disconnect}></MenuButton>
      </div>
      <div className={style.DMList} ref={dmListRef}>
        {DMList.length > 0 &&
          DMList.map((DMList, index) => {
            return (
              <div className={style.messageBox} key={index}>
                <div
                  className={
                    DMList.userNo === loginUserNo ? style.mySend : style.other
                  }
                >
                  <span
                    className={
                      DMList.userNo === loginUserNo ? null : style.otherPhoto
                    }
                  >
                    {DMRoom.sysName != null ? (
                      <img
                        src={`/images/${DMRoom.sysName}`}
                        className={style.profileImg}
                      ></img>
                    ) : (
                      <img
                        className={style.profileImg}
                        src={`/images/test.jpg`}
                      ></img>
                    )}
                  </span>
                  <span
                    className={
                      DMList.userNo === loginUserNo
                        ? style.myMsg
                        : style.otherMsg
                    }
                  >
                    {DMList.message}
                  </span>
                </div>
                {DMList.userNo === loginUserNo ? (
                  <div className={style.mySendTime}>
                    {DMList.formedWriteDate}
                  </div>
                ) : (
                  <div className={style.otherTime}>
                    {DMList.formedWriteDate}
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className={style.inputChat}>
        <SendBtn
          setDMList={setDMList}
          DMRoom={DMRoom}
          stompClient={stompClient}
          Send={Send}
        ></SendBtn>
      </div>
    </div>
  );
};

export default ChatBox;
