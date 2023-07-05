import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ChatForm() {
  const accessToken = useSelector((state) => state.member.access);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [cpage, setCpage] = useState(1);
  const [naviList, setNaviList] = useState([]);
  const [needPrev, setNeedPrev] = useState(false);
  const [needNext, setNeedNext] = useState(false);

  const [dmList, setDMList] = useState([]);
  const [photoLists, setPhotoLists] = useState([]);

  const type = useRef('none');
  const selectBoxRef = useRef(null);
  const inputRef = useRef(null);
  const numberRegex = /^[0-9]+$/;
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      updateRoomList();
    }
  }, [accessToken]);

  function updateRoomList() {
    if (accessToken) {
      if (type.current === 'none') {
        axios({
          method: 'get',
          url: '/DM/naviInfo',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            cpage: cpage,
          },
        })
          .then((response) => {
            setNaviList(response.data.naviList);
            setNeedPrev(response.data.needPrev);
            setNeedNext(response.data.needNext);
          })
          .catch((error) => {
            if (error.request.status === 403) {
              console.log('Forbiddened. 권한이 없습니다.');
              navigate('/');
            } else if (error.request.status === 400) {
              console.log('badRequest. : ' + error.response.data);
            } else {
              console.log(error);
            }
          });
        axios({
          method: 'get',
          url: '/DM/pagingList',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            cpage: cpage,
          },
        })
          .then((response) => {
            if (response.data) {
              setChatRoomList(response.data);
            } else {
              setChatRoomList([]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (type.current === 'userNo') {
        axios({
          method: 'get',
          url: '/DM/naviInfo/userNo',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            cpage: cpage,
            userNo: inputRef.current.value,
          },
        })
          .then((response) => {
            setNaviList(response.data.naviList);
            setNeedPrev(response.data.needPrev);
            setNeedNext(response.data.needNext);
          })
          .catch((error) => {
            if (error.request.status === 403) {
              console.log('Forbiddened. 권한이 없습니다.');
              navigate('/');
            } else if (error.request.status === 400) {
              console.log('badRequest. : ' + error.response.data);
            } else {
              console.log(error);
            }
          });
        axios({
          method: 'get',
          url: '/DM/pagingList/userNo',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            cpage: cpage,
            userNo: inputRef.current.value,
          },
        })
          .then((response) => {
            if (response.data) {
              setChatRoomList(response.data);
            } else {
              setChatRoomList([]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (type.current === 'roomId') {
        axios({
          method: 'get',
          url: '/DM/getRoomByRoomId',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            cpage: cpage,
            roomId: inputRef.current.value,
          },
        })
          .then((response) => {
            if (response.data) {
              setChatRoomList([response.data]);
              setNaviList([1]);
              setNeedPrev(false);
              setNeedNext(false);
            } else {
              setChatRoomList([]);
              setNaviList([]);
              setNeedPrev(false);
              setNeedNext(false);
            }
          })
          .catch((error) => {
            if (error.request.status === 403) {
              console.log('Forbiddened. 권한이 없습니다.');
              navigate('/');
            } else if (error.request.status === 400) {
              console.log('badRequest. : ' + error.response.data);
            } else {
              console.log(error);
            }
          });
      }
    }
  }

  function handleSearchSelect() {
    if (selectBoxRef.current.value === 'RoomID') {
      type.current = 'roomId';
    } else if (selectBoxRef.current.value === 'UserNo') {
      type.current = 'userNo';
    } else {
      type.current = 'none';
    }
  }

  function handleSearch() {
    if (numberRegex.test(inputRef.current.value)) {
      handleSearchSelect();
      setCpage(1);
      updateRoomList();
    } else {
      alert('해당 요소는 숫자만으로 검색 가능합니다.');
    }
  }

  function handleCpage(index) {
    setCpage(index);
  }

  function roomDelete(roomId) {
    if (accessToken) {
      axios({
        method: 'delete',
        url: '/DM/deleteRoom',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          roomId: roomId,
        },
      })
        .then((response) => {
          updateRoomList();
        })
        .catch((error) => {
          if (error.request.status === 403) {
            console.log('Forbiddened. 권한이 없습니다.');
            navigate('/');
          } else if (error.request.status === 400) {
            console.log('badRequest. : ' + error.response.data);
          } else {
            console.log(error);
          }
        });
    }
  }

  function updateDMList(roomId) {
    axios({
      method: 'get',
      url: '/DM/selectDMbyRoomid',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        roomId: roomId,
      },
    })
      .then((response) => {
        setDMList([...response.data]);
        setPhotoLists([]);
        response.data.forEach((item, index) => {
          axios({
            method: 'get',
            url: '/photo/dm',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              messageId: item.messageId,
            },
          })
            .then((response2) => {
              setPhotoLists((prev) => {
                return [...prev, { index: index, list: [...response2.data] }];
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log(dmList);
  }, [dmList]);
  return (
    <div>
      <table
        border={1}
        align="center"
        style={{ width: '100%', marginBottom: '50px' }}
      >
        <thead>
          <tr>
            <th colSpan={3}>Chat Room List</th>
          </tr>
          <tr>
            <th>RoomID</th>
            <th>UserNums</th>
            <th>Delete Button</th>
          </tr>
        </thead>
        <tbody>
          {chatRoomList.map((item, index) => {
            return (
              <tr key={item.room.roomId}>
                <td
                  onClick={() => {
                    updateDMList(item.room.roomId);
                  }}
                >
                  {item.room.roomId}
                </td>
                <td>
                  {item.userList.map((item2, index2) => {
                    return item2.userNo + ',';
                  })}
                </td>
                <td>
                  <button
                    onClick={() => {
                      roomDelete(item.room.roomId);
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td align="center" colSpan={3}>
              {needPrev && (
                <button
                  onClick={() => {
                    handleCpage(naviList[0] - 1);
                  }}
                >
                  prev
                </button>
              )}
              {naviList.map((item, index) => {
                return (
                  <button
                    key={item}
                    onClick={() => {
                      handleCpage(item);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
              {needNext && (
                <button
                  onClick={() => {
                    handleCpage(naviList[naviList.length - 1] + 1);
                  }}
                >
                  next
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td align="center" colSpan={3}>
              <select ref={selectBoxRef} onChange={handleSearchSelect}>
                <option value="RoomID">RoomID</option>
                <option value="UserNo">UserNo</option>
              </select>
              <input type="text" ref={inputRef}></input>
              <button onClick={handleSearch}>검색</button>
              <button
                onClick={() => {
                  type.current = 'none';
                  updateRoomList();
                }}
              >
                검색 취소
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        border={1}
        align="center"
        style={{ width: '100%', height: '1000px', overflowY: 'scroll' }}
      >
        <thead>
          <tr>
            <th colSpan={6}>Current Chat Room Message List</th>
          </tr>
          <tr>
            <th width="5%">id</th>
            <th width="5%">write user</th>
            <th width="40%">Message</th>
            <th width="40%">Photo</th>
            <th width="5%">Write Date</th>
            <th width="5%">isDelete</th>
          </tr>
        </thead>
        <tbody>
          {dmList.map((item, i) => {
            return (
              <tr key={item.messageId}>
                <td align="center">{item.messageId}</td>
                <td align="center">{item.userNo}</td>
                <td style={{ wordBreak: 'break-all' }}>{item.message}</td>
                <td align="center">
                  {photoLists.map((item2) => {
                    return item2.index === i ? (
                      <>
                        {item2.list.map((item3) => {
                          return (
                            <image
                              src={`/images/${item3.sysName}`}
                              alt="ChatImg"
                              Style={{ width: '100%' }}
                            />
                          );
                        })}
                      </>
                    ) : null;
                  })}
                </td>
                <td align="center">{item.formedWriteDate}</td>
                <td align="center">{item.isDelete}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ChatForm;
