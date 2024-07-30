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
    justify-content: center;
    align-items: center;
    padding: 0 10px 0;
  `,
  ChangePasswordArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  PasswordArea: styled.div`
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
  pw: string;
  pwCheck: string;
}

const ChangePasswordPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    pw: '',
    pwCheck: '',
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // 제출 로직 작성
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

        <s.ButtonArea>
          <Button width="48%" height="40px" children="이전" onClick={handlePrevious} />
          <Button width="48%" height="40px" type="main" children="비밀번호 변경" onClick={handleSubmit} />
        </s.ButtonArea>
      </s.ChangePasswordArea>
    </s.Container>
  );
};

export default ChangePasswordPage;
