import React from 'react';
<<<<<<<< HEAD:FrontEnd/coded/src/component/Main/Header.js
import style from './Header.module.css';
import SearchBoxTest from '../common/SearchBoxTest';
import ModalSample from '../common/ModalSample';
========
import SearchBoxTest from '../../component/common/SearchBoxTest';
import style from './Header.scss';
>>>>>>>> main:FrontEnd/coded/src/pages/containers/Header.js

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
