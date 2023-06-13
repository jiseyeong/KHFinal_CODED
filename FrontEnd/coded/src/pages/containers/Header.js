import React from 'react';
import SearchBoxTest from '../../component/common/SearchBoxTest';
import style from './Header.scss';

const Header = () => {
  return (
    <div className={style.HeaderLayout}>
      <div className={style.LogoLayout}></div>
      <div className={style.MainLayout}>
        <SearchBoxTest />
        <div className={style.NavigatorLayout}></div>
      </div>
      <div className={style.LoginLayout}></div>
    </div>
  );
};

export default Header;
