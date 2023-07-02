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
    height: 80px;
    width: 100%;
    padding: 5px;
    display: flex;
  }
  .RoomElement:hover {
    cursor: pointer;
    background-color: lightgray;
  }
  .profilePic {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profileImg {
    width: 60px;
    height: 60px;
    border: 1px solid #d3d3d3;
    border-radius: 30px;
  }
  .profile {
    width: 75%;
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
    height: 45%;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .roomUserId {
    width: 50%;
    height: 30%;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
`;

export default ListElement;
