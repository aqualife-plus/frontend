import React, { useEffect, useState } from 'react'

import signupTermsStyle from './SignupTerms.module.scss';

import { Store } from '../../store/Store';

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.js';
import TermsItem from '../../components/TermsItem/TermsItem.js';
import { useNavigate } from 'react-router-dom';
import imgs from '../../asset/img/imgs.js';

function Signup() {

    const { activeVal, activeOnOff } = Store();

    const navigate = useNavigate();

    // 약관동의 정보 state값
    const [termsInfo, setTermsInfo] = useState([
        {
            id: "personInfo",
            title: "개인정보 처리방침",
            "content": [
                {
                    "subTitle": "",
                    "subContent": "개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다."
                },
                {
                    "subTitle": "다양한 아쿠아 서비스를 즐겨보세요.",
                    "subContent": "아쿠아는 www.naver.com을 비롯한 ㅇㅇ 도메인의 웹사이트 및 응용프로그램(어플리케이션, 앱)을 통해 정보 검색, 다른 이용자와의 커뮤니케이션, 콘텐츠 제공, 상품 쇼핑 등 여러분의 생활에 편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다. 여러분은 PC, 휴대폰 등 인터넷 이용이 가능한 각종 단말기를 통해 각양각색의 요리해먹장 서비스를 자유롭게 이용하실 수 있으며, 개별 서비스들의 구체적인 내용은 각 서비스 상의 안내, 공지사항, 요리해먹장 웹고객센터(이하 ‘고객센터’) 도움말 등에서 쉽게 확인하실 수 있습니다. 요리해먹장는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만, '청소년보호법' 등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한 등급을 기준으로 이용자를 구분하여 제공하는 서비스의 내용, 이용 시간, 이용 횟수 등을 다르게 하는 등 일부 이용을 제한하는 경우가 있습니다. 자세한 내용은 역시 각 서비스 상의 안내, 공지사항, 고객센터 도움말 등에서 확인하실 수 있습니다. 요리해먹장 서비스에는 기본적으로 본 약관이 적용됩니다만 ㅇㅇ 다양한 서비스를 제공하는 과정에서 부득이 본 약관 외 별도의 약관, 운영정책 등을 적용하는 경우(예, 요리해먹장페이, V LIVE 등)가 있습니다. 그리고 요리해먹장 계열사가 제공하는 특정 서비스의 경우에도(예, LINE, SNOW등) 해당 운영 회사가 정한 고유의 약관, 운영정책 등이 적용될 수 있습니다. 이러한 내용은 각각의 해당 서비스 초기 화면에서 확인해 주시기 바랍니다."
                },
            ],
            checked: false,
            op: true
        }, {
            id: "test",
            title: "개인정보 처리방침",
            checked: false,
            op: true
        },
        {
            "id": "marketing",
            title: "마케팅 수신 동의",
            checked: false,
            op: false
        }
    ])

    const [btnVal, setBtnVal] = useState(true); //  버튼 디세이블드값
    const [allCheckVal, setAllCheckVal] = useState(false) // 전체 동의 값

    // 약관동의 체크 ture&false업데이트 함수
    const checkedUpdate = (e) => {
        const { id, checked } = e.target;

        const data = termsInfo.map((item) => {
            if (item.id === id) {
                return { ...item, checked: checked }
            }
            return item;
        })

        setTermsInfo(data);
    }


    // 온서브미트함수
    const termsCheck = (e) => {
        e.preventDefault();
        console.log(termsInfo);
        navigate("/signup");
    }

    // 약관 전체동의 체크 함수
    const allCheck = (e) => {
        const a = termsInfo.map((item) => ({ ...item, checked: !allCheckVal }));
        setTermsInfo(a);
    }

    // 약관 체크시 op(필수)값이 전부 checked로 되어있다면 버튼disabled의 스테이트값 업데이트 함수
    useEffect(() => {
        setBtnVal(!termsInfo.filter((item) => item.op === true).every((item) => item.checked));
        setAllCheckVal(termsInfo.every((item) => item.checked === true));
    }, [termsInfo])

    return (
        <main className={signupTermsStyle.main}>
            <h2 className={signupTermsStyle.logo}>
                <img onClick={()=>{navigate('/')}} src={imgs.logo.src} alt={imgs.logo.alt}></img>
            </h2>
            <div className={signupTermsStyle.container}>
                <h3 className={signupTermsStyle.title}>서비스 이용을 위해<br />이용 약관 동의가 필요합니다!</h3>
                <form onSubmit={(e) => { termsCheck(e) }}>
                    <div className={signupTermsStyle.allCheckBox}>
                        <input type='checkbox' id='all' checked={allCheckVal} onChange={(e) => { allCheck(e) }}></input>
                        <label htmlFor="all">모두동의</label>
                    </div>
                    <ul className={signupTermsStyle.termsList}>
                        {
                            termsInfo.map((item, index) => (
                                <li key={item.id}>
                                    <input type='checkbox' id={item.id} checked={item.checked} onChange={(e) => { checkedUpdate(e) }}></input>
                                    <label htmlFor={item.id}>{`${item.title} ${item.op ? "(필수)" : "(선택)"}`}</label>
                                    <FontAwesomeIcon onClick={() => { activeOnOff() }} icon={faAngleRight} fixedWidth pull="right" />
                                </li>
                            ))
                        }
                    </ul>
                    <div className={`${signupTermsStyle.termsBox}${activeVal ? "active" : ""}`}>
                        <TermsItem />
                    </div>
                    <ButtonComponent type={"submit"} content={"다음"} disabled={btnVal} />
                </form>
            </div>
        </main>
    )
}

export default Signup