import React from 'react'

import tempMenuStyle from './tempMenu.module.scss';


function TempMenu() {

    const a = 40;

    let temp = (18 / a) * 100;



    return (
        <div className={tempMenuStyle.tempMenuBox}>

            <div className={tempMenuStyle.title}>
                <h3>온도</h3>
                </div>

            <div className={tempMenuStyle.container}>
                <div className={tempMenuStyle.left}>
                    <div className={tempMenuStyle.top}>
                    <span>24℃</span>
                    </div>
                    <div className={tempMenuStyle.bottom}>
                        <div className={tempMenuStyle.tempBox}>
                            <span className={tempMenuStyle.temp}>24℃</span>
                            <span className={tempMenuStyle.title}>현재온도</span>
                        </div>
                        <div className={tempMenuStyle.tempBox}>
                        <span className={tempMenuStyle.temp}>28℃</span>
                        <span className={tempMenuStyle.title}>설정온도</span>
                        </div>
                    </div>
                </div>

                <div className={tempMenuStyle.right}>
                    <div className={tempMenuStyle.progressBar}>
                        <div className={tempMenuStyle.subProgressBar} style={{ height: `${temp}%` }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TempMenu