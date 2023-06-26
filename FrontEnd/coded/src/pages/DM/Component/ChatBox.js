import { styled } from "styled-components";
import MenuButton from "./MenuButton";
import SendBtn from "./sendBtn";
import React, { useEffect, useRef } from 'react';


const ChatBox = (props) => {

    const DMList = props.DMList;
    const DMRoomList = props.DMRoomList;
    const loginUserNo = props.loginUserNo;
    const dmListRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [DMList]);

    const scrollToBottom = () => {
        if (dmListRef.current) {
          dmListRef.current.scrollTop = dmListRef.current.scrollHeight;
        }
      };

    const ChatBox = styled('div')`
    width:100%; height:100%; 

    .chatNavBar{height:10%; width:100%; background-color: lightgray;
        margin-bottom:10px; border: 1px solid black; display:flex;}
        .otherPhoto{height:100%; width:15%; border:1px solid black;}
        .otherInfo{height:100%; width:70%;}
            .otherId{height:50%; width:100%; border:1px solid black;}
            .otherNickname{height:50%; width:100%; border: 1px solid black;}
    .DMList{height:80%; width:100%; background-color: lightgray; display: flex;
        flex-flow: wrap; overflow-wrap: break-word; overflow: overlay}   

        .msg{}

        .mySend{width:100%; text-align:right; padding:5px; margin-bottom:10px;}
        .mySendTime{font-size:12px;}
        .other{width:100%; text-align:left; padding:5px; margin-bottom:10px;}
        .otherTime{font-size:12px;}
    `

    return (
        <ChatBox>
            <div className='chatNavBar'>
                <div className="otherPhoto">{DMRoomList.photoId}{DMRoomList.oriName}{DMRoomList.sysName}</div>
                <div className="otherInfo">
                    <div className="otherId">{DMRoomList.userId}</div>
                    <div className="otherNickname">{DMRoomList.userNickname}</div>
                </div>
                <MenuButton></MenuButton>
            </div>
            <div className='DMList' ref={dmListRef}>
                {DMList.map(DMList => {
                    return (
                        <div className={DMList.userNo == loginUserNo ? 'mySend' : 'other'}>
                            <div className="msg">
                                {DMList.message}
                            </div>
                            {DMList.userNo == loginUserNo && (<div className='mySendTime'>{DMList.formedWriteDate}</div>)}
                            {!(DMList.userNo == loginUserNo) && (<div className='otherTime'>{DMList.formedWriteDate}</div>)}
                        </div>
                    );
                })}
                <div ref={dmListRef}></div>
            </div>
            <div className='inputChat'>
                <SendBtn></SendBtn>
            </div>
        </ChatBox>
    );
}

export default ChatBox;