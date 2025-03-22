import React from 'react'

import detailEditStyle from './detailEdit.module.scss';
import DetailHeader from '../../components/DetailHeader/DetailHeader';
import imgs from '../../asset/img/imgs';
import Button from '../../components/ButtonComponent/ButtonComponent';

function DetailEdit() {
    return (
        <main className={detailEditStyle.main}>
            <DetailHeader/>
            <div className={detailEditStyle.container}>
                <div className={detailEditStyle.imgWrap}>
                    <div className={detailEditStyle.imgBox}>
                        <img src={imgs.test.src}></img>
                    </div>
                </div>
                <form className={detailEditStyle.formWrap}>
                    <div className={detailEditStyle.inputBox}>
                        <label>어항 이름</label>
                        <input type='text' name='name'></input>
                    </div>
                    <div className={detailEditStyle.inputBox}>
                        <label>어항 간단 소개</label>
                        <input type='text' name='info'></input>
                    </div>
                    <Button type={"button"} content={"저장"}/>
                </form>
            </div>
        </main>
    )
}

export default DetailEdit