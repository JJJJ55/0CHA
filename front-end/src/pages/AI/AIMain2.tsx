import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Header from '../../components/Common/Header';
import ResultModal from '../../components/AI/ResultModal';
import SettingModal from '../../components/AI/SettingModal2';
import BottomNav from '../../components/Common/BottomNav';
import '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';

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

const AIMain2: React.FC = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ set: number; isError: boolean; message: string }[]>([]);
  const [currentResult, setCurrentResult] = useState<{ isError: boolean; message: string } | null>(null);

  const [totalCount, setTotalCount] = useState(5);
  const [selectedExercise, setSelectedExercise] = useState('스쿼트');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cameraStarted, setCameraStarted] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [model, setModel] = useState<tmPose.CustomPoseNet | null>(null);
  const [webcam, setWebcam] = useState<tmPose.Webcam | null>(null);
  const [requestID, setRequestID] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [inCorrectCount, setInCorrectCount] = useState(0);

  const loadModel = async () => {
    const modelURL = process.env.PUBLIC_URL + '/my_model/model.json';
    const metadataURL = process.env.PUBLIC_URL + '/my_model/metadata.json';

    try {
      const loadedModel = await tmPose.load(modelURL, metadataURL);
      setModel(loadedModel);
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading the model:', error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const init = async () => {
    if (!model || cameraStarted) return;

    setCorrectCount(0);
    setInCorrectCount(0);
    setResults([]);

    const size = 200;
    const flip = true;
    const newWebcam = new tmPose.Webcam(size, size, flip);
    await newWebcam.setup();
    await newWebcam.play();
    setWebcam(newWebcam);

    if (videoRef.current) {
      videoRef.current.srcObject = newWebcam.canvas.captureStream();
    }

    setCameraStarted(true);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.style.display = 'block';
      canvas.width = size;
      canvas.height = size;
    }

    const newRequestID = window.requestAnimationFrame(loop);
    setRequestID(newRequestID);
  };

  const loop = async () => {
    if (!cameraStarted || !webcam || !model) return;

    webcam.update();
    await predict();

    if (cameraStarted) {
      const newRequestID = window.requestAnimationFrame(loop);
      setRequestID(newRequestID);
    }
  };

  const predict = async () => {
    if (!model || !webcam) return;

    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    const isCorrect = prediction[5].probability > 0.999;

    if (isCorrect) {
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      setInCorrectCount((prevCount) => prevCount + 1);
    }

    const resultMessage = isCorrect ? '좋은 자세입니다.' : '자세가 틀렸습니다.';
    setResults((prevResults) => [
      ...prevResults,
      { set: correctCount + inCorrectCount + 1, isError: !isCorrect, message: resultMessage },
    ]);

    setProgress(((correctCount + inCorrectCount + 1) / totalCount) * 100);
    setCurrentResult({ isError: !isCorrect, message: resultMessage });

    drawPose(pose);
  };

  const drawPose = (pose: any) => {
    const canvas = canvasRef.current;
    if (canvas && webcam) {
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(webcam.canvas, 0, 0);

      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx!);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx!);
      }
    }
  };

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = { video: { facingMode: facingMode } };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setStream(stream);
            setCameraStarted(true);
            init(); // 카메라 시작 시 모델 초기화 및 운동 시작
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
      stream.getTracks().forEach((track) => track.stop());
      setCameraStarted(false);
      setStream(null);

      if (webcam) {
        webcam.stop();
      }

      if (requestID) {
        window.cancelAnimationFrame(requestID);
      }

      if (canvasRef.current) {
        canvasRef.current.style.display = 'none';
      }
    }
  };

  const switchCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    if (cameraStarted) {
      stopCamera();
      startCamera();
    }
  };

  const handleSettingsConfirm = (exercise: string, count: number) => {
    setSelectedExercise(exercise);
    setTotalCount(count);
    setIsSettingsModalOpen(false);
    startCamera();
  };

  return (
    <s.Container>
      <Header text="AI 트레이너" />
      <s.AIArea>
        <s.CameraHeader>카메라를 사용자 기준 우측 하단에 위치해 주세요.</s.CameraHeader>
        <s.CameraBox $isError={currentResult ? currentResult.isError : null}>
          <video ref={videoRef} autoPlay playsInline width="100%" height="100%" />
          {currentResult && (currentResult.isError ? 'X' : 'O')}
        </s.CameraBox>
        <s.PageBody>
          {isResultModalOpen && <ResultModal onClose={() => setIsResultModalOpen(false)} results={results} />}
          {isSettingsModalOpen && (
            <SettingModal onClose={() => setIsSettingsModalOpen(false)} onConfirm={handleSettingsConfirm} />
          )}
          <s.SettingBtn onClick={() => setIsSettingsModalOpen(true)}>트레이닝 설정</s.SettingBtn>
          <s.ProgressBar>
            <s.Progress progress={progress} />
          </s.ProgressBar>
          <s.ProgressText>
            {correctCount + inCorrectCount} / {totalCount}
          </s.ProgressText>
          {progress >= 100 && <s.SettingBtn onClick={() => setIsResultModalOpen(true)}>결과 보기</s.SettingBtn>}
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

export default AIMain2;
