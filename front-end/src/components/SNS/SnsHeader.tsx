import React from 'react';
import styled from 'styled-components';

import IconSvg from '../Common/IconSvg';
import Input from '../Common/Input';
import Image from '../Common/Image';
import { ReactComponent as alarm } from '../../asset/img/svg/alram.svg';
import { ReactComponent as message } from '../../asset/img/svg/message.svg';

import test from '../../asset/img/testImg.png';


const s = {
  Container: styled.section`
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
  `,
};


const SnsHeader = (): JSX.Element => {
  return (
    <s.Container>
      <Image
        width="35px"
        height="35px"
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
