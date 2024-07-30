import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Common/Button';
import test from '../../../asset/img/testImg.png';
import Header from '../../../components/Common/Header';
import Input from '../../../components/Common/Input';

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
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 30px;
  `,
  ProfileImage: styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
    cursor: pointer;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  InputHeader: styled.p`
    text-align: left;
    width: 100%;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 5px;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  InputField: styled.input`
    width: 100%;
    height: 40px;
    padding: 0 10px;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 5px;
    background-color: ${(props) => props.theme.inputBgColor};
    color: ${(props) => props.theme.textColor};
  `,
  ButtonArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
  `,
  ProfileButton: styled(Button)`
    width: 49%;
    height: 40px;
    border-radius: 10px;
    background-color: #ccff33; /* Button color */
    color: #000; /* Text color */
  `,
  CancelButton: styled(Button)`
    width: 49%;
    height: 40px;
    border-radius: 10px;
    background-color: #000; /* Button color */
    color: #ccff33; /* Text color */
  `,
};

const ProfileUpdatePage = (): JSX.Element => {
  const [user, setUser] = useState({
    nickname: 'it_is_me',
    profileImage: test,
  });

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, nickname: event.target.value });
  };

  const handleCheckDuplicate = () => {
    alert('닉네임 중복 확인');
  };

  const handleCancel = () => {
    alert('이전 페이지로 이동');
  };

  const handleSave = () => {
    alert('수정 완료');
  };

  return (
    <s.Container>
      <Header />
      <s.ProfileArea>
        <label htmlFor="profileImage">
          <s.ProfileImage src={user.profileImage} alt="프로필 이미지" />
        </label>
        <input
          type="file"
          id="profileImage"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleProfileImageChange}
        />
        <s.InputHeader children="닉네임" />
        <s.InputArea>
          <s.InputBox>
            <Input
              width="100%"
              height="40px"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              type="text"
              margin="5px auto"
              value={user.nickname}
              onChange={handleNicknameChange}
            />
          </s.InputBox>
          <Button onClick={handleCheckDuplicate} type="main" width="80px" height="40px" children="중복확인" />
        </s.InputArea>
        <s.ButtonArea>
          <s.CancelButton onClick={handleCancel} children="이전" />
          <s.ProfileButton onClick={handleSave} children="수정완료" />
        </s.ButtonArea>
      </s.ProfileArea>
    </s.Container>
  );
};

export default ProfileUpdatePage;
