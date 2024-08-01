import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Header from '../../../components/Common/Header';
import PhoneNumberInput from '../../../components/LoginBefore/phoneNumberInput';
import EmailArea from '../../../components/LoginBefore/EmailArea';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    justify-content: center;
    align-items: center;
  `,
  FindPasswordArea: styled.div`
    width: 100%;
    height: 100%; // 가운데
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 0 80px;
  `,
  InfoArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  `,
  InputArea: styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `,
  InfoNameBox: styled.div`
    width: 90%;
    display: flex;
    justify-content: left;
  `,
  InputHeader: styled.p`
    text-align: left;
    color: ${(props) => props.theme.textColor};
    width: 80px;
    margin-bottom: 5px;
    font-size: 16px;
  `,
  ErrorText: styled.p`
    color: red;
    font-size: 12px;
    margin-left: 10px;
    margin-top: 5px;
  `,
  BtnArea: styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  InputBtn: styled.div`
    flex-shrink: 0;
  `,
  PhoneArea: styled.div`
    width: 90%;
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

  // 이름
  const [usernameError, setUsernameError] = useState('');
  // 전화번호
  const [phoneNumberError, setPhoneNumberError] = useState('');
  // 이메일
  const [emailError, setEmailError] = useState('');
  // 인증번호
  const [verificationBtnText, setVerificationBtnText] = useState('인증번호 발송');
  const [verificationBtnType, setVerificationBtnType] = useState('main');
  const [confirmBtnText, setConfirmBtnText] = useState('확인');
  const [confirmBtnType, setConfirmBtnType] = useState('main');
  const [returnCode, setReturnCode] = useState('0000000'); // 7자로 설정하여 못 뚫게 함

  // 계정 존재 여부
  const [isExisted, setIsExisted] = useState(false);
  // 인증 완료 여부
  const [isVerified, setIsVerified] = useState(false);

  // 전화번호 유효성 검사(두 필드를 한 번에 검사하기 위함)
  useEffect(() => {
    const validatePhoneNumber = () => {
      const { phonePart2, phonePart3 } = data;
      if (
        (phonePart2 && phonePart2.length !== 4) ||
        (phonePart3 && phonePart3.length !== 4) ||
        (!phonePart2 && phonePart3) ||
        (phonePart2 && !phonePart3)
      ) {
        setPhoneNumberError('휴대전화 앞, 뒤 4자리를 정확하게 입력해 주세요.');
      } else {
        setPhoneNumberError('');
      }
    };

    validatePhoneNumber();
  }, [data.phonePart2, data.phonePart3]);

  // 유효성 검사
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 이름 필드에 대한 유효성 검사: 한글 또는 영문만 허용, 최대 20자까지 입력 가능
    if (name === 'username') {
      const usernameRegex = /^[a-zA-Z가-힣]*$/;
      // 한 글자는 입력 불가
      if (!usernameRegex.test(value) || value.length === 1) {
        setUsernameError('2~20자 내 한글/영문만 입력하세요.');
      } else {
        setUsernameError('');
      }
      if (value.length > 20) {
        return; // 20자를 초과할 경우 입력을 막음
      }
    }

    // 전화번호 두 번째와 세 번째 필드에 대해 숫자만 입력 가능 및 4자리로 제한
    if (name === 'phonePart2' || name === 'phonePart3') {
      const phoneNumberRegex = /^\d*$/;
      if (!phoneNumberRegex.test(value)) {
        return;
      }
      if (value.length > 4) {
        return;
      }
    }

    // 이메일 필드에 대한 유효성 검사
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && value.length > 0) {
        setEmailError('유효한 이메일 주소를 입력하세요.');
      } else {
        setEmailError('');
      }
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

  // 추후 회원정보를 확인하고 인증번호를 받아오는 과정 추가 필요
  const handleSendVerificationCode = () => {
    // 회원정보 확인 로직 작성할 부분
    console.log(data);
    // 회원정보 있을 경우 수행될 부분
    setIsExisted(true);
    alert('인증번호가 발송되었습니다.');
    setReturnCode('000000'); // 인증번호 설정
    setVerificationBtnText('재전송');
    setVerificationBtnType('sub');
  };

  // 인증번호 확인
  const handleCheckVerificationCode = () => {
    const { verificationCode } = data;
    console.log(returnCode, verificationCode);
    if (verificationCode === returnCode) {
      setIsVerified(true);
      setConfirmBtnText('인증완료');
      setConfirmBtnType('sub');
      alert('인증번호가 확인되었습니다.');
    } else {
      alert('인증번호가 틀립니다.');
    }
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
      <Header text="비밀번호 찾기" />
      <s.FindPasswordArea>
        <s.InfoArea>
          <s.InfoNameBox>
            <s.InputHeader children="이름" />
            {usernameError && <s.ErrorText>{usernameError}</s.ErrorText>}
          </s.InfoNameBox>
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
          <s.InfoNameBox>
            <s.InputHeader children="전화번호" />
            {phoneNumberError && <s.ErrorText>{phoneNumberError}</s.ErrorText>}
          </s.InfoNameBox>
          <s.PhoneArea>
            <PhoneNumberInput phonePart2={data.phonePart2} phonePart3={data.phonePart3} onChange={handleChangeValue} />
          </s.PhoneArea>
          <EmailArea
            email={data.email}
            verificationCode={data.verificationCode}
            emailError={emailError}
            verificationBtnText={verificationBtnText}
            verificationBtnType={verificationBtnType}
            confirmBtnText={confirmBtnText}
            confirmBtnType={confirmBtnType}
            onChange={handleChangeValue}
            onSendVerificationCode={handleSendVerificationCode}
            onCheckVerificationCode={handleCheckVerificationCode}
          />
        </s.InfoArea>
        {isVerified && (
          <s.BtnArea>
            <Button width="48%" height="40px" children="이전" onClick={handlePrevious} />
            <Button width="48%" height="40px" type="main" children="비밀번호 변경" onClick={handleSubmit} />
          </s.BtnArea>
        )}
      </s.FindPasswordArea>
    </s.Container>
  );
};

export default FindPasswordPage;
