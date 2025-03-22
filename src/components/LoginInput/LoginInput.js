import React from 'react';

import LoginInputStyle from './loginInput.module.scss';

function LoginInput({label, type, placeholder }) {
  return (
    <div className={LoginInputStyle.inputBox}>
        <p className={LoginInputStyle.name}>{label}</p>
        <input className={LoginInputStyle.inputField} type={type} placeholder={placeholder}></input>
    </div>
  )
}

export default LoginInput