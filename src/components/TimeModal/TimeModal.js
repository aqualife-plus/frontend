import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import timeModalStyle from './timeModal.module.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

import { Store } from '../../store/Store';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TimeModal() {
    const { title } = useParams();
    const [defaultValue, setDefaultValue] = useState({
        [`${title}StartTime`]: '',
        [`${title}EndTime`]: ''
    })

    const { register, handleSubmit, formState: { errors }, getValues, setError, clearErrors } = useForm({
        defaultValue
    });
    const { activeVal, activeOnOff, activeReset, fishbowlToken, timeEditVal, timeEditOff, reserveId, reserveListGet } = Store();


    console.log(reserveId);
    

    const onSubmit = async(data) => {
        const a = { ...data, [`${title}ReserveState`]: true };
        
        // [] 표기법 (bracket notation)을 이용해 객체의 키가 동적으로 바뀌어도 접근 가능
        if (a[`${title}StartTime`] !== a[`${title}EndTime`]) {

            if(timeEditVal){
                await axios.put(`${process.env.REACT_APP_SERVER_URL}/${title}/reserve/${reserveId}`,a, {
                    headers: {
                        'Authorization': localStorage.getItem("accessToken"),
                        'X-Fishbowl-Token': fishbowlToken,
                    },
                });
                reserveListGet(title);
                activeReset();
            }else{
                const reservRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/${title}/reserve`,a, {
                    headers: {
                        'Authorization': localStorage.getItem("accessToken"),
                        'X-Fishbowl-Token': fishbowlToken,
                    },
                });
                reserveListGet(title);
                activeReset();
            }
        } 
    };

    const reserveDel = async() =>{
        const reCheck = window.confirm("정말 삭제하시겠습니까?")
        if(reCheck){
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/${title}/reserve/${reserveId}`, {
                headers: {
                    'Authorization': localStorage.getItem("accessToken"),
                    'X-Fishbowl-Token': fishbowlToken,
                },
            });
            reserveListGet(title);
            activeReset();
            console.log("삭제완");
        }else{
            activeReset();
            console.log("삭제no");
            
        }
        
    }

    // 컴포넌트 언마운트 시 모달 상태 초기화
    useEffect(() => {
        activeReset();
        timeEditOff();
    }, [activeReset, timeEditOff])



    return (
        <div className={`${timeModalStyle.con} ${activeVal ? timeModalStyle.active : ""}`}>
            <div className={timeModalStyle.conn}>
                <div className={timeModalStyle.top}>
                    <div className={timeModalStyle.close}>
                        <span onClick={() => { activeOnOff(); timeEditOff(); }}>X</span>
                    </div>
                </div>
                <div className={timeModalStyle.content}>
                    <div className={timeModalStyle.textBox}>
                        <h3 className={timeModalStyle.title}>알람 추가</h3>
                        <span className={timeModalStyle.titleEx}>설정한 시간에 맞춰 조명을 ON,OFF 제어해드립니다.</span>
                    </div>
                    <form className={timeModalStyle.timeWrap} onSubmit={handleSubmit(onSubmit)}>
                        <div className={timeModalStyle.timeBox}>
                            <label>시작 시간</label>
                            <input id={`${title}StartTime`} name={`${title}StartTime`} type='time' {...register(`${title}StartTime`, { required: '시작 시간은 필수입니다.' })}></input>
                            {errors.start && <span className={timeModalStyle.err}>{errors.start.message}</span>}
                        </div>
                        <div className={timeModalStyle.timeBox}>
                            <label>끝나는 시간</label>
                            <input id={`${title}EndTime`} name={`${title}EndTime`} type='time' {...register(`${title}EndTime`, { required: '끝내는 시간은 필수입니다.' })}></input>
                            {errors.end && <span className={timeModalStyle.err}>{errors.end.message}</span>}
                        </div>
                        <ButtonComponent content={"저장"} />
                    </form>
                </div>
                        {timeEditVal && <ButtonComponent fun={reserveDel} type={"button"} content={"삭제"} />}
            </div>
        </div>
    )
}

export default TimeModal