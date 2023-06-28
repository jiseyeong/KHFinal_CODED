import React, { useState, useRef, useEffect } from 'react';
import styled from './SearchMember.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// UserList Li
const UserList = ({ userId, userNickName, sysName }) => {
    return (
        <li className={styled.userList}>
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

    // const SearchMember = styled('div')`
    // padding-top:15px;


    // .searchForm{
    //     background-color: white;
    //     width: 100%;
    //     height: 30px;
    //     border-radius: 5px;
    // }
    // #search-member{
    //     margin-left: 10px;
    //     width:95%;
    //     height:100%;
    //     padding:5px;
    //     border:none;
    //     border-radius:5px;
    //     font-size:15px;
    // }
    // #search-member:focus{outline:none;}

    // .searchResultContainer {
    //     z-index: 3;
    //     height: 31vh;
    //     width: 35%;
    //     background-color: #fff;
    //     position: absolute;
    //     border: 2px solid;
    //     border-color: rgb(232, 235, 237);
    //     padding: 15px;
    //   }
    // }

    // .searchResulthWrap {
    //   // userList와 hashTagList
    //   li {
    //     width: 100%;
    //     height: 50px;
    //     list-style: none;
    //     padding: 6px 6px;
    //     font-size: 14px;
    //     font-weight:600;
    //     z-index: 4;
    //     //letter-spacing: 2px;
    //     &:hover {
    //       background-color: #f2f2f2;
    //       cursor: pointer;
    //     }

    //     a {
    //       display: block;
    //       width: 100%;
    //       height: 100%;
    //       div {
    //         height: 100%;
    //         float: left;
    //         // display: flex;
    //         justify-content: center;
    //         align-items: center;
    //       }

    //       .userLeftSide {
    //         width: 10%;
    //         img {
    //           width: 80%;
    //           height: 100%;
    //           object-fit: cover;
    //           border-radius: 30px;
    //         }
    //       }

    //       .userMiddleSide1 {
    //         width: 25%;
    //         justify-content: left;
    //         overflow: hidden;
    //         line-height:38px;
    //       }
    //       .userMiddleSide2 {
    //         width: 55%;
    //         padding-left: 20px;
    //         justify-content: left;
    //         overflow: hidden;
    //         line-height:38px;
    //       }


    //       }
    //     }
    //   }
    // }

    // .searchOutLayer {
    //   // position: absolute;
    //   z-index: 1500;
    //   width: 100%;
    //   height: 100%;
    //   display: block;
    //   background: rgba(0, 0, 0, 0.3);
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    // }
    // `


    return (
        <form className={styled.searchForm} ref={autoSearchRef}>
            <input
                id="search-member"
                type="search"
                value={searchInput}
                autoComplete="off"
                onChange={searchboxInput}
            />
            {isAutoCompleteOpen && (
                <div className={styled.searchResultContainer}>
                    <div className={styled.searchResulthWrap}>
                        {completedData.map((i) => {
                            return i.userId !== undefined ? (
                                <UserList
                                    userId={i.userId}
                                    userNickName={i.userNickName}
                                    sysName={i.sysName}
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
