import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Text from '../../../components/Common/Text';
import PhoneNumberInput from '../../../components/LoginBefore/phoneNumberInput';
import Header from '../../../components/Common/Header';
import EmailArea from '../../../components/LoginBefore/EmailArea';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
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
    padding: 60px 0 80px;
  `,
  PasswordArea: styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
  `,
  InfoArea: styled.div`
    width: 90%;
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
    width: 90px;
    min-width: 60px;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 5px;
    font-size: 16px;
    border: 1px solid red;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  InputBtn: styled.div`
    flex-shrink: 0;
  `,
  LoginCheckInput: styled.input`
    accent-color: ${(props) => props.theme.mainColor};
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
  SelectBox: styled.select`
    width: 30%;
    height: 40px;
    margin: 5px;
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 600;
    background-color: #000000;
    border: none;
    line-height: 2;
  `,
  Option: styled.option`
    background-color: ${(props) => props.theme.optionBgColor};
    color: ${(props) => props.theme.optionTextColor};
    font-size: 14px;
    font-weight: 600;
    text-align: right;
  `,
  SubBtnArea: styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `,
  ErrorText: styled.p`
    color: red;
    font-size: 12px;
    margin-left: 5px;
  `,
  InfoNameBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
  `,
};

interface dataType {
  email: string;
  verificationCode: string;
  pw: string;
  pwCheck: string;
  username: string;
  nickname: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  phonePart2: string;
  phonePart3: string;
}

const SignUpPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    email: '',
    verificationCode: '',
    pw: '',
    pwCheck: '',
    username: '',
    nickname: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    phonePart2: '',
    phonePart3: '',
  });

  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  // 이메일
  const [emailError, setEmailError] = useState('');
  // 인증번호
  const [verificationBtnText, setVerificationBtnText] = useState('인증번호 발송');
  const [verificationBtnType, setVerificationBtnType] = useState('main');
  const [returnCode, setReturnCode] = useState('0000000'); // 7자로 설정하여 못 뚫게 함
  const [isVerified, setIsVerified] = useState(false); // 인증 여부
  const [confirmBtnText, setConfirmBtnText] = useState('확인');
  const [confirmBtnType, setConfirmBtnType] = useState('main');

  // 비밀번호
  const [pwError, setPwError] = useState('');
  const [pwCheckError, setPwCheckError] = useState('');

  // 이름
  const [usernameError, setUsernameError] = useState('');
  // 닉네임
  const [nicknameError, setNicknameError] = useState('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  // 전화번호 유효성 검사
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
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // 전화번호 두 번째와 세 번째 필드에 대해 4자리로 제한
    if ((name === 'phonePart2' || name === 'phonePart3') && value.length > 4) {
      return;
    }
    // 이메일 필드에 대한 유효성 검사
    if (name === 'email') {
      if (isVerified) {
        setIsVerified(false);
        setVerificationBtnText('인증번호 발송');
        setVerificationBtnType('main');
      }
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

    // 비밀번호 로직
    if (name === 'pw') {
      const pwRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()])[a-zA-Z0-9~!@#$%^&*()]+$/;
      if (value.length === 0) {
        setPwError('');
      } else if (!pwRegex.test(value) || value.length < 8) {
        setPwError('비밀번호는 8~16자 영문/특수문자(~!@#$%^&*()?)/숫자 하나 이상씩 조합해야 합니다.');
      } else {
        setPwError('');
      }
      if (value.length === 16) {
        return;
      }
    }
    // 비밀번호 확인 로직
    if (name === 'pwCheck') {
      if (value.length !== 0) {
        if (value === data.pw) {
          setPwCheckError('');
        } else {
          setPwCheckError('비밀번호가 틀립니다.');
        }
      } else {
        setPwCheckError('');
      }
    }

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

    // 닉네임 유효성 검사: 영문 + 숫자만 허용, 최소 5자, 최대 10자
    if (name === 'nickname') {
      const nicknameRegex = /^[a-zA-Z0-9_]*$/;
      if (value.length === 0) {
        setNicknameError('');
      } else if (!nicknameRegex.test(value) || value.length < 5) {
        setNicknameError('닉네임은 5~10자 영문/숫자/_만 사용 가능합니다.');
      } else {
        setNicknameError('');
      }
      // 10글자 초과 입력은 불가
      if (value.length > 10) {
        return;
      }
    }

    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    const { birthYear, birthMonth } = data;
    if (birthYear && birthMonth) {
      const year = parseInt(birthYear, 10);
      const month = parseInt(birthMonth, 10);
      const days = new Date(year, month, 0).getDate();
      const dayOptions = [];
      for (let day = 1; day <= days; day++) {
        dayOptions.push(day);
      }
      setDaysInMonth(dayOptions);
    } else {
      setDaysInMonth([]);
    }
  }, [data.birthYear, data.birthMonth]);

  // 이메일 전송 로직(기존 이메일과 중복 확인하는 작업 필요)
  const handleSendVerificationCode = () => {
    if (emailError === '' && data.email !== '') {
      // 정상 이메일이면 인증번호 발송
      alert('인증번호가 발송되었습니다.');
      setReturnCode('000000'); // 인증번호 설정
      setVerificationBtnText('재전송');
      setVerificationBtnType('sub');
    } else {
      // 정상 이메일이 아니면 이메일 확인
      alert('이메일을 확인해 주세요.');
    }
  };
  // 이메일 인증 확인 로직
  const handleCheckVerificationCode = () => {
    const { verificationCode } = data;
    if (verificationCode === returnCode) {
      alert('인증번호가 확인되었습니다.');
      setConfirmBtnText('인증완료');
      setConfirmBtnType('sub');
      setIsVerified(true);
    } else {
      alert('인증번호가 틀립니다.');
    }
  };

  const handleCheckDuplicateNickname = () => {
    if (nicknameError === '' && data.nickname.length !== 0) {
      // 닉네임 중복 확인 로직 작성
      alert('사용할 수 있는 닉네임입니다.');
      setIsNicknameAvailable(true);
    } else {
      alert('닉네임은 5~10자 영문/숫자/_만 사용 가능합니다.');
    }
  };

  // 제출 버튼
  const handleSubmit = () => {
    // 제출 로직 작성 (예: API 호출)
    // 모든 조건 만족해야 함.
    // 이메일 인증. 비밀번호
    // 이름, 닉네임, 생년월일 존재, 전화번호 존재
    console.log('Form submitted:', data);
    alert('회원가입이 완료되었습니다.');
  };

  // 연, 월, 일 계산 로직
  const generateYearOptions = () => {
    const years = [];
    for (let year = 1900; year <= new Date().getFullYear(); year++) {
      years.push(
        <s.Option key={year} value={year}>
          {year}
        </s.Option>,
      );
    }
    return years;
  };

  const generateMonthOptions = () => {
    const months = [];
    for (let month = 1; month <= 12; month++) {
      months.push(
        <s.Option key={month} value={month}>
          {month}
        </s.Option>,
      );
    }
    return months;
  };

  const generateDayOptions = () => {
    return daysInMonth.map((day) => (
      <s.Option key={day} value={day}>
        {day}
      </s.Option>
    ));
  };

  return (
    <s.Container>
      <Header text="회원가입" />
      <s.SignUpArea>
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
        <s.PasswordArea>
          <s.InfoNameBox>
            <s.InputHeader children="비밀번호" />
            {pwError && <s.ErrorText>{pwError}</s.ErrorText>}
          </s.InfoNameBox>
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
          <s.InfoNameBox>
            <s.InputHeader children="비밀번호 확인" />
            {pwCheckError && <s.ErrorText>{pwCheckError}</s.ErrorText>}
          </s.InfoNameBox>
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
          <s.InfoNameBox>
            <s.InputHeader children="이름" />
            {usernameError && <s.ErrorText>{usernameError}</s.ErrorText>}
          </s.InfoNameBox>
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
                value={data.nickname}
                onChange={handleChangeValue}
              />
            </s.InputBox>
            <s.InputBtn>
              <Button
                width="85px"
                height="40px"
                type="main"
                children="중복확인"
                onClick={handleCheckDuplicateNickname}
              />
            </s.InputBtn>
          </s.InputArea>
          <s.InfoNameBox>
            <s.InputHeader children="생년월일" />
          </s.InfoNameBox>
          <s.InputArea>
            <s.SelectBox name="birthYear" value={data.birthYear} onChange={handleChangeValue}>
              <s.Option value="">년</s.Option>
              {generateYearOptions()}
            </s.SelectBox>
            <Text type="guide" children="년" />
            <s.SelectBox name="birthMonth" value={data.birthMonth} onChange={handleChangeValue}>
              <s.Option value="">월</s.Option>
              {generateMonthOptions()}
            </s.SelectBox>
            <Text type="guide" children="월" />
            <s.SelectBox name="birthDay" value={data.birthDay} onChange={handleChangeValue}>
              <s.Option value="">일</s.Option>
              {generateDayOptions()}
            </s.SelectBox>
            <Text type="guide" children="일" />
          </s.InputArea>
          <s.InfoNameBox>
            <s.InputHeader children="전화번호" />
            {phoneNumberError && <s.ErrorText>{phoneNumberError}</s.ErrorText>}
          </s.InfoNameBox>
          <PhoneNumberInput phonePart2={data.phonePart2} phonePart3={data.phonePart3} onChange={handleChangeValue} />
        </s.InfoArea>
        <s.SubBtnArea>
          <Button width="100%" height="40px" type="main" children="회원가입" onClick={handleSubmit} />
        </s.SubBtnArea>
        <s.TextBtnArea>
          <Text children="이미 회원이신가요?" type="guide" size="14px" />
          <Text type="guide" children="로그인" size="14px" onClick={() => {}} cursor="pointer" />
        </s.TextBtnArea>
      </s.SignUpArea>
    </s.Container>
  );
};

export default SignUpPage;
