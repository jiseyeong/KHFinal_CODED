import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from './SearchMember.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDMSETUSER } from '../../../modules/Redux/DMSetting';

// UserList Li
const UserList = ({
  userNo,
  userId,
  userNickName,
  sysName,
  setIsAutoCompleteOpen,
}) => {
  const dispatch = useDispatch();
  const onSetDMSETUSER = useCallback((userNo) =>
    dispatch(setDMSETUSER(userNo, true), [dispatch]),
  );

  return (
    <li
      className={styled.userList}
      onClick={() => {
        onSetDMSETUSER(userNo);
        setIsAutoCompleteOpen(false);
      }}
    >
      <a href="#">
        <div className={styled.userLeftSide}>
          {sysName !== null ? (
            <img src={`/images/${sysName}`}></img>
          ) : (
            <img className={styled.thumbNail} src={`/images/test.jpg`}></img>
          )}
        </div>
        <div className={styled.userMiddleSide1}>{userNickName}</div>
        <div className={styled.userMiddleSide2}>{userId}</div>
      </a>
    </li>
  );
};

const SearchBox = (props) => {
  const [searchData, setSearchData] = useState([]);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [completedData, setCompletedData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const startChat = props.startChat;
  const autoSearchRef = useRef();

  const toSearch = useNavigate();

  // 검색 자동완성 출력 개수
  const [searchCount, setSearchCount] = useState(5);

  // 검색 전 자동완성 시 보여줄 해시태그 데이터를 가져옴
  useEffect(() => {
    axios
      .request({
        url: '/auth/selectUserListWithProfile',
        method: 'GET',
      })
      .then((resp) => {
        setSearchData(() => {
          return resp.data;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 검색 자동완성 바깥 범위 (body) 클릭 시 자동완성 폼 사라짐`
  useEffect(() => {
    const handleCheck = (e) => {
      if (autoSearchRef.current && !autoSearchRef.current.contains(e.target)) {
        setIsAutoCompleteOpen(false);
      }
    };
    document.body.addEventListener('click', handleCheck);

    return () => {
      document.body.removeEventListener('click', handleCheck);
    };
  }, []);

  // 검색 입력 시
  const searchboxInput = (e) => {
    setIsAutoCompleteOpen(true);

    let input = e.target.value;

    const temp = [];
    searchData.forEach((item, index) => {
      if (temp.length == searchCount) {
        return;
      }
      if (item.userId !== undefined) {
        if (
          item.userId.indexOf(input) !== -1 ||
          item.userNickName.indexOf(input) !== -1
        ) {
          temp.push(item);
        }
      }
    });

    setSearchInput(input);
    setCompletedData(temp);
  };

  return (
    <form className={styled.searchForm} ref={autoSearchRef}>
      <input
        className={styled.searchmember}
        id="searchmember"
        type="search"
        value={searchInput}
        autoComplete="off"
        onChange={searchboxInput}
      />
      {isAutoCompleteOpen && (
        <div className={styled.searchResultContainer}>
          <div className={styled.searchTitleBar}> 새 유저 추가</div>
          <div className={styled.searchResulthWrap}>
            {completedData.map((i, index) => {
              return i.userId !== undefined ? (
                <UserList
                  key={index}
                  startChat={startChat}
                  userNo={i.userNo}
                  userId={i.userId}
                  userNickName={i.userNickName}
                  sysName={i.sysName}
                  setIsAutoCompleteOpen={setIsAutoCompleteOpen}
                />
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBox;
