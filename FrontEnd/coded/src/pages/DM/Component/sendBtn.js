import React, { useRef, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

function SendBtn() {
    const loginUserNo = useSelector((state) => state.member.userNo);
    const [RoomId, setRoomId] = useState(0);

    const sendRef = useRef(null);

    const sendToServer = () => {
        // 서버로 데이터 전송
        axios
            .request({
                url: '/app/${roomId}',
                method: 'post',
                params: {
                    roomId: RoomId,
                    userNo: loginUserNo,
                    message: sendRef.current.value
                },
            })
            .then(resp => {

            })
            .catch((error) => console.log(error));
    };

    const SendBtn = styled.div`
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

    const Send = styled.button`
    margin-top:10px; margin-left:15px; width:50px; height:30px;
    border:none; background-color:lightgray; border-radius:5px;
    &:hover{cursor:pointer;}
    `

    return (
        <SendBtn>
            <SendChat type="text" ref={sendRef}/>
            <Send onClick={sendToServer}>Send</Send>
        </SendBtn>
    );
}

export default SendBtn;
