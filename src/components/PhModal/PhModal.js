import React, { useEffect, useState } from 'react'

import phModalStyle from './phModal.module.scss';
import Button from '../ButtonComponent/ButtonComponent';
import { Store } from '../../store/Store';
import axios from 'axios';

function PhModal() {
    const { activeVal, activeOnOff, activeReset, fishbowlToken } = Store();
    const [warningMinPh,setWarningMinPh] = useState('');
    const [warningMaxPh,setWarningMaxPh] = useState('');




        // 컴포넌트 언마운트 시 모달 상태 초기화
        useEffect(() => {
          return () => {
            activeReset();    
          };

        }, [activeReset])
        const token = localStorage.getItem('accessToken');
        const test = async(e) =>{
          e.preventDefault();

          // 숫자만 입력 가능
          const hasString = /[a-zA-Z]/.test(warningMinPh) || /[a-zA-Z]/.test(warningMaxPh);
          if(hasString){
            alert("숫자만 입력이 가능합니다.");
            return;
          }

          // 최소값 최대값 범위 제한
          if(warningMinPh <= 0 || warningMaxPh > 10){
            alert(`최소값은 0.1이상으로 작성하여주세요.\n최대값은 10이하로 작성하여주세요. `);
            return;
          }

          const objData = {
            warningMinPh: parseFloat(warningMinPh),
            warningMaxPh: parseFloat(warningMaxPh),
          };


          // 최소값이 최대값보다 크거나 같으면 실행을 막음.
          if(objData.warningMinPh < objData.warningMaxPh && objData.warningMinPh !== objData.warningMaxPh){
            console.log("토ㅓㅇ과");
            console.log(objData);
            const phRes = await axios.put(`${process.env.REACT_APP_SERVER_URL}/ph`,objData,{
              headers: {
                Authorization: `${token}`,
                'X-Fishbowl-Token': fishbowlToken,
            },
            })
            console.log(phRes.data);
            
            activeOnOff(); 
            setWarningMinPh("");
            setWarningMaxPh("");
          } else{
            alert("최소값이 최대값보다 작거나 같지 않아야합니다.")
          }
        }

        

  return (
    <div className={`${phModalStyle.modalWrap} ${activeVal ? phModalStyle.active : ""}`}>
      <div className={phModalStyle.modal}>
        <div className={phModalStyle.close}>
          <span onClick={() => { activeOnOff(); setWarningMinPh(""); setWarningMaxPh(""); }}>X</span>
        </div>

        <div className={phModalStyle.settingWrap}>
          <span className={phModalStyle.title}>위험 게이지 설정</span>
          <form onSubmit={(e)=>{test(e);}}>
            <div className={phModalStyle.content}>
              <div className={phModalStyle.phValueBox}>
                <label>warningMinPh</label>
              <input type='text' required name='warningMinPh' value={warningMinPh} onChange={(e)=>{setWarningMinPh(e.target.value)}}></input>
              </div>
              <div className={phModalStyle.phValueBox}>
              <label>warningMaxPh</label>
              <input type='text' required name='warningMaxPh' value={warningMaxPh} onChange={(e)=>{setWarningMaxPh(e.target.value)}}></input>
              </div>
            </div>
            <Button type="submit" content="저장"/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PhModal