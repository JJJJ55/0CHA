import React, { useState } from 'react';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Header from '../../../components/Common/Header';
import TextArea from '../../../components/Common/TextArea';
import Button from '../../../components/Common/Button';
import Image from '../../../components/Common/Image';
import Conversation from '../../../components/SNS/Conversation';

import test from "../../../asset/img/testImg.png";


const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding: 57px 25px 68px 25px;
  `,


};


const ChatListPage = (): JSX.Element => {
  return (
    <>
    <Header text="채팅 목록"/>
    <s.Container>
      <Conversation
        profileImage={test}
        username='stranger_00'
        recentChat='안녕하세여'
      />
      <Conversation
        profileImage={test}
        username='stranger_00'
        recentChat='안녕하세여'
      />
      <Conversation
        profileImage={test}
        username='stranger_00'
        recentChat='안녕하세여'
      />
      <Conversation
        profileImage={test}
        username='stranger_00'
        recentChat='안녕하세여'
      />
    </s.Container>

    <BottomNav/>
    </>
  );
};

export default ChatListPage;