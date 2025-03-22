import React from 'react'

import listStyle from './list.module.scss';

import imgs from '../../asset/img/imgs';

function List({val}) {
    

  return (
    <div className={listStyle.listBox}>
        <div className={listStyle.content}>
            <div className={listStyle.imgBox}>
                <img src={imgs.test.src}></img>
            </div>

            <div className={listStyle.infoBox}>
                <div className={listStyle.left}>
                        <span className={listStyle.title}>어항 눼임</span>
                        <span className={listStyle.info}>떨명</span>
                </div>

                <div className={listStyle.right}>
                    <span className={`${listStyle.situation} ${val ? listStyle.sec : listStyle.err}`}>상태 : 정상 뽀봄</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default List