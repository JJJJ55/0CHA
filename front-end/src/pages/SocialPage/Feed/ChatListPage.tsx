import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Header from '../../../components/Common/Header';
import TextArea from '../../../components/Common/TextArea';
import Button from '../../../components/Common/Button';
import Image from '../../../components/Common/Image';
import Conversation from '../../../components/SNS/Conversation'; // 최근 채팅

import test from '../../../asset/img/testImg.png';
import { SnsChatList } from '../../../lib/api/sns-api';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding: 57px 25px 68px 25px;
  `,
};

interface Chat {
  id: number;
  profileImage: string | null;
  nickname: string;
  recentChat: string;
  chatId: number;
}

const ChatListPage = (): JSX.Element => {
  const [chatList, setChatList] = useState<Chat[]>([]);

  const getChatList = async () => {
    await SnsChatList(
      0,
      (resp) => {
        console.log(resp.data);
        setChatList(resp.data);
      },
      (err) => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getChatList();
  }, []);
  return (
    <>
      <Header text="채팅 목록" />
      <s.Container>
        {chatList.map((chat) => (
          <Conversation
            key={chat.id}
            profileImage={chat.profileImage || test} // profileImage가 null이면 기본 이미지 사용
            nickname={chat.nickname}
            recentChat={chat.recentChat || '최근 메시지가 없습니다.'}
            chatId={chat.chatId || 1}
            userId={chat.id}
          />
        ))}
      </s.Container>

      <BottomNav />
    </>
  );
};

export default ChatListPage;
