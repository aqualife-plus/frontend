import React, { useEffect, useState } from 'react'

import phTempStyle from './phTemp.module.scss';
import DetailHeader from '../../components/DetailHeader/DetailHeader';

import DetailMyInfo from '../../components/DetailMyInfo/DetailMyInfo';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { useParams } from 'react-router-dom';
import PhModal from '../../components/PhModal/PhModal';
import { Store } from '../../store/Store';
import TempModal from '../../components/TempModal/TempModal';

function PhTemp() {
    const { activeVal, activeOnOff, activeReset } = Store();
    const { title } = useParams();

    const [symbol, setSymbol] = useState("");

    useEffect(() => {
        switch (title) {
            case "환수": setSymbol("ph");
                break;
            case "온도": setSymbol("℃");
                break;
            default:
                console.log("아무것도없는데");
        }
    }, [title])



    return (
        <main className={phTempStyle.main}>
            <DetailHeader />
            <div className={phTempStyle.container}>
                <DetailMyInfo />
                <div className={phTempStyle.refundBox}>
                    <div className={phTempStyle.titleBox}>
                        <div className={phTempStyle.imgBox}>
                            <img src=''></img>
                        </div>
                        <div className={phTempStyle.infoBox}>
                            <span>{title} 정보</span>
                        </div>
                    </div>
                    <div className={phTempStyle.con}>
                        <ul className={phTempStyle.phTempList}>
                            <li>
                                <div className={phTempStyle.phTempBox}>
                                    <span className={phTempStyle.title}>현재 {title}</span>
                                    <span className={`${phTempStyle.nowValue} ${title === "환수" ? phTempStyle.on : ""}`}>7.8 {symbol}</span>
                                </div>
                            </li>
                            <li>
                                <div className={phTempStyle.phTempBox}>
                                    <div className={phTempStyle.top}>
                                        {
                                            title === "환수" && <span className={phTempStyle.title}>위험 범위</span>
                                        }
                                        {
                                            title === "온도" && <span className={phTempStyle.title}>설정 온도</span>
                                        }
                                        <FontAwesomeIcon onClick={() => { activeOnOff(); }} className={phTempStyle.arrRight} icon={faChevronRight} />
                                    </div>
                                    {/* 환수 온도 페이지에 맞는 div 랜더링 */}
                                    {
                                        title === "환수" && <div className={phTempStyle.warning}>
                                            <span className={phTempStyle.rangeValue}>1.8 {symbol}</span>
                                            <span>~</span>
                                            <span className={phTempStyle.rangeValue}>1.8 {symbol}</span>
                                        </div>
                                    }
                                    {
                                        title === "온도" && <div className={phTempStyle.warning}>
                                            <span className={phTempStyle.rangeValue}>1.8 {symbol}</span>
                                        </div>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={phTempStyle.maxMinBox}>
                    <div className={phTempStyle.titleBox}>
                        <div className={phTempStyle.imgBox}>
                            <img src=''></img>
                        </div>
                        <div className={phTempStyle.infoBox}>
                            <span>하루 중 최고 최저 {symbol}</span>
                        </div>
                    </div>
                    <div className={phTempStyle.con}>
                        <ul className={phTempStyle.maxMinList}>
                            <li>
                                <div className={phTempStyle.imgBox}>
                                    <img src=''></img>
                                </div>
                                <div className={phTempStyle.maxMinInfo}>
                                    <span className={phTempStyle.title}>High</span>
                                    <span className={phTempStyle.num}>7.9</span>
                                </div>
                            </li>
                            <li>
                                <div className={phTempStyle.imgBox}>
                                    <img src=''></img>
                                </div>
                                <div className={phTempStyle.maxMinInfo}>
                                    <span className={phTempStyle.title}>High</span>
                                    <span className={phTempStyle.num}>7.9</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 환수 온도 페이지에 맞는 modal 랜더링 */}
            {title === "환수" && <PhModal />}
            {title === "온도" && <TempModal />}

        </main>
    )
}

export default PhTemp