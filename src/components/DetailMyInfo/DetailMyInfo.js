import React from 'react'

import imgs from '../../asset/img/imgs.js';

import detailMyInfoStyle from './detailMyInfo.module.scss';
import { Link } from 'react-router-dom';


function DetailMyInfo() {
  return (
    <div className={detailMyInfoStyle.myInfoBox}>
        <div className={detailMyInfoStyle.edit}>
            <Link to={'/detailEidt'}>편집</Link>
        </div>
    <div className={detailMyInfoStyle.content}>
    <div className={detailMyInfoStyle.left}>
            <div className={detailMyInfoStyle.imgBox}>
                <img src={imgs.test.src} alt={imgs.test.alt}></img>
            </div>
        </div>
        <div className={detailMyInfoStyle.right}>
            <span className={detailMyInfoStyle.title}>어항 이름</span>
            <span className={detailMyInfoStyle.subTitle}>어항 설명</span>
        </div>
    </div>
    </div>
  )
}

export default DetailMyInfo