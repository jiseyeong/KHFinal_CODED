import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import styles from './SearchBox.module.scss';
import axios from 'axios';

const AutoSearchWrap = styled('ul')``;

const AutoSearchData = styled('li')`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState('');
  const [hashTagData, setHashTagData] = useState([]);
  const [userData, setUserData] = useState([]);
  const autoSearchRef = useRef();

  // 검색 전 자동완성 시 보여줄 해시태그 데이터를 출력
  useEffect(() => {
    axios({
      url: '/PostHashs/selectAllPostTagNames',
      method: 'get',
    })
      .then((resp) => {
        console.log(resp.data);
        setHashTagData(resp.data);
      })
      .catch((error) => console.log(error));

    axios
      .request({
        url: '/auth/selectUserListWithProfile',
        method: 'GET',
      })
      .then((resp) => {
        console.log(resp.data);
        setUserData(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const debounce = setTimeout(() => {
      if (searchInput) change();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, []);

  const searchboxInput = (event) => {
    setSearchInput(event.target.value);
    autoSearchRef.current.style.display = 'block';
  };

  return (
    // <div className={style.searchBoxLayout}>
    <form className={styles.searchBar}>
      <input
        id="search-keyword"
        name="keyword"
        type="search"
        placeholder="유저와 스타일을 검색해보세요"
        onChange={searchboxInput}
      />
      <div className={styles.autoSearchContainer} ref={autoSearchRef}>
        <AutoSearchWrap>
          <AutoSearchData>
            <a href="#"></a>
            <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
          </AutoSearchData>
        </AutoSearchWrap>
      </div>
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
