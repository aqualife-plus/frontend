import React, { useEffect, useState } from 'react'

import detailStyle from './detail.module.scss'; 
import DetailMyInfo from '../../components/DetailMyInfo/DetailMyInfo';
import RefundMenu from '../../components/RefundMenu/RefundMenu';
import PhMenu from '../../components/PhMenu/PhMenu';
import TempMenu from '../../components/TempMenu/TempMenu';
import Co2LightMenu from '../../components/Co2LightMenu/Co2LightMenu';

import imgs from '../../asset/img/imgs';
import DetailHeader from '../../components/DetailHeader/DetailHeader';
import { Link } from 'react-router-dom';

import { Store } from '../../store/Store';

import { useParams } from 'react-router-dom';
import { WebSocketStore } from '../../store/WebSocketStore';

function Detail() {
  
  const { detailId, detailIdUpdate, fishbowlToken } = Store();
  const {
    connectionStatus,
    receivedMessage,
    connectWebSocket,
    sendMessage,
    disconnectWebSocket,
    sendMessage2
} = WebSocketStore();

const authMessage = { "fishbowlToken": fishbowlToken};

useEffect(()=>{
  sendMessage(authMessage);
},[])
console.log(receivedMessage);


  return (
    <main className={detailStyle.main}>
      <DetailHeader />
        <div className={detailStyle.container}>
            <DetailMyInfo/>
            <ul className={detailStyle.menuLi}>
                <li>
                      <Link to={'/refund'}><RefundMenu/></Link>
                </li>
                
                <li>
                  <Link to={'/phtemp/환수'}><PhMenu/></Link>
                </li>
                
                <li>
                  <Link to={'/phtemp/온도'}><TempMenu/></Link>
                </li>

                <li>
                    <Link to={'/lightCo2/co2'}><Co2LightMenu img={imgs.cloudIcon} title={"co2"}/></Link>
                </li>

                <li>
                    <Link to={'/lightCo2/light'}><Co2LightMenu img={imgs.lightIcon} title={"light"}/></Link>
                </li>
            </ul>
        </div>
    </main>
  )
}

export default Detail