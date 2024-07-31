import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Header from '../../components/Common/Header';
import ResultModal from '../../components/AI/ResultModal';
import SettingModal from '../../components/AI/SettingModal';

const s = {
  Container: styled.div`
    padding: 60px 0 80px;
    background-color: ${(props) => props.theme.Color};
    height: 99vh; // 하단바로 인한 스크롤 방지 차원
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  `,
  PageBody: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  `,
  CameraBox: styled.div<{ $isError: boolean | null }>`
    width: 80%;
    height: 70%;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 300px;
    color: ${(props) => props.theme.textColor};
    ${(props) =>
      props.$isError === true &&
      css`
        color: red;
      `}
    ${(props) =>
      props.$isError === false &&
      css`
        color: green;
      `}
  `,
  CameraHeader: styled.h2`
    font-size: 15px;
    color: ${(props) => props.theme.textColor};
    margin: 4px;
  `,
  SettingBtn: styled.button`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
  `,
  ProgressBar: styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.subColor};
    border-radius: 5px;
    overflow: hidden;
    margin-top: 20px;
  `,
  Progress: styled.div<{ progress: number }>`
    width: ${(props) => props.progress}%;
    height: 20px;
    background-color: ${(props) => props.theme.mainColor};
    transition: width 0.3s;
  `,
  ProgressText: styled.div`
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
    margin-top: 8px;
  `,
};

const AIMainPage: React.FC = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false); // 결과창
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // 설정 창
  const [progress, setProgress] = useState(0); // 진행바
  const [currentResult, setCurrentResult] = useState<{ isError: boolean; message: string } | null>(null);
  // 운동 결과. (추후 받는 로직 작성)
  const results = [
    { set: 1, isError: false, message: '좋은 자세입니다.' },
    { set: 2, isError: true, message: '허리 굽힘이 발생했습니다.' },
    { set: 3, isError: false, message: '좋은 자세입니다.' },
    { set: 4, isError: true, message: '더 내려가야 합니다.' },
    { set: 5, isError: false, message: '좋은 자세입니다.' },
    { set: 6, isError: false, message: '좋은 자세입니다.' },
    { set: 7, isError: false, message: '좋은 자세입니다.' },
    { set: 8, isError: true, message: '더 내려가야 합니다.' },
    { set: 9, isError: false, message: '좋은 자세입니다.' },
    { set: 10, isError: false, message: '좋은 자세입니다.' },
    { set: 11, isError: false, message: '좋은 자세입니다.' },
    { set: 12, isError: false, message: '좋은 자세입니다.' },
    { set: 13, isError: false, message: '좋은 자세입니다.' },
    { set: 14, isError: false, message: '좋은 자세입니다.' },
    { set: 15, isError: false, message: '좋은 자세입니다.' },
  ];
  // 나중엔 자동인식으로 바뀔 부분
  const handleNext = () => {
    if (progress < 99) {
      const nextProgress = progress + 100 / results.length;
      setProgress(nextProgress);
      const nextIndex = Math.round((nextProgress * results.length) / 100) - 1;
      setCurrentResult(results[nextIndex]);
    }
  };

  return (
    <>
      <Header text="AI 트레이너" />
      <s.Container>
        <s.CameraHeader children="카메라를 사용자 기준 우측 하단에 위치해 주세요." />
        <s.CameraBox $isError={currentResult ? currentResult.isError : null}>
          {currentResult && (currentResult.isError ? 'X' : 'O')}
        </s.CameraBox>
        <s.PageBody>
          {isResultModalOpen && <ResultModal onClose={() => setIsResultModalOpen(false)} results={results} />}
          {isSettingsModalOpen && <SettingModal onClose={() => setIsSettingsModalOpen(false)} />}
          <s.SettingBtn onClick={() => setIsSettingsModalOpen(true)} children="트레이닝 설정" />
          {progress < 99 ? (
            <>
              <s.ProgressBar>
                <s.Progress progress={progress} />
              </s.ProgressBar>
              <s.ProgressText>
                {Math.round((progress * results.length) / 100)} / {results.length}
              </s.ProgressText>
              <s.SettingBtn onClick={handleNext} children="다음" />
            </>
          ) : (
            <s.SettingBtn onClick={() => setIsResultModalOpen(true)} children="결과 보기" />
          )}
        </s.PageBody>
      </s.Container>
    </>
  );
};

export default AIMainPage;
