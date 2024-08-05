import React, { useState } from 'react';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Button from '../../../components/Common/Button';
import Image from '../../../components/Common/Image';
import IconSvg from '../../../components/Common/IconSvg';
import Input from '../../../components/Common/Input';
import Chat from '../../../components/SNS/Chat';
import { ReactComponent as back } from '../../../asset/img/svg/back.svg';

import test from '../../../asset/img/testImg.png';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding: 57px 25px 138px 25px;
  `,
  ProfileText: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 400;
    margin-left: 15px;
  `,
  ProfileArea: styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
  `,
  ChatHeader: styled.section`
    max-width: 800px;
    width: 100%;
    height: 57px;
    position: fixed;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: #000000;
  `,
  InputArea: styled.div`
    height: 70px;
    background-color: black;
    width: 100%;
    display: flex;
    display: flex;
    align-items: center;
  `,
  Input: styled.div`
    flex: 1 0 auto;
  `,
  Send: styled.div`
    width: 100%;
    max-width: 800px;
    padding: 0 15px;
    position: fixed;
    bottom: 68px;
  `,
};

const ChatPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (): void => {
    navigate('../../profile/id');
  };
  return (
    <>
      <s.ChatHeader>
        <IconSvg width="25" height="25" Ico={back} cursor="pointer" />
        <s.ProfileArea onClick={handleMovePage}>
          <Image width="40px" height="40px" src={test} />
          <s.ProfileText>stranger_00</s.ProfileText>
        </s.ProfileArea>
      </s.ChatHeader>
      <s.Container>
        <Chat isMyChat={true} content="채팅입니다" />
        <Chat isMyChat={false} content="야호" />
      </s.Container>
      <s.Send>
        <s.InputArea>
          <s.Input>
            <Input width="100%" height="40px" placeholder="내용 입력" />
          </s.Input>
          <Button width="64px" height="40px" children="전송" size="14px" bold="500" type="main" margin="0 0 0 10px" />
        </s.InputArea>
      </s.Send>
      <BottomNav />
    </>
  );
};

export default ChatPage;
