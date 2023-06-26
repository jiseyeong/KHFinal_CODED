import { styled } from "styled-components";


const ListElement = (props) => {

    const room = props.room;

    const RoomElement = styled('div')`

        .RoomElement{height:80px; width:400px; padding:5px; display:flex;}
        .RoomElement:hover{cursor:pointer;}
            .profilePic{width:25%; height:100%; border:1px solid black; }
            .profile{width:75%; height:100%; border:1px solid black; }
                .roomId{display:none;}
                .roomUserId{width:50%; height:50%;}
                .roomUserNickname{width:50%; height:50%;}

    `

    return (
        <RoomElement>
        <div className='RoomElement' onClick={() => { props.setRoomId(room.roomid); }}>
            <div className='profilePic'>
                {room.photoid}
                {room.oriName}
                {room.sysName}
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