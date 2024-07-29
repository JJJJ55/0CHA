import React from 'react';
import styled from 'styled-components';
import { ReactComponent as back } from '../../asset/img/svg/back.svg';
import IconSvg from '../Common/IconSvg';
import Button from '../Common/Button';
import Input from '../Common/Input';

import Image from '../Common/Image';
import test from '../../asset/img/testImg.png';
import { ReactComponent as alarm } from '../../asset/img/svg/alram.svg';
import { ReactComponent as message } from '../../asset/img/svg/message.svg';


const s = {
  Container: styled.section`
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin: 15px 0px; */
    padding: 0px 15px;
  `,
  
};

const SnsHeader = (): JSX.Element => {

  return (
    <s.Container>
      
      <Image
        width="8.9vw"
        height="8.9vw"
        src={test}
      />
        
      <Input
        width="60%"
        height="35px"
        placeholder="검색"
      />
      <IconSvg
          width="25"
          height="25"
          color="#ffffff"
          Ico={alarm}
      />
      <IconSvg
          width="25"
          height="25"
          color="#ffffff"
          Ico={message}
      />
    </s.Container>
  );
};

export default SnsHeader;
