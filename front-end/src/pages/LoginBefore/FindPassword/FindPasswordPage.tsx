import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';

// 할 일
// 인증번호 및 이메일 한국어 입력 불가 구현하기

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `,
  FindPasswordArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  PhoneNumberArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  FixedPhoneNumber: styled.div`
    width: 20%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.subColor};
    border: 1px solid ${(props) => props.theme.bgColor};
    border-radius: 8px;
  `,
  PhoneNumberInput: styled(Input)`
    width: 35%;
  `,
  BetweenText: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
  ButtonArea: styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  InputButton: styled.div`
    flex-shrink: 0;
  `,
};

interface dataType {
  username: string;
  phonePart2: string;
  phonePart3: string;
  email: string;
  verificationCode: string;
}

const FindPasswordPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    username: '',
    phonePart2: '',
    phonePart3: '',
    email: '',
    verificationCode: '',
  });

  const [isVerified, setIsVerified] = useState(false);
  const [verificationButtonText, setVerificationButtonText] = useState('인증번호 발송');
  const [verificationButtonType, setVerificationButtonType] = useState('main');

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 전화번호 두 번째와 세 번째 필드에 대해 숫자만 입력 가능 및 4자리로 제한
    if ((name === 'phonePart2' || name === 'phonePart3') && (!/^\d*$/.test(value) || value.length > 4)) {
      return;
    }
    // 인증번호 필드에 대해 6자리로 제한
    if (name === 'verificationCode' && value.length > 6) {
      return;
    }
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSendVerificationCode = () => {
    alert('인증번호가 발송되었습니다.');
    setVerificationButtonText('재전송');
    setVerificationButtonType('sub');
  };

  const handleVerifyCode = () => {
    setIsVerified(true);
    alert('인증번호가 확인되었습니다.');
  };

  const handleSubmit = () => {
    // 제출 로직 작성
    console.log('Form submitted:', data);
    alert('비밀번호 변경 요청이 제출되었습니다.');
  };

  const handlePrevious = () => {
    // 이전 페이지로 이동하는 로직 작성
    console.log('Previous button clicked');
    alert('이전 페이지로 이동합니다.');
  };

  return (
    <s.Container>
      <s.FindPasswordArea>
        <s.InfoArea>
          <s.InputHeader children="이름" />
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              name="username"
              placeholder="이름을 입력해주세요"
              type="text"
              value={data.username}
              onChange={handleChangeValue}
            />
          </s.InputArea>
          <s.InputHeader children="전화번호" />
          <s.PhoneNumberArea>
            <s.FixedPhoneNumber children="010" />
            <s.BetweenText>-</s.BetweenText>
            <s.PhoneNumberInput
              height="40px"
              type="text"
              name="phonePart2"
              placeholder="앞 4자리"
              value={data.phonePart2}
              onChange={handleChangeValue}
            />
            <s.BetweenText>-</s.BetweenText>
            <s.PhoneNumberInput
              height="40px"
              type="text"
              name="phonePart3"
              placeholder="뒤 4자리"
              value={data.phonePart3}
              onChange={handleChangeValue}
            />
          </s.PhoneNumberArea>
          <s.InputHeader children="이메일" />
          <s.InputArea>
            <s.InputBox>
              <Input
                width="100%"
                height="40px"
                name="email"
                placeholder="이메일을 입력해주세요"
                type="text"
                value={data.email}
                onChange={handleChangeValue}
              />
            </s.InputBox>
            <s.InputButton>
              <Button
                width="100px"
                height="40px"
                type={verificationButtonType}
                children={verificationButtonText}
                onClick={handleSendVerificationCode}
              />
            </s.InputButton>
          </s.InputArea>
          <s.InputHeader children="인증번호" />
          <s.InputArea>
            <s.InputBox>
              <Input
                width="100%"
                height="40px"
                name="verificationCode"
                placeholder="인증번호를 입력해주세요"
                type="text"
                value={data.verificationCode}
                onChange={handleChangeValue}
              />
            </s.InputBox>
            <s.InputButton>
              <Button width="100px" height="40px" type="main" children="인증번호 확인" onClick={handleVerifyCode} />
            </s.InputButton>
          </s.InputArea>
        </s.InfoArea>
        {isVerified && (
          <s.ButtonArea>
            <Button width="48%" height="40px" children="이전" onClick={handlePrevious} />
            <Button width="48%" height="40px" type="main" children="비밀번호 변경" onClick={handleSubmit} />
          </s.ButtonArea>
        )}
      </s.FindPasswordArea>
    </s.Container>
  );
};

export default FindPasswordPage;
