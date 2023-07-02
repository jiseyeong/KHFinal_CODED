import React, { useRef, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

function SendBtn(props) {
    const Send = props.Send;
    const sendRef = useRef(null);

    const sendToServer = () => {
        Send(sendRef.current.value)
        // 입력 필드 초기화
        sendRef.current.value = '';
      };

      const sentToServerByEnter = (e) => {
        if(e.key === "Enter"){
            Send(sendRef.current.value)
            // 입력 필드 초기화
            sendRef.current.value = '';
        }
      }

    return (
        <SendBtnContainer >
            <SendChat type="text" ref={sendRef} onKeyUp={sentToServerByEnter}/>
            <SendButton onClick={(sendToServer) }>Send</SendButton>
        </SendBtnContainer>
    );
}

const SendBtnContainer  = styled.div`
height:8%; 
width:100%; 
display:flex;
`
const SendChat = styled.input`
    width:85%; 
    height:30px;
    margin-top:10px;
    font-size: 15px;
    color: #222222;
    border:1px solid lightgray;
    border-radius:5px;
    padding:10px;
    font-size:12px;
    &:focus{outline:none;}
`
const SendButton = styled.button`
margin-top:10px; width:13%; height:30px;
margin-left:auto; color:white;
border:none; background-color:#ff0066; border-radius:5px;
&:hover{
    cursor:pointer;
    opacity:70%;
}
`

export default SendBtn;
