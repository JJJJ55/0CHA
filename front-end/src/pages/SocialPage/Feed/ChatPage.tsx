import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router';
import BottomNav from '../../../components/Common/BottomNav';
import Button from '../../../components/Common/Button';
import Image from '../../../components/Common/Image';
import IconSvg from '../../../components/Common/IconSvg';
import Input from '../../../components/Common/Input';
import Chat from '../../../components/SNS/Chat';
import { ReactComponent as back } from '../../../asset/img/svg/back.svg';
import { UserPage, WsOn } from '../../../lib/api/sns-api';
import testImg from '../../../asset/img/testImg.png';

import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

// 스타일드 컴포넌트를 사용해 UI 요소 스타일링
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
    background-color: ${(props) => props.theme.bgColor};
  `,
  InputArea: styled.div`
    height: 70px;
    background-color: ${(props) => props.theme.bgColor};
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

// 채팅 페이지 컴포넌트
const ChatPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams<{ userId: string }>();

  // 상태 변수: 닉네임과 프로필 이미지
  const [nickname, setNickname] = useState<string | null>(location.state?.nickname || null);
  const [profileImage, setProfileImage] = useState<string | null>(location.state?.profileImage || null);

  // 상태 변수: 메시지 목록과 현재 작성 중인 메시지
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);

  // 로컬 스토리지에서 현재 사용자 ID 가져오기
  const currentUserId = (() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.id;
    }
    return null;
  })();

  // 사용자 정보 로드 및 초기 설정
  useEffect(() => {
    if (!currentUserId || userId === String(currentUserId)) {
      // userId가 자신의 id와 같거나 currentUserId가 없으면 이전 페이지로 리디렉션
      navigate(-1);
      return;
    }

    const fetchUserInfo = async () => {
      if (userId && !location.state) {
        try {
          await UserPage(
            parseInt(userId, 10),
            (resp) => {
              setProfileImage(
                'https://i11b310.p.ssafy.io/images/' + resp.data.profileImage.split('/home/ubuntu/images/')[1],
              );
              setNickname(resp.data.nickname);
            },
            (err) => {
              console.log(err);
            },
          );
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [userId, location.state]);

  const getWs = async () => {
    await WsOn(
      (resp) => {
        console.log(resp.data);
      },
      (err) => {
        console.log(err);
      },
    );
  };
  getWs();
  // WebSocket 연결 설정
  useEffect(() => {
    // alert('추후 제공 예정입니다.');
    // navigate(-1);
    // return;
    // JWT 토큰 가져오기
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      console.error('No access or refresh token found in localStorage');
      return;
    }

    // SockJS와 STOMP 클라이언트 초기화
    const socket = new SockJS('/proxy/ws'); // SockJS 엔드포인트 설정
    const client = new Client({
      webSocketFactory: () => socket, // SockJS를 WebSocket으로 사용
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`, // JWT 토큰을 Authorization 헤더에 포함
        RefreshToken: refreshToken, // RefreshToken을 헤더에 포함
      },
      debug: (str: string) => {
        console.log(str); // 디버그 메시지 출력
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);

        // 메시지를 구독하는 예제
        client.subscribe(`/topic/chat/${userId}`, (message: IMessage) => {
          console.log('Received message:', message.body);
          showMessage(JSON.parse(message.body));
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame.headers['message']);
      },
    });

    // STOMP 클라이언트 활성화
    client.activate();
    setStompClient(client);

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      if (client) {
        client.deactivate();
        console.log('Disconnected');
      }
    };
  }, [userId]);

  // 메시지를 화면에 표시하는 함수
  const showMessage = (message: { sender: string; content: string }) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // 메시지를 전송하는 함수
  const sendMessage = () => {
    if (messageContent && stompClient) {
      stompClient.publish({
        destination: `/app/chat/${userId}`, // 메시지를 전송할 목적지
        body: JSON.stringify({
          sender: currentUserId,
          content: messageContent,
        }),
      });
      setMessageContent(''); // 전송 후 입력 필드 초기화
    }
  };

  // 프로필 페이지로 이동하는 함수
  const handleMovePage = (): void => {
    navigate(`/sns/profile/${userId}`);
  };

  // 메시지 입력 필드 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
  };

  return (
    <>
      {/* 채팅 헤더 */}
      <s.ChatHeader>
        <IconSvg width="25" height="25" Ico={back} cursor="pointer" onClick={() => navigate(-1)} />
        <s.ProfileArea onClick={handleMovePage}>
          <Image width="40px" height="40px" src={profileImage || testImg} />
          <s.ProfileText>{nickname}</s.ProfileText>
        </s.ProfileArea>
      </s.ChatHeader>

      {/* 채팅 메시지 목록 */}
      <s.Container>
        {messages.map((msg, index) => (
          <Chat key={index} isMyChat={msg.sender === String(currentUserId)} content={msg.content} />
        ))}
      </s.Container>

      {/* 메시지 입력 및 전송 버튼 */}
      <s.Send>
        <s.InputArea>
          <s.Input>
            <Input width="100%" height="40px" placeholder="내용 입력" value={messageContent} onChange={handleChange} />
          </s.Input>
          <Button
            width="64px"
            height="40px"
            children="전송"
            size="14px"
            bold="500"
            type="main"
            margin="0 0 0 10px"
            onClick={sendMessage}
          />
        </s.InputArea>
      </s.Send>

      {/* 하단 네비게이션 바 */}
      <BottomNav />
    </>
  );
};

export default ChatPage;
