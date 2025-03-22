import React from 'react'

// 버튼 컴포넌트 스타일
import buttonStyle from './buttonComponent.module.scss';

function Button({type, content, disabled, fun}) {
  return (
    <div>
        <button onClick={fun} className={buttonStyle.defaultBtn} type={type} disabled={disabled}>{content}</button>
    </div>
  )
}

export default Button