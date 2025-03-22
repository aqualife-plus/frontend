import React from 'react'

import ProgressBar from 'react-bootstrap/ProgressBar';

import phMenuStyle from './phMenu.module.scss';

function PhMenu() {

  const a = 1.7; // 최소값
  const b = 15; // 최대값
  const c = 13;  // 현재값
  const val = ((c - a) / (b - a) * 100); // 현재값을 최소,최대값 기준으로 백분율 변환값

  return (
    <div className={phMenuStyle.phMenuBox}>

      <div className={phMenuStyle.title}>
        <h3>PH</h3>
      </div>

      <div className={phMenuStyle.container}>
        <div className={phMenuStyle.progressBox}>
          <div className={phMenuStyle.progressTextBox}>
            <span className={phMenuStyle.leftText}>1.7</span>
            <span className={phMenuStyle.midText} style={{ left: `${val}%`, transform: `translateX(-${val}%)` }}>5.0</span>
            <span className={phMenuStyle.rightText}>15</span>
          </div>
          <div className={phMenuStyle.progressBar}></div>
        </div>

        <div className={phMenuStyle.markWrap}>
          <div className={phMenuStyle.markBox}>
            <div className={`${phMenuStyle.mark} ${phMenuStyle.danger}`}></div>
            <span className={phMenuStyle.title}>위험</span>
          </div>
          <div className={phMenuStyle.markBox}>
            <div className={`${phMenuStyle.mark} ${phMenuStyle.safe}`}></div>
            <span className={phMenuStyle.title}>정상</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhMenu