import React from 'react';
import styled from 'styled-components';
import { ReactComponent as back } from '../../asset/img/svg/back.svg';
import IconSvg from './IconSvg';
import Button from './Button';

const s = {
  Container: styled.section`
    width: 100%;
    height: 57px;
    border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  BasicArea: styled.div`
    width: 200px;
    height: 100%;
    margin: 0 10px;
    display: flex;
    align-items: center;
    border: 1px solid yellow;
  `,
  Title: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
  `,
};

const Header = (): JSX.Element => {
  return (
    <s.Container>
      <s.BasicArea>
        <IconSvg width="25" height="25" Ico={back} />
        <s.Title>테스트</s.Title>
      </s.BasicArea>
      <Button width="80px" height="40px" children="불러오기" onClick={() => {}} size="14px" margin="0 20px 0 0" />
    </s.Container>
  );
};

export default Header;
