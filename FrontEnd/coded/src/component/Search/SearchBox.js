import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import styles from './SearchBox.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// UserList Li
const UserList = ({ userId, userNickName, sysName }) => {
  return (
    <li className={styles.userList}>
      <a href="#">
        <div className={styles.userLeftSide}>
          <img
            src={`/images/${sysName}`}
            onError="this.src='/images/test.jpg'"
          ></img>
        </div>
        <div className={styles.userMiddleSide1}>{userNickName}</div>
        <div className={styles.userMiddleSide2}>{userId}</div>
        <div className={styles.userRightSide}>
          <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
        </div>
      </a>
    </li>
  );
};

// HashTagList Li
const HashTagList = ({ hashTag }) => {
  return (
    <li className={styles.hashTagList}>
      <a href="#">
        <div className={styles.userLeftSide}>
          {/* 해시태그 아이콘 등록해주세요 */}
          <img src="" alt="해시태그 아이콘"></img>
        </div>
        <div className={styles.userMiddleSide}>{hashTag}</div>
        <div className={styles.userRightSide}>
          {/* 다른 기타 아이콘(화살표 아이콘?? 등)넣어주세요 */}
          <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
        </div>
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

    axios
      .request({
        url: '/PostHashs/selectAllPostTagNames',
        method: 'GET',
      })
      .then((resp) => {
        setSearchData((prev) => {
          return [...prev, ...resp.data];
        });
      })
      .catch((error) => console.log(error));
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

    searchData.forEach((item, index) => {
      if (temp.length == searchCount) {
        return;
      }
      if (item.tagId !== undefined) {
        if (item.hashTag.indexOf(input) !== -1) {
          temp.push(item);
        }
      }
    });

    setSearchInput(input);
    setCompletedData(temp);
    // const debounce = setTimeout(() => {
    //   if (completedData) change();
    // }, 200);
    // return () => {
    //   clearTimeout(debounce);
    // };
    console.log(searchInput);
  };

  const searchHashList = (event) => {
    event.preventDefault();
    setIsAutoCompleteOpen(false);
    toSearch(`/feed/search?keyword=${searchInput}`);
  };

  return (
    <form className={styles.searchBar} onSubmit={searchHashList}>
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
  );
};

export default SearchBox;

// import React, { useState } from 'react';
// import style from './SearchBox.scss';
// import { styled } from 'styled-components';
// import SearchAutoCompleteBox from './SearchAutoCompleteBox';

// const SearchContainer = styled('div')`
//   width: 400px;
//   height: 45px;
//   position: relative;
//   border: 0;
//   img {
//     position: absolute;
//     right: 10px;
//     top: 10px;
//   }
// `;

// const Search = styled('input')`
//   border: 0;
//   padding-left: 10px;
//   background-color: #eaeaea;
//   width: 100%;
//   height: 100%;
//   outline: none;
// `;

// const SearchBoxTest = () => {
//   let searchbox = document.getElementById('searchBox');
//   const [searchInput, setSearchInput] = useState('');

//   const searchboxInput = (event) => {
//     console.log(event.target.value);
//     setSearchInput(event.target.value);
//   };
//   return (
//     <div className={style.searchBoxLayout}>
//       <SearchContainer>
//         <Search id="searchBox" onChange={searchboxInput} />
//         <SearchAutoCompleteBox props={searchInput} />
//       </SearchContainer>
//     </div>
//   );
// };

// export default SearchBoxTest;
