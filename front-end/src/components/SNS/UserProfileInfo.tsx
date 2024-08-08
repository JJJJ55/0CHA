import React from 'react';
import styled from 'styled-components';

import Button from '../Common/Button';
import Image from '../Common/Image';

import test from '../../asset/img/testImg.png';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    padding: 0 15px;
  `,
  ProfileImage: styled.div`
    margin-right: 35px;
  `,
  ProfileButtonArea: styled.div`
    width: 100%;
    max-width: 270px;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  UserName: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 500;
  `,
  ProfileButton: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
  `,
  ProfileTopArea: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 300px;
    min-width: 150px;
    cursor: default;
  `,
  ProfileBottomArea: styled.div`
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 100%;
    max-width: 270px;
    min-width: 150px;
    cursor: default;
  `,
  UserStat: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  UserStatTitle: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
  `,
  UserStatCnt: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 700;
    margin-top: 10px;
  `,
};

interface UserProfileInfoProps {
  isCurrentUser: boolean;
  userName?: string;
  postCnt?: number;
  followingCnt?: number;
  followerCnt?: number;
}

const UserProfileInfo = (props: UserProfileInfoProps): JSX.Element => {
  const { isCurrentUser, userName, postCnt, followingCnt, followerCnt } = props;
  const naviagate = useNavigate();
  const handleMovePage = (path: string): void => {
    naviagate(path);
  };
  return (
    <s.Container>
      <s.ProfileTopArea>
        <s.ProfileImage>
          <Image width="60px" height="60px" src={test} />
        </s.ProfileImage>
        <s.ProfileButtonArea>
          <s.UserName>{userName}</s.UserName>
          <s.ProfileButton>
            {isCurrentUser === true ? (
              <Button
                width="48%"
                height="30px"
                children="채팅 목록"
                size="14px"
                bold="500"
                onClick={() => handleMovePage('../chat')}
              />
            ) : (
              <Button
                width="48%"
                height="30px"
                children="채팅"
                size="14px"
                bold="500"
                onClick={() => handleMovePage('../../chat/id')}
              />
            )}
            {isCurrentUser === true ? (
              <Button width="48%" height="30px" children="내 정보" size="14px" bold="500" />
            ) : (
              <Button width="48%" height="30px" children="팔로우" size="14px" bold="500" />
            )}
          </s.ProfileButton>
        </s.ProfileButtonArea>
      </s.ProfileTopArea>
      <s.ProfileBottomArea>
        <s.UserStat>
          <s.UserStatTitle>게시글</s.UserStatTitle>
          <s.UserStatCnt>{postCnt}</s.UserStatCnt>
        </s.UserStat>
        <s.UserStat>
          <s.UserStatTitle>팔로워</s.UserStatTitle>
          <s.UserStatCnt>{followerCnt}</s.UserStatCnt>
        </s.UserStat>
        <s.UserStat>
          <s.UserStatTitle>팔로잉</s.UserStatTitle>
          <s.UserStatCnt>{followingCnt}</s.UserStatCnt>
        </s.UserStat>
      </s.ProfileBottomArea>
    </s.Container>
  );
};

export default UserProfileInfo;
