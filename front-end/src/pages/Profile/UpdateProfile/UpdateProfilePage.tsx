import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Common/Button';
import test from '../../../asset/img/testImg.png';
import Header from '../../../components/Common/Header';
import Input from '../../../components/Common/Input';
import BottomNav from '../../../components/Common/BottomNav';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;

    align-items: center;
  `,
  ProfileArea: styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 5px 70px;
  `,
  ProfileImage: styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 60px;
    cursor: pointer;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
  `,
  InputHeader: styled.p`
    text-align: left;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 5px;
    font-size: 16px;
    border: 1px solid red;
    display: inline-block; /* 콘텐츠 크기에 맞게 너비 조정 */
    white-space: nowrap; /* 줄바꿈 방지 */
  `,
  ErrorText: styled.p`
    color: red;
    font-size: 12px;
    margin-left: 10px;
    border: 1px solid green;
  `,
  InfoNameBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  ButtonArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  `,
  ProfileButton: styled(Button)`
    width: 48%;
    height: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
  `,
  CancelButton: styled(Button)`
    width: 48%;
    height: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.btnTextColor};
    color: ${(props) => props.theme.mainColor};
  `,
};

interface User {
  nickname: string;
  profileImage: string;
}

const UpdateProfilePage = (): JSX.Element => {
  const [user, setUser] = useState<User>({
    nickname: 'it_is_me',
    profileImage: test,
  });

  const [tempNickname, setTempNickname] = useState<string>(user.nickname);
  const [isNicknameConfirmed, setIsNicknameConfirmed] = useState<boolean>(false);
  // 닉네임
  const [nicknameError, setNicknameError] = useState('');
  const nicknameChanged = useRef(false);

  useEffect(() => {
    if (nicknameChanged.current && user.nickname === tempNickname) {
      alert(`닉네임이 성공적으로 ${tempNickname}으로 변경되었습니다.`);
    }
  }, [user.nickname, tempNickname]);

  // 이미지 핸들러(나중에 저장 로직 추가해야 함)
  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 닉네임 핸들러
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNicknameConfirmed(false); // 닉네임이 수정되면 중복 확인 상태를 초기화
    setTempNickname(e.target.value); // 현재 수정중인 닉네임 값
    const nicknameRegex = /^[a-zA-Z0-9_]*$/;
    if (e.target.value.length === 0) {
      setNicknameError('');
    } else if (!nicknameRegex.test(e.target.value) || e.target.value.length < 5) {
      setNicknameError('닉네임은 5~10자 영문/숫자/_만 사용 가능합니다.');
    } else {
      setNicknameError('');
    }
    // 10글자 초과 입력은 불가
    if (e.target.value.length > 10) {
      return;
    }
  };
  // 닉네임 중복 확인 핸들러
  const handleCheckDuplicate = () => {
    // 닉네임 중복 확인 로직 (예: API 호출)
    // 중복 확인이 성공적으로 완료되었다면 상태를 true로 변경
    if (nicknameError === '' && tempNickname.length !== 0) {
      setIsNicknameConfirmed(true);
      alert('사용할 수 있는 닉네임입니다.');
    } else {
      alert('사용할 수 없는 닉네임입니다.');
    }
  };

  const handleCancel = () => {
    alert('이전 페이지로 이동');
  };

  const handleSave = () => {
    // 이미지 저장 로직 구현해야 함
    if (isNicknameConfirmed) {
      setUser({ ...user, nickname: tempNickname });
      nicknameChanged.current = true;
    } else {
      alert('닉네임 중복 확인을 해주세요.');
    }
  };

  return (
    <s.Container>
      <Header text="프로필 수정" />
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
        <s.InfoNameBox>
          <s.InputHeader children="닉네임" />
          {nicknameError && <s.ErrorText>{nicknameError}</s.ErrorText>}
        </s.InfoNameBox>
        <s.InputArea>
          <s.InputBox>
            <Input
              width="100%"
              height="40px"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              type="text"
              margin="5px auto"
              value={tempNickname}
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
      <BottomNav />
    </s.Container>
  );
};

export default UpdateProfilePage;
