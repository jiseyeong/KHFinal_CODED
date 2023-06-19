import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import styles from './SearchBox.module.scss';
import axios from 'axios';

// UserList Li
const UserList = () => {
  return (
    <li className={styles.userList}>
      <a href="#">
        <div className={styles.userLeftSide}>
          <img src="/images/test.jpg"></img>
        </div>
        <div className={styles.userMiddleSide}>sdfsdf</div>
        <div className={styles.userRightSide}>
          <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
        </div>
      </a>
    </li>
  );
};

// HashTagList Li
const HashTagList = () => {
  return (
    <li className={styles.hashTagList}>
      <a href="#">
        <div className={styles.userLeftSide}>
          <img src="" alt="해시태그 아이콘"></img>
        </div>
        <div className={styles.userMiddleSide}>sdfsdf</div>
        <div className={styles.userRightSide}>
          <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
        </div>
      </a>
    </li>
  );
};

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState([]);
  const autoSearchRef = useRef();
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);

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

  useEffect(() => {
    console.log(searchData);

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
    setSearchInput(e.target.value);
    // const debounce = setTimeout(() => {
    //   if (searchInput) change();
    // }, 200);
    // return () => {
    //   clearTimeout(debounce);
    // };
  };

  return (
    // <div className={style.searchBoxLayout}>
    <form className={styles.searchBar}>
      <input
        id="search-keyword"
        name="keyword"
        type="search"
        placeholder="유저와 스타일을 검색해보세요"
        autoComplete="off"
        onChange={searchboxInput}
      />
      {isAutoCompleteOpen && (
        <div className={styles.autoSearchContainer} ref={autoSearchRef}>
          <div className={styles.autoSearchWrap}>
            <UserList />
            <HashTagList />
          </div>
        </div>
      )}
    </form>
    // </div>
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
