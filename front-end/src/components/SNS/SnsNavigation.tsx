import React from 'react';
import styled from 'styled-components';

import Button from '../Common/Button';


const s = {
  Container: styled.section`
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
  `,
  NavigationSelect: styled.select`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 600;
    background-color: #000000;
    border: none;
    line-height: 2;
  `,
  NavigationOption: styled.option`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 600;
  `,
};


const SnsNavigation = (): JSX.Element => {
  return (
    <s.Container>
      <s.NavigationSelect>
        <s.NavigationOption>운동</s.NavigationOption>
        <s.NavigationOption>거래</s.NavigationOption>
      </s.NavigationSelect>
      <Button
      width="45px"
      height="30px"
      type="main"
      children="작성"
      bold="500"
      size="12px"
      />
    </s.Container>
  );
};

export default SnsNavigation;
