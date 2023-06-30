import { useEffect, useState } from "react";

import { styled } from "styled-components";


const ListElement = (props) => {
    const room = props.room;
    const { setDMRoom } = props;


    const handleDMRoom = () => {
        setDMRoom(room);
    };


    const RoomElement = styled('div')`

      .RoomElement{height:80px; width:100%; padding:5px; display:flex;}
      .RoomElement:hover{cursor:pointer; background-color:white;}
          .profilePic{width:25%; height:100%; display:flex; justify-content:center;}
              .profileImg{height:100%; }
          .profile{width:75%; height:100%;}
              .roomId{display:none; padding:5px;}
              .roomUserId{width:50%; height:50%; padding:5px;}
              .roomUserNickname{width:50%; height:50%; padding:5px;}
    `

    return (
        <RoomElement>
            <div className='RoomElement' onClick={handleDMRoom}>
                <div className='profilePic'>
                    {room.sysName != null ? (
                        <img
                            src={`/images/${room.sysName}`}
                        ></img>
                    ) : (
                        <img className="profileImg"
                            src={`/images/test.jpg`}
                        ></img>)}
                </div>
                <div className='profile'>
                    <div className='roomId'>
                        {room.userNo}
                    </div>
                    <div className='roomUserId'>
                        {room.userId}
                    </div>
                    <div className='roomUserNickname'>
                        {room.userNickname}
                    </div>
                </div>
            </div>
        </RoomElement>
    );
}

export default ListElement;