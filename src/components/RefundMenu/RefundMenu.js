import React, { useState, useEffect } from 'react';
import refundMenuStyle from './RefundMenu.module.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function RefundMenu() {
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prev) => {
  //       if (prev === 60) {
  //         clearInterval(timer);
  //         return prev;
  //       }
  //       return prev + 1;
  //     });
  //   }, 10); 

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className={refundMenuStyle.refundMenuBox}>
        <div className={refundMenuStyle.title}>
        <h3 className={refundMenuStyle.title}>환수</h3>
        </div>
      <div className={refundMenuStyle.box}>
        <CircularProgressbar
          className={refundMenuStyle.circular}
          value={60}
          text={`${60}%`}
          styles={buildStyles({
            strokeLinecap: 'round',
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${60 / 100})`,
            textColor: '#f88',
            trailColor: '#d6d6d6',
          })}
        />
        <div className={refundMenuStyle.timerBox}>
          <span>남은시간 : 25분</span>
        </div>
      </div>
    </div>
  );
}

export default RefundMenu;
