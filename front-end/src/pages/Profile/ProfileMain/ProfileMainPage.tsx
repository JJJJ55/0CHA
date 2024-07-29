import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Common/Button';
import test from '../../../asset/img/testImg.png';
import Header from '../../../components/Common/Header';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  `,
  ProfileArea: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 30px;
  `,
  ProfileImage: styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  `,
  ProfileDetails: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Username: styled.p`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    margin-bottom: 5px;
  `,
  Nickname: styled.p`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    margin-bottom: 5px;
  `,
  Email: styled.p`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    margin-bottom: 20px;
  `,
  ButtonArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  `,
  ProfileButton: styled(Button)`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: #ccff33; /* Button color */
    color: #000; /* Text color */
  `,
  InfoArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  InfoItem: styled.div`
    width: 100%;
    padding: 15px 20px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  `,
  InfoText: styled.p`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
  Arrow: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
  InfoHeader: styled.p`
    text-align: left;
    width: 100%;
    color: ${(props) => props.theme.textColor2};
    margin-bottom: 5px;
    font-size: 14px;
  `,
};

const ProfileMainPage = (): JSX.Element => {
  // 사용자 정보 하드코딩 (예시)
  const user = {
    name: '성이름',
    nickname: 'it_is_me',
    email: 'example@gmail.com',
    profileImage: test,
  };

  const handleEditProfile = () => {
    alert('프로필 수정 페이지로 이동');
  };

  const handleEditInfo = () => {
    alert('내 정보 수정 페이지로 이동');
  };

  const handleChangePassword = () => {
    alert('비밀번호 변경 페이지로 이동');
  };

  const handleDeleteAccount = () => {
    alert('회원 탈퇴 페이지로 이동');
  };

  return (
    <s.Container>
      <Header />
      <s.ProfileArea>
        <s.ProfileImage src={user.profileImage} alt="프로필 이미지" />
        <s.ProfileDetails>
          <s.Username children={user.name} />
          <s.Nickname children={user.nickname} />
          <s.Email children={user.email} />
        </s.ProfileDetails>
      </s.ProfileArea>
      <s.ButtonArea>
        <s.ProfileButton onClick={handleEditProfile} children="프로필 수정" />
      </s.ButtonArea>
      <s.InfoHeader children="내 정보 관리" />
      <s.InfoArea>
        <s.InfoItem onClick={handleEditInfo}>
          <s.InfoText children="내 정보 수정" />
          <s.Arrow>›</s.Arrow>
        </s.InfoItem>
        <s.InfoItem onClick={handleChangePassword}>
          <s.InfoText children="비밀번호 변경" />
          <s.Arrow>›</s.Arrow>
        </s.InfoItem>
        <s.InfoItem onClick={handleDeleteAccount}>
          <s.InfoText children="회원 탈퇴" />
          <s.Arrow>›</s.Arrow>
        </s.InfoItem>
      </s.InfoArea>
    </s.Container>
  );
};

export default ProfileMainPage;
