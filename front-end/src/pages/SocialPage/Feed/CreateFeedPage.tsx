import React, { useState } from 'react';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Header from '../../../components/Common/Header';
import TextArea from '../../../components/Common/TextArea';
import Button from '../../../components/Common/Button';
import Image from '../../../components/Common/Image';

import test from '../../../asset/img/testImg.png';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding: 57px 25px 68px 25px;
  `,
  Routine: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: 500;
    text-shadow: 1px 1px 1px black;
  `,
  RoutineArea: styled.div`
    position: absolute;
    bottom: 10%;
    left: 10%;
  `,
  ImageArea: styled.div`
    position: relative;
  `,
  SelectPicture: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  `,
  Button: styled.div`
    display: flex;
    width: 100%;
    max-width: 800px;
    padding: 0 25px;
    position: fixed;
    bottom: 88px;
  `,
};

const CreateFeedPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (): void => {
    navigate('/sns');
  };
  return (
    <>
      <Header text="운동 피드 작성" />
      <s.Container>
        <s.ImageArea>
          <Image width="100%" height="auto" src={test} type="rect" />
          <s.RoutineArea>
            <s.Routine>testtext1</s.Routine>
            <s.Routine>testtext2</s.Routine>
            <s.Routine>testtext3</s.Routine>
          </s.RoutineArea>
        </s.ImageArea>

        <s.SelectPicture>
          <Button width="49%" height="40px" size="14px" bold="500" children="사진 촬영" />
          <Button width="49%" height="40px" size="14px" bold="500" children="갤러리" />
        </s.SelectPicture>
        <TextArea width="100%" height="180px" />
      </s.Container>
      <s.Button>
        <Button
          width="100%"
          height="40px"
          size="14px"
          type="main"
          bold="500"
          children="작성완료"
          onClick={handleMovePage}
        />
      </s.Button>
      <BottomNav />
    </>
  );
};

export default CreateFeedPage;
