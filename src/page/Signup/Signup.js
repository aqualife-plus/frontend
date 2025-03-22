import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import signupStyle from './signip.module.scss';
import DetailHeader from '../../components/DetailHeader/DetailHeader';
import Button from '../../components/ButtonComponent/ButtonComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  
  const { register, handleSubmit, formState: { errors }, getValues, setError, clearErrors } = useForm();

  const navigate = useNavigate();

  const checkEmailTaken = async (email) => {
    try{
      const emailCheckRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/check-email`, {
        email : email
      });
        if(emailCheckRes.data.success){
          return false;
        } else{
          return true;
        }
        
    }catch(e){
      console.log(e);
    }
  };

  // 회원정보 서버에 post
  const onSubmit = async(data) => {


    const { passwordCheck, ...filterData } = data;

    
    try{
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`,filterData);
      navigate('/');
    } catch(e){
      console.log(e);
    }
  };


  return (
    <main className={signupStyle.main}>
      <DetailHeader />
      <div className={signupStyle.container}>
        <form className={signupStyle.signupFormBox} onSubmit={handleSubmit(onSubmit)}>

          <div className={`${signupStyle.inputBox} ${errors.email ? signupStyle.err : ""}`}>
            <div className={signupStyle.inputFeld}>
              <div className={signupStyle.inputTitle}>
                <label htmlFor="email">이메일</label>
              </div>
              <div className={signupStyle.inputContent}>
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요."
                  {...register('email', {
                    required: '필수항목으로 안채워졌을 시 메세지',
                    pattern: {
                      value: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/,
                      message: '영문 소문자, 숫자만 사용 가능합니다.'
                    },
                    validate: async(emailVal) => {
                      const isEmailTaken = await checkEmailTaken(emailVal);
                      if (isEmailTaken) {
                        return '이미 사용 중인 이메일입니다.';
                      }
                    }
                  })}
                />
              </div>
            </div>
            {errors.email && <span className={signupStyle.errMessage}>{errors.email.message}</span>}
          </div>

          <div className={`${signupStyle.inputBox} ${errors.nickname ? signupStyle.err : ""}`}>
            <div className={signupStyle.inputFeld}>
              <div className={signupStyle.inputTitle}>
                <label htmlFor="nickname">닉네임</label>
              </div>
              <div className={signupStyle.inputContent}>
                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임"
                  {...register('nickname', {
                    required: '필수항목으로 안채워졌을 시 메세지',
                    maxLength: {
                      value: 8,
                      message: "8자 이상은 사용하실 수 없습니다."
                    }
                  })}
                />
              </div>
            </div>
            {errors.nickname && <span className={signupStyle.errMessage}>{errors.nickname.message}</span>}
          </div>

          <div className={`${signupStyle.inputBox} ${errors.password ? signupStyle.err : ''}`}>
            <div className={signupStyle.inputFeld}>
              <div className={signupStyle.inputTitle}>
                <label htmlFor="password">비밀번호</label>
              </div>
              <div className={signupStyle.inputContent}>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: '필수항목으로 안채워졌을 시 메세지',
                    minLength: {
                      value: 6,
                      message: '6자리 이상 비밀번호를 입력해주세요.'
                    }
                  })}
                />
              </div>
            </div>
            {errors.password && <span className={signupStyle.errMessage}>{errors.password.message}</span>}
          </div>

          <div className={`${signupStyle.inputBox} ${errors.passwordCheck ? signupStyle.err : ''}`}>
            <div className={signupStyle.inputFeld}>
              <div className={signupStyle.inputTitle}>
                <label htmlFor="passwordCheck">비밀번호 확인</label>
              </div>
              <div className={signupStyle.inputContent}>
                <input
                  type="password"
                  id="passwordCheck"
                  {...register('passwordCheck', {
                    required: '필수항목으로 안채워졌을 시 메세지',
                    validate: (val) => {
                      if (val !== getValues("password")) {
                        return '비밀번호가 일치하지 않습니다.';
                      }
                    }
                  })}
                />
              </div>
            </div>
            {errors.passwordCheck && <span className={signupStyle.errMessage}>{errors.passwordCheck.message}</span>}
          </div>
          <Button type="submit" content="회원가입" />
        </form>
      </div>
    </main>
  );
}

export default Signup;
