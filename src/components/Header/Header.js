import React, { useState } from 'react'

import headerStyle from './herader.module.scss';
import imgs from '../../asset/img/imgs';
import { Link } from 'react-router-dom';

function Header() {

  const [test, setTest] = useState(false);



  return (
    <header className={headerStyle.header}>
      <div className={`${headerStyle.hamburger} ${test ? headerStyle.active : ""}`}>
        <div className={headerStyle.hamBox} onClick={() => { setTest(!test) }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={headerStyle.sideMenuBox}>
          <nav>
          <div className={headerStyle.a} onClick={() => { setTest(!test) }}>
            <span></span>
            <span></span>
            <span></span>
          </div>
            <ul>
              <li><span>ss</span></li>
              <li><span>ss</span></li>
              <li><span>ss</span></li>
            </ul>
          </nav>
        </div>
      </div>
        <div className={headerStyle.logo}>
          <Link to={'/'}><img src={imgs.logo.src} alt={imgs.logo.alt}></img></Link>
        </div>
    </header>
  )
}

export default Header