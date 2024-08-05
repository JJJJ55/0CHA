import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Common/Button';
import Header from '../../../components/Common/Header';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  `,
  ResultArea: styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.formBgColor};
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  `,
  Message: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
    margin-bottom: 20px;
    width: 100%;
    text-align: left;
    font-weight: 500;
  `,
  Email: styled.span`
    color: ${(props) => props.theme.mainColor};
    font-size: 24px;
    margin-bottom: 80px;
    width: 100%;
    text-align: left;
    font-weight: 700;
  `,
  BtnArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
  Button: styled(Button)`
    width: 48%;
    height: 40px;
    border-radius: 5px;
  `,
};

const FindEmailResultPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };
  const email = 'exam***@gmail.com'; // 실제 이메일 받아오기
  const name = '성이름'; // 실제 이름 받아오기

  return (
    <s.Container>
      <Header text="이메일 찾기" />
      <s.ResultArea>
        <s.Message children={`${name}님의 이메일은`} />
        <s.Email>
          {email}
          <s.Message children="입니다." />
        </s.Email>
        <s.BtnArea>
          <Button
            width="48%"
            height="40px"
            onClick={() => handleMovePage('../password')}
            children="비밀번호 찾기"
            bold="500"
          />
          <Button
            width="48%"
            height="40px"
            type="main"
            onClick={() => handleMovePage('../../login')}
            children="로그인"
            bold="500"
          />
        </s.BtnArea>
      </s.ResultArea>
    </s.Container>
  );
};

export default FindEmailResultPage;
