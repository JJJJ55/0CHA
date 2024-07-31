import React, { useState } from 'react';
import styled from 'styled-components';

import Feed from '../../../components/SNS/Feed';
import SnsHeader from '../../../components/SNS/SnsHeader';
import SnsNavigation from '../../../components/SNS/SnsNavigation';
import CommentModal from '../../../components/SNS/CommentModal';
import BottomNav from '../../../components/Common/BottomNav';

import test from "../../../asset/img/testImg.png";


const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding-bottom: 68px;
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


const FeedPage = (): JSX.Element => {
  return (
    <>
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
    </s.Container>
    <BottomNav/>
    </>
  );
};

export default FeedPage;
