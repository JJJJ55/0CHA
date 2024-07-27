import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Text from '../../../components/Common/Text';
import { ReactComponent as Logo } from '../../../asset/img/svg/0CHA.svg';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding: 20px;
  `,
  Title: styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: end;
    margin-bottom: 30px;
  `,
  SignUpArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  EmailArea: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  `,
  PasswordArea: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  `,
  InfoArea: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
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
  InputButton: styled.div`
    flex-shrink: 0;
  `,
  LoginCheckInput: styled.input`
    accent-color: '#ccff33';
  `,
  LoginLabel: styled.label`
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
  `,
  TextBtnArea: styled.div`
    text-align: center;
    color: ${(props) => props.theme.textColor};
    width: 230px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
  `,
  SnsText: styled.span`
    color: #666666;
    font-size: 14px;
  `,
};
interface dataType {
  email: string;
  verificationCode: string;
  pw: string;
  pwCheck: string;
  username: string;
  nickname: string;
}

const SignUpPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    email: '',
    verificationCode: '',
    pw: '',
    pwCheck: '',
    username: '',
    nickname: '',
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendVerificationCode = () => {
    alert('인증번호가 발송되었습니다.');
  };

  const handleCheckVerificationCode = () => {
    alert('인증번호가 확인되었습니다.');
  };

  const handlecheckDuplicateNickname = () => {
    // 닉네임 중복 확인 로직 작성
    alert('사용할 수 있는 닉네임입니다.');
  };

  return (
    <s.Container>
      <s.SignUpArea>
        <s.EmailArea>
          <s.InputHeader>이메일</s.InputHeader>
          <s.InputArea>
            <s.InputBox>
              <Input
                width="100%"
                height="40px"
                placeholder="이메일을 입력해주세요."
                type="text"
                name="email"
                value={data.email}
                onChange={handleChangeValue}
              />
            </s.InputBox>
            <s.InputButton>
              <Button
                width="80px"
                height="40px"
                type="main"
                children="인증번호 발송"
                onClick={handleSendVerificationCode}
              />
            </s.InputButton>
          </s.InputArea>
          <s.InputHeader>인증번호</s.InputHeader>
          <s.InputArea>
            <s.InputBox>
              <Input
                width="100%"
                height="40px"
                placeholder="인증번호 6자리 입력"
                type="text"
                name="verificationCode"
                value={data.verificationCode}
                onChange={handleChangeValue}
              />
            </s.InputBox>
            <s.InputButton>
              <Button width="80px" height="40px" type="main" children="확인" onClick={handleCheckVerificationCode} />
            </s.InputButton>
          </s.InputArea>
        </s.EmailArea>
        <s.PasswordArea>
          <s.InputHeader>비밀번호</s.InputHeader>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              placeholder="비밀번호"
              margin="5px auto"
              type="password"
              name="pw"
              value={data.pw}
              onChange={handleChangeValue}
            />
          </s.InputArea>
          <s.InputHeader>비밀번호 확인</s.InputHeader>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              placeholder="비밀번호 확인"
              margin="5px auto"
              type="password"
              name="pwCheck"
              value={data.pwCheck}
              onChange={handleChangeValue}
            />
          </s.InputArea>
        </s.PasswordArea>
        <s.InfoArea>
          <s.InputHeader>이름</s.InputHeader>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              name="username"
              placeholder="성함을 입력해주세요"
              type="text"
              margin="5px auto"
              value={data.username}
              onChange={handleChangeValue}
            />
          </s.InputArea>
          <s.InputHeader>닉네임</s.InputHeader>
          <s.InputArea>
            <s.InputBox>
              <Input
                width="100%"
                height="40px"
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                type="text"
                margin="5px auto"
                value={data.username}
                onChange={handleChangeValue}
              />
            </s.InputBox>
            <s.InputButton>
              <Button
                width="80px"
                height="40px"
                type="main"
                children="중복확인"
                onClick={handlecheckDuplicateNickname}
              />
            </s.InputButton>
          </s.InputArea>
          <s.InputHeader>생년월일</s.InputHeader>
          <s.InputArea></s.InputArea>
          <s.InputHeader>전화번호</s.InputHeader>
          <s.InputArea></s.InputArea>
        </s.InfoArea>
      </s.SignUpArea>
    </s.Container>
  );
};

export default SignUpPage;
