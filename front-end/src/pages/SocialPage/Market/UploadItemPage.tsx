import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Header from '../../../components/Common/Header';
import TextArea from '../../../components/Common/TextArea';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import IconSvg from '../../../components/Common/IconSvg';
import Image from '../../../components/Common/Image';
import { ReactComponent as camera } from '../../../asset/img/svg/camera.svg';

import { useNavigate } from 'react-router';

const s = {
  ImageText: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
  `,
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding-top: 57px;
    padding-bottom: 68px;
  `,
  InputArea: styled.div`
    width: 100%;
    height: 350px;
    padding: 0 25px;
    margin: 40px 0 80px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  InputLabel: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    font-weight: 500;
    margin-left: 10px;
  `,
  ImageUploadArea: styled.div`
    display: flex;
    height: 110px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  `,
  ImageArea: styled.div`
    width: 380px;
    display: flex;
    justify-content: left;
    margin: 0 auto;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  `,
  ImageWrapper: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 8px;
    margin-top: 16px;
  `,
  DeleteButton: styled.button`
    background-color: ${(props) => props.theme.subColor};
    border: none;
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    padding: 2px 4px;
    position: absolute;
    top: -8px;
    right: -8px;
    cursor: pointer;
  `,
  Button: styled.div`
    display: flex;
    width: 100%;
    max-width: 800px;
    padding: 0 25px;
    position: fixed;
    bottom: 88px;
  `,
  MainImageArea: styled.div`
    position: relative;
  `,
  MainImageCaption: styled.div`
    color: #000000;
    display: flex;
    font-size: 12px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 20px;
    background-color: #ccff33aa;
    position: absolute;
    top: 44px;
  `,
  MainImage: styled(Image)``,
};

const UploadItemPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files).slice(0, 5); // 최대 5개
      const newImages = filesArray.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5)); // 최대 5개까지
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMovePage = (): void => {
    navigate('/sns');
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header text="판매하기" />
      <s.Container>
        <s.ImageUploadArea onClick={handleUploadClick}>
          <IconSvg width="50" height="50" Ico={camera} color="#ffffff" />
          <s.ImageText>{images.length}/5</s.ImageText>
        </s.ImageUploadArea>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <s.ImageArea>
          {images.map((image, index) => (
            <s.ImageWrapper key={index}>
              <Image width="64px" height="64px" src={image} type="rect" />
              {index === 0 && <s.MainImageCaption>대표</s.MainImageCaption>}
              <s.DeleteButton onClick={() => handleDeleteImage(index)}>X</s.DeleteButton>
            </s.ImageWrapper>
          ))}
        </s.ImageArea>
        <s.InputArea>
          <s.InputLabel>제목</s.InputLabel>
          <Input width="100%" height="40px" />
          <s.InputLabel>가격</s.InputLabel>
          <Input width="100%" height="40px" />
          <s.InputLabel>상품 설명</s.InputLabel>
          <TextArea width="100%" height="180px" />
        </s.InputArea>
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

export default UploadItemPage;
