import React, { useEffect, useState } from 'react'

import tempModalStyle from './tempModal.module.scss';
import Button from '../ButtonComponent/ButtonComponent';
import { Store } from '../../store/Store';
import axios from 'axios';

function TempModal() {
    const { activeVal, activeOnOff, activeReset, fishbowlToken } = Store();
    const [tempValue, setTempValue] = useState("");


    // 컴포넌트 언마운트 시 모달 상태 초기화
    useEffect(() => {
        return () => {
            activeReset();
        };

    }, [activeReset])
    const token = localStorage.getItem('accessToken');
    const tempSubmit = async (e) => {
        e.preventDefault();


        // 숫자만 입력 가능
        const hasString = /[a-zA-Z]/.test(tempValue);
        if (hasString) {
            alert("숫자만 입력이 가능합니다.");
            return;
        }

        // 최소값 최대값 범위 제한
        if (tempValue <= -10 || tempValue > 10) {
            alert(`최소값은 0.1이상으로 작성하여주세요.\n최대값은 10이하로 작성하여주세요. `);
            return;
        }

        const objData = {
            tempStay: parseFloat(tempValue)
        }
        console.log(objData);
        const tempRes = await axios.put(`${process.env.REACT_APP_SERVER_URL}/temp`, objData, {
            headers: {
                Authorization: `${token}`,
                'X-Fishbowl-Token': fishbowlToken,
            },
        });
        console.log(tempRes.data);

    }

    return (
        <div className={`${tempModalStyle.modalWrap} ${activeVal ? tempModalStyle.active : ""}`}>
            <div className={tempModalStyle.modal}>
                <div className={tempModalStyle.close}>
                    <span onClick={() => { activeOnOff(); setTempValue(""); }}>X</span>
                </div>
                <div className={tempModalStyle.settingWrap}>
                    <div className={tempModalStyle.title}>
                        <h2>온도 설정</h2>
                    </div>
                    <div className={tempModalStyle.formBox}>
                        <form onSubmit={(e) => { tempSubmit(e) }}>
                            <div className={tempModalStyle.content}>
                                <label>설정 온도</label>
                                <input type='text' required value={tempValue} onChange={(e) => { setTempValue(e.target.value) }}></input>
                            </div>
                            <Button type={"submit"} content={"저장"} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TempModal