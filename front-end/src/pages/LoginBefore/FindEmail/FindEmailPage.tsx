import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Header from '../../../components/Common/Header';

// 4자리 로직 작성

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
  FindEmailArea: styled.div`
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
  BetweenText: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
  BtnArea: styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
};

interface dataType {
  username: string;
  phonePart2: string;
  phonePart3: string;
}

const FindEmailPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    username: '',
    phonePart2: '',
    phonePart3: '',
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = () => {
    // 제출 로직 작성
    console.log('Form submitted:', data);
    alert('이메일 찾기 요청이 제출되었습니다.');
  };

  const handlePrevious = () => {
    // 이전 페이지로 이동하는 로직 작성
    console.log('Previous button clicked');
    alert('이전 페이지로 이동합니다.');
  };

  return (
    <>
      <Header text="이메일 찾기" />
      <s.Container>
        <s.FindEmailArea>
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
              <s.BetweenText children="-" />
              <s.PhoneNumberInput
                height="40px"
                type="text"
                name="phonePart2"
                placeholder="앞 4자리"
                value={data.phonePart2}
                onChange={handleChangeValue}
              />
              <s.BetweenText children="-" />
              <s.PhoneNumberInput
                height="40px"
                type="text"
                name="phonePart3"
                placeholder="뒤 4자리"
                value={data.phonePart3}
                onChange={handleChangeValue}
              />
            </s.PhoneNumberArea>
          </s.InfoArea>
          <s.BtnArea>
            <Button width="48%" height="40px" children="이전" onClick={handlePrevious} />
            <Button width="48%" height="40px" type="main" children="이메일 찾기" onClick={handleSubmit} />
          </s.BtnArea>
        </s.FindEmailArea>
      </s.Container>
    </>
  );
};

export default FindEmailPage;
