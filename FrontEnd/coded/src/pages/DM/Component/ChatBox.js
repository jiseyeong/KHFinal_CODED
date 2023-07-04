import { styled } from 'styled-components';
import MenuButton from './MenuButton';
import SendBtn from './sendBtn';
import React, { useEffect, useRef, useState } from 'react';
import style from './ChatBox.module.scss';
import ChatImages from './ChatImages';
import Modal from 'react-modal';

const ChatBox = (props) => {
  const stompClient = props.stompClient;
  const setDMList = props.setDMList;
  const DMList = props.DMList;
  const loginUserNo = props.loginUserNo;
  const dmListRef = useRef(null);
  const DMRoom = props.DMRoom;
  const Send = props.Send;
  const disconnect = props.disconnect;
  const imageSend = props.imageSend;
  const [viewImage, setViewImage] = useState(false);
  const [image, setImage] = useState();

  const viewImageModalStyle = {
    overlay: {
      zIndex: 101,
    },
    content: {
      margin: 'auto',
      width: '650px',
      height: '650px',
      display: 'flex',
      justifyContent: 'cneter',
      alignItems: 'center',
      backgroundColor: 'lightgray',
    },
  };

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
          DMList.map((DMDto, index) => {
            return (
              <div className={style.messageBox} key={index}>
                <div
                  className={
                    DMDto.userNo === loginUserNo ? style.mySend : style.other
                  }
                >
                  <span
                    className={
                      DMDto.userNo === loginUserNo ? null : style.otherPhoto
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
                      DMDto.userNo === loginUserNo
                        ? style.myMsg
                        : style.otherMsg
                    }
                  >
                    {/* message에 base64가 들어있거나 단순 문자열이 들어있는 경우를 구분 */}
                    {DMDto.message}
                    <ChatImages
                      messageId={DMDto.messageId}
                      setViewImage={setViewImage}
                      setImage={setImage}
                    />
                  </span>
                </div>
                {DMDto.userNo === loginUserNo ? (
                  <div className={style.mySendTime}>
                    {DMDto.formedWriteDate}
                  </div>
                ) : (
                  <div className={style.otherTime}>{DMDto.formedWriteDate}</div>
                )}
              </div>
            );
          })}
      </div>
      <div className={style.inputChat}>
        <SendBtn
          DMRoom={DMRoom}
          stompClient={stompClient}
          Send={Send}
          imageSend={imageSend}
        ></SendBtn>
      </div>
      <Modal isOpen={viewImage} style={viewImageModalStyle} ariaHideApp={false}>
        <img
          style={{ width: '600px', height: '600px', objectFit: 'contain' }}
          onClick={() => {
            setViewImage(false);
          }}
          src={`/images/${image}`}
        />
      </Modal>
    </div>
  );
};

export default ChatBox;
