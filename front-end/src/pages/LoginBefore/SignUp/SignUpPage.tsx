import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Text from '../../../components/Common/Text';
import { ReactComponent as Logo } from '../../../asset/img/svg/0CHA.svg';
import Header from '../../../components/Common/Header';

// 할 일
// 비밀번호(조건, 확인 등) 로직 작성
// 인증번호 확인 로직 작성
// 전화번호 숫자만 입력되게 하기
// 로그인 페이지로 이동시키기

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
    padding: 60px 0 80px;
  `,
  EmailArea: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
  `,
  PasswordArea: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
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
  `,
  PhoneNumberArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  FixedPhoneNumber: styled.div`
    width: 30%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.subColor};
    border: 1px solid ${(props) => props.theme.bgColor};
    border-radius: 8px;
  `,
  PhoneNumberInput: styled(Input)`
    width: 30%;
  `,
  SubBtnArea: styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
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

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // 전화번호 두 번째와 세 번째 필드에 대해 4자리로 제한
    if ((name === 'phonePart2' || name === 'phonePart3') && value.length > 4) {
      return;
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

  const handleSendVerificationCode = () => {
    alert('인증번호가 발송되었습니다.');
  };

  const handleCheckVerificationCode = () => {
    alert('인증번호가 확인되었습니다.');
  };

  const handleCheckDuplicateNickname = () => {
    // 닉네임 중복 확인 로직 작성
    alert('사용할 수 있는 닉네임입니다.');
  };

  // 제출 버튼
  const handleSubmit = () => {
    // 제출 로직 작성 (예: API 호출)
    console.log('Form submitted:', data);
    alert('회원가입이 완료되었습니다.');
  };

  // 연, 월, 일
  const generateYearOptions = () => {
    const years = [];
    for (let year = 1900; year <= new Date().getFullYear(); year++) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>,
      );
    }
    return years;
  };

  const generateMonthOptions = () => {
    const months = [];
    for (let month = 1; month <= 12; month++) {
      months.push(
        <option key={month} value={month}>
          {month}
        </option>,
      );
    }
    return months;
  };

  const generateDayOptions = () => {
    return daysInMonth.map((day) => (
      <option key={day} value={day}>
        {day}
      </option>
    ));
  };

  return (
    <s.Container>
      <Header text="회원가입" />
      <s.SignUpArea>
        <s.EmailArea>
          <s.InputHeader children="이메일" />
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
            <s.InputBtn>
              <Button
                width="85px"
                height="40px"
                type="main"
                children="인증번호 발송"
                onClick={handleSendVerificationCode}
              />
            </s.InputBtn>
          </s.InputArea>
          <s.InputHeader children="인증번호" />
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
            <s.InputBtn>
              <Button width="85px" height="40px" type="main" children="확인" onClick={handleCheckVerificationCode} />
            </s.InputBtn>
          </s.InputArea>
        </s.EmailArea>
        <s.PasswordArea>
          <s.InputHeader children="비밀번호" />
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
          <s.InputHeader children="비밀번호 확인" />
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
          <s.InputHeader children="이름" />
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
          <s.InputHeader children="생년월일" />
          <s.InputArea>
            <s.SelectBox name="birthYear" value={data.birthYear} onChange={handleChangeValue}>
              <option value="">년</option>
              {generateYearOptions()}
            </s.SelectBox>
            <Text type="guide" children="년" />
            <s.SelectBox name="birthMonth" value={data.birthMonth} onChange={handleChangeValue}>
              <option value="">월</option>
              {generateMonthOptions()}
            </s.SelectBox>
            <Text type="guide" children="월" />
            <s.SelectBox name="birthDay" value={data.birthDay} onChange={handleChangeValue}>
              <option value="">일</option>
              {generateDayOptions()}
            </s.SelectBox>
            <Text type="guide" children="일" />
          </s.InputArea>
          <s.InputHeader children="전화번호" />
          <s.PhoneNumberArea>
            <s.FixedPhoneNumber children="010" />
            <Text type="guide" children="-" />
            <s.PhoneNumberInput
              width="30%"
              height="40px"
              type="text"
              name="phonePart2"
              value={data.phonePart2}
              onChange={handleChangeValue}
            />
            <Text type="guide" children="-" />
            <s.PhoneNumberInput
              width="30%"
              height="40px"
              type="text"
              name="phonePart3"
              value={data.phonePart3}
              onChange={handleChangeValue}
            />
          </s.PhoneNumberArea>
        </s.InfoArea>
        <s.SubBtnArea>
          <Button width="200px" height="40px" type="main" children="회원가입" onClick={handleSubmit} />
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
