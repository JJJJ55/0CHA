import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Common/Button';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `,
  ResultArea: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.formBgColor};
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  `,
  Message: styled.p`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    margin-bottom: 20px;
  `,
  Email: styled.p`
    color: #ccff33;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 40px;
  `,
  ButtonArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
  Button: styled(Button)`
    width: 48%;
    height: 50px;
    border-radius: 5px;
  `,
};

const FindEmailResultPage = (): JSX.Element => {
  const email = 'exam***@gmail.com'; // 실제 이메일 받아오기
  const name = '성이름'; // 실제 이름 받아오기

  const handleFindPassword = () => {
    // 비밀번호 찾기 페이지로 이동하는 로직 구현
    console.log('비밀번호 찾기 버튼 클릭');
  };

  const handleLogin = () => {
    // 로그인 페이지로 이동하는 로직 구현
    console.log('로그인 버튼 클릭');
  };

  return (
    <s.Container>
      <s.ResultArea>
        <s.Message children={`${name}님의 이메일은`} />
        <s.Email children={email} />
        <s.Message children="입니다." />
        <s.ButtonArea>
          <s.Button onClick={handleFindPassword} children="비밀번호 찾기" />
          <s.Button type="main" onClick={handleLogin} children="로그인" />
        </s.ButtonArea>
      </s.ResultArea>
    </s.Container>
  );
};

export default FindEmailResultPage;
