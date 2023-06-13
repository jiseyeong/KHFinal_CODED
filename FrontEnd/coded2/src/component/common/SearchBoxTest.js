import React from 'react';
import style from './SearchBoxTest.scss';

const SearchBoxTest = () => {
  return (
    <div className={style.searchBoxLayout}>
      <input type="text" className={style.searchBox}></input>
    </div>
  );
};

export default SearchBoxTest;
