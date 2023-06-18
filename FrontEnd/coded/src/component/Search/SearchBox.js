import React, { useState } from 'react';
import style from './SearchBox.scss';
import { styled } from 'styled-components';
import SearchAutoCompleteBox from './SearchAutoCompleteBox';

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState('');

  const searchboxInput = (event) => {
    console.log(event.target.value);
    setSearchInput(event.target.value);
  };

  return (
    // <div className={style.searchBoxLayout}>
    <form className="searchBar">
      <input
        id="search-keyword"
        name="keyword"
        type="search"
        placeholder="유저와 스타일을 검색해보세요"
        onChange={searchboxInput}
      />
      <SearchAutoCompleteBox props={searchInput} />
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
