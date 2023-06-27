import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// UserList Li
const UserList = ({ userId, userNickName, sysName }) => {
    return (
        <li className={styles.userList}>
            <a href="#">
                <div className={styles.userLeftSide}>
                    {sysName !== null ? (
                        <img src={`/images/${sysName}`}></img>
                    ) : (
                        <img className={styles.thumbNail} src={`/images/test.jpg`}></img>
                    )}
                </div>
                <div className={styles.userMiddleSide1}>{userNickName}</div>
                <div className={styles.userMiddleSide2}>{userId}</div>
                {/* <div className={styles.userRightSide}>
          <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
        </div> */}
            </a>
        </li>
    );
};


const SearchBox = () => {
    const [searchData, setSearchData] = useState([]);
    const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
    const [completedData, setCompletedData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

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

        console.log(searchInput);
    };

    const searchHashList = (event) => {
        event.preventDefault();
        setIsAutoCompleteOpen(false);
        toSearch(`/feedList/search?keyword=${searchInput}`);
      };

    const SearchMember = styled('div')`
    .searchBar * {
        border: 0px;
      }
      
      .searchBar {
        margin-left:460px;
        width: 35%;
        height: 40px;
        z-index: 102;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: -0.4px;
        line-height: 1.43;
        color: rgb(27, 29, 31);
        border-top:1px solid rgb(232, 235, 237);
        border-bottom:1px solid rgb(232, 235, 237);;
        border-image: initial;
        transition: background-color 0.25s ease-in-out 0s, color 0.25s 0s;
      
        input {
          // margin-left:70px;
          justify-content: center;
          appearance: none;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: color 0.25s ease-in-out 0s;
          outline: none;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.4px;
          line-height: 1.43;
          color: #26282b;
          font-family: 'Helvetica', 'Arial', 'Apple SD Gothic Neo', 'Nanum Gothic',
            'Malgun Gothic', 'DotumChe', 'Dotum', sans-serif;
        }
      
        .autoSearchContainer {
          z-index: 3;
          height: 31vh;
          width: 35%;
          background-color: #fff;
          position: absolute;
          top: 55px;
          border: 2px solid;
          border-color: rgb(232, 235, 237);
          padding: 15px;
        }
      }
      
      .autoSearchWrap {
        // userList와 hashTagList
        li {
          width: 100%;
          height: 50px;
          list-style: none;
          padding: 6px 6px;
          font-size: 14px;
          font-weight:600;
          z-index: 4;
          //letter-spacing: 2px;
          &:hover {
            background-color: #f2f2f2;
            cursor: pointer;
          }
      
          a {
            display: block;
            width: 100%;
            height: 100%;
            div {
              height: 100%;
              float: left;
              // display: flex;
              justify-content: center;
              align-items: center;
            }
      
            .userLeftSide {
              width: 10%;
              img {
                width: 60%;
                height: 100%;
                object-fit: cover;
                border-radius: 30px;
              }
            }
      
            // 단일 사용 시
            .userMiddleSide {
              width: 80%;
              justify-content: left;
              line-height:38px;
            }
            // 여러개 나누어 사용 시
            .userMiddleSide1 {
              width: 15%;
              justify-content: left;
              overflow: hidden;
              line-height:38px;
            }
            .userMiddleSide2 {
              width: 65%;
              padding-left: 20px;
              justify-content: left;
              overflow: hidden;
              line-height:38px;
            }
      
            .userRightSide {
              width: 10%;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      
      .searchOutLayer {
        // position: absolute;
        z-index: 1500;
        width: 100%;
        height: 100%;
        display: block;
        background: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      
    `


    return (
        <SearchMember>
        <form className='searchBar' onSubmit={searchHashList}>
            <input
                id="search-keyword"
                type="search"
                value={searchInput}
                placeholder="유저와 스타일을 검색해보세요"
                autoComplete="off"
                onChange={searchboxInput}
            />
            {isAutoCompleteOpen && (
                <div className={styles.autoSearchContainer} ref={autoSearchRef}>
                    <div className={styles.autoSearchWrap}>
                        {completedData.map((i) => {
                            return i.userId !== undefined ? (
                                <UserList
                                    userId={i.userId}
                                    userNickName={i.userNickName}
                                    sysName={i.sysName}
                                />
                            ) : (
                                <HashTagList hashTag={i.hashTag} />
                            );
                        })}
                    </div>
                </div>
            )}
        </form>
        </SearchMember>
    );
};

export default SearchBox;
