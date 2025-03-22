import React, { useEffect, useState } from 'react'

import co2LightMenuStyle from './co2LightMenu.module.scss';
import { WebSocketStore } from '../../store/WebSocketStore';
import { Store } from '../../store/Store';

function Co2LightMenu({ img, title }) {

    const [switchVal, setSwitchVal] = useState();
    const { fishbowlToken, switchValUpdate } = Store();
    const {
        connectionStatus,
        receivedMessage,
        connectWebSocket,
        sendMessage,
        disconnectWebSocket,
        isWebSocketConnected,
        ws
    } = WebSocketStore();

    const [auth, setAuth] = useState({
        "fishbowlToken": fishbowlToken,
        "type" : `${title}State`,
        "content" : null
    });

    const authMessage = { "fishbowlToken": fishbowlToken, "type": "lightState", "content": false };



    const test = (e) => {
        setSwitchVal(e.target.checked);
        // console.log(e.target.checked);
    }

    // 이벤트 버블링 부모 요소로 전달되는 이벤트 막음.
    const stop = (e) => {
        e.stopPropagation();
    }

    useEffect(() => {

        setAuth(prevAuth => ({
            ...prevAuth,
            content: switchVal
        }));

    }, [title,switchVal]);

    useEffect(() => {
        // console.log(auth);
        sendMessage(auth); 
    }, [auth]); 

    // const objectArray = (receivedMessage && typeof receivedMessage === 'object')
    //     ? Object.keys(receivedMessage).map(key => ({
    //         id: key,
    //         ...receivedMessage[key]  // 각 객체의 속성들을 펼침
    //     }))
    //     : [];

    //     console.log(receivedMessage);
        
    

    return (
        <div className={co2LightMenuStyle.co2LightMenuBox}>
            <div className={co2LightMenuStyle.title}>
                <h3>{title.toUpperCase()}</h3>
            </div>
            <div className={co2LightMenuStyle.container}>
                <div className={co2LightMenuStyle.content}>
                    <div className={co2LightMenuStyle.imgBox}>
                        <img src={img.src} alt={img.alt}></img>
                    </div>
                    <div onClick={(e) => { stop(e) }} className={co2LightMenuStyle.toggleBox}>
                        <label htmlFor={title} className={`${switchVal ? co2LightMenuStyle.check : ""}`}>
                            <span className={co2LightMenuStyle.one}></span>
                        </label>
                        <input role="switch" type="checkbox" id={title} onChange={((e) => { test(e) })} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Co2LightMenu