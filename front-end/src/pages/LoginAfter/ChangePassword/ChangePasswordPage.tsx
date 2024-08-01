import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Header from '../../../components/Common/Header';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ChangePasswordArea: styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 10px 70px;
  `,
  PasswordArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
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
    width: 90px;
    min-width: 60px;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 5px;
    font-size: 16px;
  `,
  BetweenText: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
  ButtonArea: styled.div`
    width: 100%;
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
  InfoNameBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
  `,
  ErrorText: styled.p`
    color: red;
    font-size: 12px;
    margin-left: 5px;
  `,
};

interface dataType {
  newPw: string;
  pw: string;
  pwCheck: string;
}

const ChangePasswordPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    newPw: '',
    pw: '',
    pwCheck: '',
  });

  // 비밀번호
  const [pwError, setPwError] = useState('');
  const [pwCheckError, setPwCheckError] = useState('');

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // 제출 로직 작성(기존 비밀번호가 맞는지 확인)
    console.log('Form submitted:', data);
    alert('비밀번호가 변경되었습니다.');
  };

  const handlePrevious = () => {
    // 이전 페이지로 이동하는 로직 작성
    console.log('Previous button clicked');
    alert('이전 페이지로 이동합니다. 지금까지 진행한 모든 절차가 초기화됩니다.');
  };

  return (
    <s.Container>
      <Header text="비밀번호 변경" />
      <s.ChangePasswordArea>
        <s.PasswordArea>
          <s.InfoNameBox>
            <s.InputHeader children="기존 비밀번호" />
          </s.InfoNameBox>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              placeholder="기존 비밀번호"
              margin="5px auto"
              type="password"
              name="newPw"
              value={data.newPw}
              onChange={handleChangeValue}
            />
          </s.InputArea>
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
        <s.ButtonArea>
          <Button width="48%" height="40px" children="이전" onClick={handlePrevious} />
          <Button width="48%" height="40px" type="main" children="비밀번호 변경" onClick={handleSubmit} />
        </s.ButtonArea>
      </s.ChangePasswordArea>
    </s.Container>
  );
};

export default ChangePasswordPage;
