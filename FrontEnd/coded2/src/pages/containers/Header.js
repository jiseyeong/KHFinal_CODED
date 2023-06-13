import React from 'react';
import SearchBoxTest from '../../component/common/SearchBoxTest';
import style from './Header.scss';

const Header = () => {
  return (
    <div className={style.HeaderLayout}>
      <div className={style.LogoLayout}></div>
      <SearchBoxTest />
      <div className={style.LoginLayout}></div>
    </div>
  );
};

export default Header;
