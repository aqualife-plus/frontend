import React, { useState } from 'react'

import refundStyle from './refund.module.scss';

import DetailMyInfo from '../../components/DetailMyInfo/DetailMyInfo';
import DetailHeader from '../../components/DetailHeader/DetailHeader';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

function Refund() {

    const dateOption = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

    const [closeVal, setCloseVal] = useState(false);

    // 각 폼에있는 셀렉트 값 상태들
    // 각 셀렉트에서 onchange로 상태 업데이트
    const [dateVal, setDateVal] = useState("");
    const [ampmVal, setAmpmVal] = useState("");
    const [hourVal, setHourVal] = useState("");
    const [minuteVal, setMinuteVal] = useState("");
    const [percentVal, setPercentVal] = useState("");


    // 각 값의 상태를 formData로 만들어 서버에 전송
    const refundSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("date",dateVal);
        formData.append("ampm",ampmVal);
        formData.append("hour",hourVal);
        formData.append("minute",minuteVal);
        formData.append("percent",percentVal);
        const objData = Object.fromEntries(formData);
        // date값이 선택이 안되었으면 선택이 되어야 서버에 보내짐
        if(!formData.get("date")){
            alert("날짜 선ㄴ택해라")
        } else{
            console.log(objData);
        }
        
    }

    const hour = Array.from({ length: 12 }, (_, index) => index + 1);
    const minute = Array.from({ length: 60 }, (_, index) => index);
    return (
        <main className={refundStyle.main}>
            <DetailHeader />
            <div className={refundStyle.container}>
                <DetailMyInfo />

                <div className={refundStyle.refunInfoBox}>
                    <div className={refundStyle.titleBox}>
                        <span className={refundStyle.title}>환수 정보</span>
                        <span className={refundStyle.modalBtn} onClick={() => { setCloseVal(!closeVal) }}>+</span>
                    </div>

                    <div className={refundStyle.refunInfoListBox}>
                        <ul className={refundStyle.refunInfoList}>
                            <li>
                                <span className={`${refundStyle.subTitle} ${refundStyle.date}`}>환수까지 남은시간</span>
                                <span>3시간</span>
                            </li>
                            <li>
                                <span className={`${refundStyle.subTitle} ${refundStyle.water}`}>환수까지 남은시간</span>
                                <span>25%</span>
                            </li>
                            <li>
                                <span className={`${refundStyle.subTitle} ${refundStyle.time}`}>환수까지 남은시간</span>
                                <span>2024.10.14 18:30</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={`${refundStyle.refundModal} ${closeVal ? refundStyle.active : ""}`}>
                <div className={refundStyle.refundModalCon}>
                    <div className={refundStyle.close}>
                        <span onClick={() => { setCloseVal(!closeVal) }}>X</span>
                    </div>
                    <div className={refundStyle.title}>
                        환수를 실행할 날짜와 시간을 선택해 주세요.
                    </div>
                    <form className={refundStyle.content} onSubmit={(e)=>(refundSubmit(e))}>
                        <div className={refundStyle.settingBox}>
                            <span className={refundStyle.subTitle}>날짜설정</span>
                            <div className={refundStyle.dateSetting}>
                                <ul className={refundStyle.dateList}>
                                    {
                                        dateOption.map((item, index) => (
                                            <li className={dateVal === item ? refundStyle.active : ""} key={index} onClick={() => { setDateVal(item) }}>{item}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className={refundStyle.settingBox}>
                            <label htmlFor="time" className={refundStyle.subTitle}>시간설정</label>
                            <div className={refundStyle.timeBox}>
                                <select id="time" value={ampmVal} required onChange={(e)=>{setAmpmVal(e.target.value)}}>
                                    <option value="" disabled hidden>AM/PM</option>
                                    <option value="am">am</option>
                                    <option value="pm">pm</option>
                                </select>
                                <select id="hour" value={hourVal} required onChange={(e)=>{setHourVal(e.target.value)}}>
                                <option value="" disabled hidden>시간</option>
                                    {
                                        hour.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                                <select id="minute" value={minuteVal} required onChange={(e)=>{setMinuteVal(e.target.value)}}>
                                <option value="" disabled hidden>분</option>
                                    {
                                        minute.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className={refundStyle.settingBox}>
                            <span className={refundStyle.subTitle}>물양설정</span>
                            <select id="percent" value={percentVal} required onChange={(e)=>{setPercentVal(e.target.value)}}>
                                <option value="" disabled hidden>선택</option>
                                <option value="25%">25%</option>
                                <option value="50%">55%</option>
                                <option value="75%">75%</option>
                                <option value="100%">100%</option>
                            </select>
                        </div>
                        <ButtonComponent type={"submit"} content={"환수 시작"} />
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Refund