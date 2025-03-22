import React from 'react'

import detailHeaderStyle from './detailHeader.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

function DetailHeader() {

  const navigate = useNavigate();

  return (
    <div className={detailHeaderStyle.detailHeader}>
      <FontAwesomeIcon onClick={()=>{navigate(-1);}} className={detailHeaderStyle.back} icon={faChevronLeft}/>
    </div>
  )
}

export default DetailHeader