import React from 'react';
import style from './Header.module.css';
import SearchBoxTest from '../common/SearchBoxTest';
import ModalSample from '../common/ModalSample';

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
