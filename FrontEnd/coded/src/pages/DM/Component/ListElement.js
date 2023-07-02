import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

const ListElement = (props) => {
  const room = props.room;
  const { setDMRoom } = props;

  const handleDMRoom = () => {
    setDMRoom(room);
  };

  return (
    <RoomElement>
      <div className="RoomElement" onClick={handleDMRoom}>
        <div className="profilePic">
          {room.sysName != null ? (
            <img className="profileImg" src={`/images/${room.sysName}`}></img>
          ) : (
            <img className="profileImg" src={`/images/test.jpg`}></img>
          )}
        </div>
        <div className="profile">
          <div className="roomId">{room.userNo}</div>
          <div className="roomUserNickname">{room.userNickname}</div>
          <div className="roomUserId">{room.userId}</div>
        </div>
      </div>
    </RoomElement>
  );
};

const RoomElement = styled.div`
  .RoomElement {
    height: 55px;
    width: 100%;
    padding: 5px;
    display: flex;
    margin-bottom:10px;
  }
  .RoomElement:hover {
    cursor: pointer;
    background-color:rgb(240,240,240);
  }
  .profilePic {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profileImg {
    width: 45px;
    height: 45px;
    border: 1px solid #d3d3d3;
    border-radius: 30px;
  }
  .profile {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left : 10px;
  }
  .roomId {
    display: none;
    padding: 5px;
  }
  .roomUserNickname {
    width: 50%;
    height: 50%;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    line-height:20px;
  }
  .roomUserId {
    width: 50%;
    height: 50%;
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height:20px;
  }
`;

export default ListElement;
