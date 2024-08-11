import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Header from '../../../components/Common/Header';
import TextArea from '../../../components/Common/TextArea';
import Button from '../../../components/Common/Button';
import Image from '../../../components/Common/Image';

import test from '../../../asset/img/testImg.png';
import { useNavigate } from 'react-router';

import { MyRoutine } from '../../../lib/api/sns-api';

import { SnsFeedWrite } from '../../../lib/api/sns-api';

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

  
  ImageArea: styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1;
  `,
  FeedImage: styled.div<ImageAreaProps>`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.$isRoutine === true ? 'none' : '')};
  `,
  FeedRoutine: styled.div<ImageAreaProps>`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.$isRoutine === true ? '' : 'none')};
    overflow-y: auto;
  `,
  RoutineArea: styled.div`
    line-height: 150%;
    margin: 40px;
  `,
  SelectPicture: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    padding: 0 25px 0 25px;
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

interface ImageAreaProps {
  $isRoutine: boolean;
}

type routineData = {
  id: number;
  details: [
    {
      exerciseName: string;
      setCount: number;
    }
  ]
};

const CreateFeedPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (): void => {
    navigate('/sns');
  };

  // 루틴 확인, 사진 확인 전환
  const [isRoutineMode, setIsRoutineMode] = useState(false);

  const routineButtonOnClick = (() => {
    setIsRoutineMode((prev) => !prev);
  });

  // 파일 업로드하기 (image)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  const [imgurl, setimgurl] = useState<string>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const targetImage = event.target.files;
      setImage(targetImage[0]);
      setimgurl(URL.createObjectURL(targetImage[0]))
    }
  };

  useEffect(() => {
    console.log(image)
  }, [image]);

  // 내 루틴 가져오기
  const [routine, setRoutine] = useState<routineData>();
  
  const getRoutineData = async () => {
    await MyRoutine(
      (resp) => {
        setRoutine(resp.data);
      },
      (error) => {
        console.error(error);
      }
    )
  };

  useEffect(() => {
    getRoutineData();
  }, []);

  useEffect(() => {
    console.log(routine);
  }, [routine])

  // 피드 내용 작성
  const [contentValue, setContentValue] = useState('');

  const contentOnChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { currentTarget: { value }} = event;
    setContentValue(value);
  };
  const feedOnSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    // if (routine !== undefined && image !==undefined) {
    if (image !== undefined && routine !== undefined) {
      const formData = new FormData();
      const feedContent={
        content: contentValue,
        // image: image,
        image: 'image',
        routineId: routine.id
      };
      // formData.append('content', new Blob([JSON.stringify(contentValue)], { type: 'application/json' }));
      // formData.append('routineId', new Blob([JSON.stringify(routine.id)], { type: 'application/json' }));
      // formData.append('image', image)

      await SnsFeedWrite(
        feedContent,
        (resp) => {
          console.log(resp.data);
          console.log('글작성성공');
          handleMovePage();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  
  return (
    <>
      <s.Container>
        <s.HeaderArea>
          <Header text="운동 피드 작성" />
        </s.HeaderArea>
        <s.MainArea>
          <s.ImageArea>
            <s.FeedImage $isRoutine={isRoutineMode}>
              {/* <Image width="100%" height="100%" src={test} type="rect" /> */}
              <Image width="100%" height="100%" src={imgurl} type="rect" />
            </s.FeedImage>
            <s.FeedRoutine $isRoutine={isRoutineMode}>
              <s.RoutineArea>
                {routine?.details?.map((item) => (
                  <>
                    <s.Routine>{item.exerciseName} {item.setCount}세트</s.Routine>
                  </>
                ))}
              </s.RoutineArea>
            </s.FeedRoutine>
          </s.ImageArea>
          <s.SelectPicture>
            <Button width="49%" height="40px" size="14px" bold="500" children="사진 선택" onClick={() => {fileInputRef.current?.click()}}/>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            {isRoutineMode ? (
              <Button width="49%" height="40px" size="14px" bold="500" children="사진 확인" onClick={routineButtonOnClick}/>
            ) : (
              <Button width="49%" height="40px" size="14px" bold="500" children="루틴 확인" onClick={routineButtonOnClick}/>
            )}
          </s.SelectPicture>
          <TextArea width="90%" height="180px" margin="0 auto" display="block" onChange={contentOnChange} value={contentValue} />
        </s.MainArea>
        <s.Button>
          <Button
            width="100%"
            height="40px"
            size="14px"
            type="main"
            bold="500"
            children="작성완료"
            onClick={feedOnSubmit}
            // onClick={handleMovePage}
          />
        </s.Button>
      </s.Container>
      <BottomNav />
    </>
  );
};

export default CreateFeedPage;
