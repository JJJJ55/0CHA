import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Text from '../../../components/Common/Text';
import { ReactComponent as Logo } from '../../../asset/img/svg/0CHA.svg';
import test from "../../../asset/img/testImg.png";

import Feed from '../../../components/SNS/Feed';
import SnsHeader from '../../../components/SNS/SnsHeader';
import SnsNavigation from '../../../components/SNS/SnsNavigation';
import CommentModal from '../../../components/SNS/CommentModal';

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
  LoginArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  InputArea: styled.div`
    width: 80%;
    /* border: 1px solid red; */
    margin: 0px auto;
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
    /* border: 1px solid red; */
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
  pw: string;
}

const LoginPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    email: '',
    pw: '',
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickLogin = () => {
    alert(data.email + ' ' + data.pw);
  };

  return (
    <s.Container>
      <SnsHeader />

      <SnsNavigation />

      <Feed 
      width="100vw"
      height="100vw"
      src={test}
      authorName="stranger_00"
      authorProfileImage={test}
      like="true"
      likeCnt="100"
      commentCnt="30"
      content="example content test"
      />
      <CommentModal/>
      {/* <Feed 
      width="100vw"
      height="100vw"
      src={test}
      authorName="stranger_00"
      authorProfileImage={test}
      like="true"
      likeCnt="100"
      commentCnt="30"
      content="example content test"
      />
      <Feed 
      width="100vw"
      height="100vw"
      src={test}
      authorName="stranger_00"
      authorProfileImage={test}
      like="true"
      likeCnt="100"
      commentCnt="30"
      content="example content test"
      /> */}

      
    </s.Container>
  );
};

export default LoginPage;
