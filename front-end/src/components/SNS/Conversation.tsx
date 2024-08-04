import React from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';


const s = {
  Container: styled.div`
    height: 45px;
    display: flex;
    align-items: center;
    margin: 20px 0;
  `,
  Username: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 400;
    margin-left: 15px;
    margin-bottom: 10px;
  `,
  RecentChat: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 600;
    margin-left: 15px;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
  `,
};


interface CommentProps {
  profileImage: string;
  username: string;
  recentChat: string;
}


const Conversation = (props: CommentProps): JSX.Element => {
  const { profileImage, username, recentChat } = props;
  return (
    <s.Container>
      <Image
        width="45px"
        height="45px"
        src={profileImage}
      />
      <s.Content>
        <s.Username>{username}</s.Username>
        <s.RecentChat>{recentChat}</s.RecentChat>
      </s.Content>
    </s.Container>
  )
};

export default Conversation;