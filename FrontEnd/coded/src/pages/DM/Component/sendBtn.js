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

    return (
        <SendBtnContainer >
            <SendChat type="text" ref={sendRef}/>
            <SendButton onClick={(sendToServer) }>Send</SendButton>
        </SendBtnContainer>
    );
}

const SendBtnContainer  = styled.div`
height:8%; width:100%; display:flex;
`
const SendChat = styled.input`
width:85%; height:30px;
    margin-left:10px;
    margin-top:10px;
    font-size: 15px;
    color: #222222;
    border: none;
    background: lightgray;
    border-radius:5px;
    padding:10px;
    &:focus{outline:none;}
`
const SendButton = styled.button`
margin-top:10px; margin-left:15px; width:50px; height:30px;
border:none; background-color:lightgray; border-radius:5px;
&:hover{cursor:pointer;}
`

export default SendBtn;
