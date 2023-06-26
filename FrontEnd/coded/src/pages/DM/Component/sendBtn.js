import React, { useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

function SendBtn() {
    const [inputValue, setInputValue] = useState('');
    const loginUserNo = useSelector((state) => state.member.userNo);
    const [RoomId, setRoomId] = useState(0);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const sendToServer = () => {
        // 서버로 데이터 전송
        axios
            .request({
                url: '/DM/send',
                method: 'post',
                params: {
                    roomId: RoomId,
                    userNo:loginUserNo,
                },
            })
            .then(resp => {
                console.log(resp.data);
            })
            .catch((error) => console.log(error));
    };

    const SendBtn = styled('div')`
    height:8%; width:100%; display:flex;
  .sendChat{
        width:85%; height:30px;
        margin-left:10px;
        margin-top:10px;
        font-size: 15px;
        color: #222222;
        border: none;
        background: lightgray;
        border-radius:5px;
        padding:10px;
    }
    .sendChat:focus{outline:none;}
    .send{margin-top:10px; margin-left:15px; width:50px; height:30px;
        border:none; background-color:lightgray; border-radius:5px;}
    .send:hover{cursor:pointer;}
  `

    return (
        <SendBtn>
            <input className='sendChat' type="text" value={inputValue} onChange={handleInputChange} />
            <button className='send' onClick={sendToServer}>Send</button>
        </SendBtn>
    );
}

export default SendBtn;
