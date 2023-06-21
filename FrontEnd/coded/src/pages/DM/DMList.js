import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SockJsClient from 'react-stomp';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';


function DMList() {

    const accessToken = useSelector((state) => state.member.access);
    const loginUserNo = useSelector((state) => state.member.userNo);
    const [chatList, setChatList] = useState();

    useEffect(()=>{
        axios({
            method: 'GET',
            url: '/DM/selectChatList/',
            params: {
                userNo: loginUserNo,
            },
        })
            .then((resp) => {
                
              
            })
            .catch((error) => console.log(error));
    },[loginUserNo])
  
    const DMListOuter = styled('div')`
    margin:auto;
    border: 1px solid black;
    width:1000px;
    height:600px;
    

    >div{border: 1px solid black; box-sizing: border-box; 
        padding: 10px;}

    .chatBox{height:100%; width:60%; float:left;}

        .chat{height:80%; width:100%; background-color: lightgray;}

        .inputChat{height:8%; width:100%; background-color: lightgray;}

            .sendChat{
                width:90%; height:30px;
                margin-left:28px;
                font-size: 15px;
                color: #222222;
                border: none;
                background: white;
                border-radius:5px;
                padding:10px;
            }
            .sendChat:focus{outline:none;}

    .List{height: 100%; width:40%; float:left;}

        .chatNavBar{height:10%; width:100%; background-color: lightgray;
        margin-bottom:10px;}
   
        .searchBox{height:10%; width:100%; background-color: lightgray;
        margin-bottom:10px;}
            
            .search{margin-top:14px; width:90%; height:30px;
                margin-left:20px;
                font-size: 15px;
                color: #222222;
                border: none;
                border-bottom: solid #aaaaaa 2px;
                background: none;
                padding:10px;
            }
            .search:focus{outline:none;}
   
        .chatList{height:88%; width:100%; background-color: lightgray;}
    `

    return (
        <DMListOuter>
            <div className='chatBox'>
                <div className='chatNavBar'></div>
                <div className='chat'></div>
                <div className='inputChat'>
                    <input className='sendChat' type='text'></input>
                </div>
            </div>
            <div className='List'>
                <div className='searchBox'>
                    <input className='search' type='text'></input>
                </div>
                <div className='chatList'>
                    
                </div>
            </div>
        </DMListOuter>
    );
}
export default DMList;