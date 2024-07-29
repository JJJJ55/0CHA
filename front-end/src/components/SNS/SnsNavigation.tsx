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
  NavigationText: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 700;
  `
  
};

const SnsNavigation = (): JSX.Element => {

  return (
    <s.Container>
      <s.NavigationText>운동</s.NavigationText>
      <Button
      width="15%"
      height="30px"
      type="main"
      children="작성"
      />
    </s.Container>
  );
};

export default SnsNavigation;
