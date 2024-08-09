import React, { useRef, useState } from 'react';
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
  `,
  HeaderArea: styled.div`
    position: relative;
    z-index: 1000;
  `,
  MainArea: styled.div`
    padding: 57px 0 150px;
    overflow: auto;
  `,
  Routine: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 80%;
    font-weight: 600;
    text-shadow: 1px 1px 1px black;
  `,

  RoutineArea: styled.div`
    position: absolute;
    bottom: 5%;
    left: 5%;
    line-height: 120%;
  `,
  ImageArea: styled.div`
    position: relative;
  `,
  SelectPicture: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    padding: 0 10px 0 10px;
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files).slice(0, 5);
      const file = Array.from(event.target.files).slice(0, 5);
      const file2 = event.target.files;
      const nnnnn= file.map((tmp) => URL.createObjectURL(tmp));
      // setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5));
      console.log(file2)
      console.log(nnnnn)
    }
  };
// 작성완료
  
  
  return (
    <>
      <s.Container>
        <s.HeaderArea>
          <Header text="운동 피드 작성" />
        </s.HeaderArea>
        <s.MainArea>
          <s.ImageArea>
            <Image width="100%" height="auto" src={test} type="rect" />
            <s.RoutineArea>
              <s.Routine>벤치프레스 3SET</s.Routine>
              <s.Routine>스쿼트 3SET</s.Routine>
              <s.Routine>데드리프트 3SET</s.Routine>
              <s.Routine>벤치프레스 3SET</s.Routine>
              <s.Routine>스쿼트 3SET</s.Routine>
              <s.Routine>데드리프트 3SET</s.Routine>
            </s.RoutineArea>
          </s.ImageArea>
          <s.SelectPicture>
            <Button width="49%" height="40px" size="14px" bold="500" children="사진 촬영" />
            <Button width="49%" height="40px" size="14px" bold="500" children="갤러리" onClick={() => {fileInputRef.current?.click()}}/>
            <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
          </s.SelectPicture>
          <TextArea width="90%" height="180px" margin="0 auto" display="block" />
        </s.MainArea>
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
      </s.Container>
      <BottomNav />
    </>
  );
};

export default CreateFeedPage;
