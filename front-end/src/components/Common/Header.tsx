import React from 'react';
import styled from 'styled-components';
import { ReactComponent as back } from '../../asset/img/svg/back.svg';
import IconSvg from './IconSvg';
import Button from './Button';

const s = {
  Container: styled.section`
    max-width: 800px;
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
    position: fixed;
  `,
  BasicArea: styled.div`
    width: 200px;
    height: 100%;
    margin: 0 10px;
    display: flex;
    align-items: center;
  `,
  Title: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
  `,
};

interface HeaderProps {
  text?: string;
  children?: React.ReactNode;
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <s.Container>
      <s.BasicArea>
        <IconSvg width="25" height="25" Ico={back} />
        <s.Title>{props.text}</s.Title>
      </s.BasicArea>
      {props.children}
    </s.Container>
  );
};

export default Header;
