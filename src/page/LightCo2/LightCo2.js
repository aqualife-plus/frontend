import React, { useEffect, useState } from 'react'

import lightCo2Style from './lightCo2.module.scss';
import DetailHeader from '../../components/DetailHeader/DetailHeader';
import DetailMyInfo from '../../components/DetailMyInfo/DetailMyInfo';

import imgs from '../../asset/img/imgs';
import TimeModal from '../../components/TimeModal/TimeModal';

import { Store } from '../../store/Store';

import { useParams } from 'react-router-dom';
import axios from 'axios';

function LightCo2() {


    const { activeVal, activeOnOff, fishbowlToken, timeEditVal, timeEditOn, reserveIdUpdate, reserveList, reserveListGet } = Store();

    const { title } = useParams();



    // 이벤트 버블링 부모 요소로 전달되는 이벤트 막음.
    const stop = async(e, item) =>{
        e.stopPropagation();
        console.log("스탑");
        
        console.log(title);
        const a = {...item, [`${title}ReserveState`] : !item[`${title}ReserveState`]};
        console.log(a);
        
        try {
            const v = await axios.put(`${process.env.REACT_APP_SERVER_URL}/${title}/reserve/${item.id}`,a,{
                headers: {
                    'Authorization': localStorage.getItem("accessToken"),
                    'X-Fishbowl-Token': fishbowlToken,
                },
            });
            console.log(v.data);
            
            reserveListGet(title);
        } catch (error) {
            console.log(error);
            
        }
        reserveListGet(title);
    }


    useEffect(()=>{
        reserveListGet(title);
    },[])

console.log(reserveList);

    return (
        <main className={lightCo2Style.main}>
            <DetailHeader />
            <div className={lightCo2Style.container}>
                <DetailMyInfo />
                <div className={lightCo2Style.stateWrap}>
                    <div className={lightCo2Style.stateBox}>
                        <div className={lightCo2Style.imgBox}>
                        <img src={title === "co2" ? imgs.cloudIcon.src : (title === "light" ? imgs.lightIcon.src : "")} />
                        </div>
                        <span>{title}</span>
                    </div>
                    <div className={lightCo2Style.btnBox}>
                        <button className={lightCo2Style.off} type='button'>OFF</button>
                        <button className={lightCo2Style.on} type='button'>ON</button>
                    </div>
                </div>
                <div className={lightCo2Style.alarmListBox}>
                    <div className={lightCo2Style.top}>
                        <div className={lightCo2Style.left}>
                            <img src=''></img>
                        </div>
                        <div className={lightCo2Style.right}>
                            <span className={lightCo2Style.title}>설정한 알람 리스트</span>
                            <span className={lightCo2Style.alarmNum}>{reserveList.length}개의 알람 존재</span>
                        </div>
                        <div className={lightCo2Style.plus} onClick={()=>{activeOnOff()}}>+</div>
                    </div>
                    <div className={lightCo2Style.bottom}>
                        <ul className={lightCo2Style.alarmList}>
                            {
                                reserveList &&  reserveList.map((item, index)=>(
                                    <li key={index} onClick={()=>{timeEditOn(); activeOnOff(); reserveIdUpdate(item.id)}}>
                                        <div className={lightCo2Style.timeBox}>
                                            <span className={lightCo2Style.time}>{item[`${title}StartTime`]} ~ {item[`${title}EndTime`]}</span>
                                        </div>
                                        <div onClick={(e)=>{stop(e, item)}} className={lightCo2Style.toggleBox}>
                                            <label htmlFor={item.id} className={`${item[`${title}ReserveState`] ? lightCo2Style.check : ""}`}>
                                                <span className={lightCo2Style.one}></span>
                                            </label>
                                            <input role="switch" type="checkbox" checked={item[`${title}ReserveState`]} onChange={()=>{console.log("바뀜");
                                            }} id={item.id}  />
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <TimeModal/>
        </main>
    )
}

export default LightCo2