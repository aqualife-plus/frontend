import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import homeStyle from './home.module.scss';
import List from '../../components/List/List';
import Header from '../../components/Header/Header';
import axios from 'axios';

import { io } from "socket.io-client";
import { WebSocketStore } from '../../store/WebSocketStore';
import { Store } from '../../store/Store';

function Home() {


    const { fishbowlTokenUpdate } = Store();
    const {
        connectionStatus,
        receivedMessage,
        connectWebSocket,
        sendMessage,
        disconnectWebSocket,
        isWebSocketConnected
    } = WebSocketStore();

    // receivedMessage가 객체일 때만 Object.keys()를 호출하여 objectArray 생성
    const objectArray = (receivedMessage && typeof receivedMessage === 'object')
        ? Object.keys(receivedMessage).map(key => ({
            id: key,
            ...receivedMessage[key]  // 각 객체의 속성들을 펼침
        }))
        : [];

    const token = localStorage.getItem('accessToken')?.replace(/^Bearer\s/, ''); // "Bearer " 제거

    useEffect(() => {
        // WebSocket 연결
        connectWebSocket('ws://115.85.181.195:8080/ws', token);

        // 컴포넌트 언마운트 시 WebSocket 연결 종료
        return () => {
            // disconnectWebSocket();
        };
    }, [connectWebSocket, disconnectWebSocket, token]);


    console.log(objectArray);


    return (
        <main className={homeStyle.main}>
            <Header />
            <div className={homeStyle.container}>
                <ul className={homeStyle.listLi}>
                    {
                        objectArray.map((item, index) => (
                            <li key={index} onClick={() => { fishbowlTokenUpdate(item.id); }}><Link to={`/detail/${item.id}`}><List val={true} /></Link></li>
                        ))
                    }
                    <li onClick={() => { fishbowlTokenUpdate("9524a823-4176-4fc0-aa0e-5d83ab7b2baa"); }}><Link to={`/detail/9524a823-4176-4fc0-aa0e-5d83ab7b2baa`}><List val={true} /></Link></li>

                </ul>
            </div>
        </main>
    )
}

export default Home