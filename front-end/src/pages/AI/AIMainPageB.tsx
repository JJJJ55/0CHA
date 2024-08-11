import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Header from '../../components/Common/Header';
import ResultModal from '../../components/AI/ResultModal';
import SettingModal from '../../components/AI/SettingModal';
import BottomNav from '../../components/Common/BottomNav';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  AIArea: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 100px 10px 120px;
  `,
  PageBody: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
  `,
  CameraBox: styled.div<{ $isError: boolean | null }>`
    width: 90%;
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
  `,
  BtnArea: styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
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

const AIMainBefore: React.FC = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentResult, setCurrentResult] = useState<{ isError: boolean; message: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  ];

  const handleNext = () => {
    if (progress < 99) {
      const nextProgress = progress + 100 / results.length;
      setProgress(nextProgress);
      const nextIndex = Math.round((nextProgress * results.length) / 100) - 1;
      setCurrentResult(results[nextIndex]);
    }
  };

  const [cameraStarted, setCameraStarted] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [stream, setStream] = useState<MediaStream | null>(null); // 스트림 상태 추가

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: {
          facingMode: facingMode,
        },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setStream(stream); // 스트림을 상태에 저장
            setCameraStarted(true);
          }
        })
        .catch((error) => {
          console.error('카메라 접근 권한이 거부되었습니다:', error);
        });
    } else {
      alert('이 브라우저는 카메라 접근을 지원하지 않습니다. 다른 브라우저를 사용해 주세요.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); // 모든 트랙을 중지
      setCameraStarted(false);
      setStream(null); // 스트림 상태를 초기화
    }
  };

  const switchCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');

    // 카메라를 전환하고 재시작
    if (cameraStarted) {
      stopCamera();
      startCamera();
    }
  };

  return (
    <s.Container>
      <Header text="AI 트레이너" />
      <s.AIArea>
        <s.CameraHeader>카메라를 사용자 기준 우측 하단에 위치해 주세요.</s.CameraHeader>
        <s.CameraBox $isError={currentResult ? currentResult.isError : null}>
          <video ref={videoRef} autoPlay playsInline width="100%" height="100%" max-height="100%" />

          {currentResult && (currentResult.isError ? 'X' : 'O')}
        </s.CameraBox>
        <s.PageBody>
          {isResultModalOpen && <ResultModal onClose={() => setIsResultModalOpen(false)} results={results} />}
          {isSettingsModalOpen && <SettingModal onClose={() => setIsSettingsModalOpen(false)} />}
          <s.SettingBtn onClick={() => setIsSettingsModalOpen(true)}>트레이닝 설정</s.SettingBtn>
          {progress < 99 ? (
            <>
              <s.ProgressBar>
                <s.Progress progress={progress} />
              </s.ProgressBar>
              <s.ProgressText>
                {Math.round((progress * results.length) / 100)} / {results.length}
              </s.ProgressText>
              <s.SettingBtn onClick={handleNext}>다음</s.SettingBtn>
            </>
          ) : (
            <s.SettingBtn onClick={() => setIsResultModalOpen(true)}>결과 보기</s.SettingBtn>
          )}
          {!cameraStarted && <s.SettingBtn onClick={startCamera} disabled={cameraStarted} children="카메라 시작" />}
          {cameraStarted && (
            <s.BtnArea>
              <s.SettingBtn children="카메라 전환" onClick={switchCamera} />
              <s.SettingBtn children="카메라 종료" onClick={stopCamera} />
            </s.BtnArea>
          )}
        </s.PageBody>
      </s.AIArea>
      <BottomNav />
    </s.Container>
  );
};

export default AIMainBefore;
