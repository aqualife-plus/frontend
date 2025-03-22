import React from 'react';
import { useForm } from 'react-hook-form';
import loginStyle from './login.module.scss';

import imgs from '../../asset/img/imgs.js';
import LoginInput from '../../components/LoginInput/LoginInput.js';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.js';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Login() {

    const { register, handleSubmit, formState: { errors }, getValues, setError, clearErrors } = useForm();

    const login = async (data) => {
        
        try {
            const loginRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, data);
            const accessToken = loginRes.data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            console.log(accessToken);

            const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/my-info`, {
                headers: {
                    Authorization: `${accessToken}`, // 저장된 토큰을 헤더에 추가
                },
            });

            console.log(userResponse.data);
        } catch (e) {
            console.log(e);
            
            if (e.response && e.response.status === 401) {
                setError("password", {
                    type: "manual",
                    message: "아이디 또는 비밀번호가 틀렸습니다."
                })
            }
        }
    }

    return (
        <main className={loginStyle.main}>
            <div className={loginStyle.container}>
                <h2 className={loginStyle.logoBox}>
                    <Link to={'/'}><img src={imgs.logo.src} alt={imgs.logo.alt}></img></Link>
                </h2>

                <div className={loginStyle.loginWrap}>
                    <form onSubmit={handleSubmit(login)}>
                        <div className={loginStyle.inputBox}>
                            <label className={loginStyle.name}>아이디</label>
                            <input className={loginStyle.inputField}
                                type='text'
                                id='email'
                                placeholder='이메일을 입력하세요'
                                {...register('email', {
                                    required: '이메일 또는 비밀번호를 입력해주세요.'
                                })}
                            />
                        </div>
                        <div className={loginStyle.inputBox}>
                            <label className={loginStyle.name}>비밀번호</label>
                            <input className={loginStyle.inputField}
                                type='password'
                                id='password'
                                placeholder='비밀번호'
                                {...register('password', {
                                    required: '이메일 또는 비밀번호를 입력해주세요.'
                                })}
                            />
                        </div>
                        <div className={loginStyle.errWrap}>
                            {(errors.password || errors.email) && <span className={loginStyle.errMessage}>{errors.password?.message || errors.email?.message}</span>}
                        </div>
                        <ButtonComponent type="submit" content="로그인" />
                    </form>

                    <div className={loginStyle.loginFindBox}>
                        <ul className={loginStyle.loginFindList}>
                            <li><Link to={'/'}>아이디찾기</Link></li>
                            <li><Link to={'/'}>비밀번호찾기</Link></li>
                            <li><Link to={'/signupterms'}>회원가입</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login