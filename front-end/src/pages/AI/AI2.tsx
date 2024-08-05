import React, { useState, useRef, useEffect } from 'react'; // React와 훅 import
import styled from 'styled-components'; // styled-components를 사용하여 스타일링
import '@tensorflow/tfjs'; // TensorFlow.js를 불러옴
import * as tmPose from '@teachablemachine/pose'; // Teachable Machine Pose 모델 라이브러리 불러오기

interface PosePrediction {
  probability: number;
  className: string;
}

const AI2: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // 비디오 요소를 참조하기 위한 ref 생성
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // 캔버스 요소를 참조하기 위한 ref 생성

  const [model, setModel] = useState<tmPose.CustomPoseNet | null>(null); // PoseNet 모델을 저장할 상태 변수
  const [webcam, setWebcam] = useState<tmPose.Webcam | null>(null); // 웹캠 객체를 저장할 상태 변수
  const [maxPredictions, setMaxPredictions] = useState(0); // 최대 예측 수를 저장할 상태 변수
  const [requestID, setRequestID] = useState<number | null>(null); // 애니메이션 프레임 요청 ID를 저장할 상태 변수
  const [totalCount, setTotalCount] = useState(5); // 총 운동 횟수를 저장할 상태 변수
  const [selectedVoice, setSelectedVoice] = useState('아라'); // 선택된 음성을 저장할 상태 변수
  const [isRunning, setIsRunning] = useState(false); // 운동 세션이 실행 중인지 여부를 저장할 상태 변수
  const [correctCount, setCorrectCount] = useState(0); // 올바른 자세의 카운트를 저장할 상태 변수
  const [inCorrectCount, setInCorrectCount] = useState(0); // 잘못된 자세의 카운트를 저장할 상태 변수
  const [comments, setComments] = useState<string[]>([]); // 코멘트를 저장할 상태 변수
  const [predictions, setPredictions] = useState<PosePrediction[]>([]); // 예측 결과를 저장할 상태 변수
  const [status, setStatus] = useState('middle'); // 초기 상태를 'middle'로 설정
  const prevStatusRef = useRef<string>(''); // 이전 상태를 추적하기 위한 useRef 훅

  // useEffect 훅을 사용해 컴포넌트가 마운트될 때 모델을 로드
  useEffect(() => {
    const loadModel = async () => {
      const modelURL = process.env.PUBLIC_URL + '/my_model/model.json'; // 모델 파일의 URL
      const metadataURL = process.env.PUBLIC_URL + '/my_model/metadata.json'; // 메타데이터 파일의 URL

      try {
        const loadedModel = await tmPose.load(modelURL, metadataURL); // Teachable Machine 모델 로드
        setModel(loadedModel); // 로드된 모델을 상태에 저장
        setMaxPredictions(loadedModel.getTotalClasses()); // 최대 예측 수를 상태에 저장
        console.log('Model loaded successfully'); // 모델이 성공적으로 로드되었음을 콘솔에 출력
      } catch (error) {
        console.error('Error loading the model:', error); // 모델 로드 실패 시 에러 출력
      }
    };

    loadModel(); // 모델 로드 함수 호출
  }, []); // 빈 배열을 두 번째 인자로 전달해 컴포넌트가 마운트될 때만 실행

  // 운동 세션을 초기화하는 함수
  const init = async () => {
    if (!model) return; // 모델이 로드되지 않은 경우 함수 종료

    setCorrectCount(0); // 올바른 자세 카운트를 0으로 초기화
    setInCorrectCount(0); // 잘못된 자세 카운트를 0으로 초기화
    setComments([]); // 코멘트를 빈 배열로 초기화
    setStatus('middle'); // 초기 상태를 'middle'로 설정

    const size = 200; // 웹캠 영상의 크기 설정
    const flip = true; // 웹캠 영상을 좌우 반전할지 여부 설정
    const newWebcam = new tmPose.Webcam(size, size, flip); // 새 웹캠 객체 생성
    await newWebcam.setup(); // 웹캠 설정
    await newWebcam.play(); // 웹캠 영상 재생 시작
    setWebcam(newWebcam); // 웹캠 객체를 상태에 저장

    if (videoRef.current) {
      videoRef.current.srcObject = newWebcam.canvas.captureStream(); // 비디오 요소에 웹캠 스트림 연결
    }

    setIsRunning(true); // 운동 세션 실행 중으로 설정

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.style.display = 'block'; // 캔버스 표시
      canvas.width = size; // 캔버스 너비 설정
      canvas.height = size; // 캔버스 높이 설정
    }

    const newRequestID = window.requestAnimationFrame(loop); // 애니메이션 프레임 루프 시작
    setRequestID(newRequestID); // 애니메이션 프레임 요청 ID를 상태에 저장

    playAudio('start'); // 시작 오디오 재생
  };

  // 주기적으로 예측을 수행하는 루프 함수
  const loop = async () => {
    if (!isRunning || !webcam || !model) return; // 세션이 실행 중이 아니거나 웹캠 또는 모델이 없는 경우 함수 종료

    webcam.update(); // 웹캠에서 프레임 업데이트
    await predict(); // 예측 수행

    if (isRunning) {
      // 세션이 아직 실행 중인 경우
      const newRequestID = window.requestAnimationFrame(loop); // 다음 프레임 요청
      setRequestID(newRequestID); // 애니메이션 프레임 요청 ID를 상태에 저장
    }
  };

  // correctCount 또는 inCorrectCount가 변경될 때마다 comments 업데이트
  useEffect(() => {
    if (correctCount + inCorrectCount > 0) {
      setComments((prevComments) => [
        ...prevComments,
        correctCount > inCorrectCount ? `올바른 자세입니다!` : `잘못된 자세입니다.`,
      ]);
    }
  }, [correctCount, inCorrectCount]);

  // correctCount가 업데이트될 때 목표 횟수에 도달했는지 확인
  useEffect(() => {
    console.log(`${isRunning}`);
    if (isRunning && correctCount + inCorrectCount >= totalCount) {
      console.log(`${correctCount}`);
      stop(); // 목표 횟수에 도달하면 운동 세션 종료
    }
  }, [correctCount, inCorrectCount, totalCount, isRunning]);

  // status가 변경될 때마다 새로운 값을 로그로 출력
  useEffect(() => {
    if (prevStatusRef.current !== status) {
      console.log(`이전 상태: ${prevStatusRef.current}, 현재 상태: ${status}`);

      if (status === 'middle' && prevStatusRef.current === 'left') {
        // 이전 상태가 'left'이고 현재 상태가 'center'인 경우에만 카운트 증가
        setCorrectCount((prevCount) => prevCount + 1);
        playAudio(correctCount.toString());
      }
    }
    prevStatusRef.current = status; // 현재 상태를 이전 상태로 업데이트
  }, [status]);

  // 상태 확인하는 함수
  const predict = async () => {
    if (!model || !webcam) return; // 모델 또는 웹캠이 없는 경우 함수 종료

    console.log(`${isRunning}`);
    if (!isRunning) return; // 실행 중이 아닌 경우 함수 종료

    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas); // 웹캠의 현재 프레임에서 포즈 예측
    const prediction = await model.predict(posenetOutput); // 예측 결과 가져오기

    // 좌측에서 중앙으로 이동하는 동작을 감지하여 카운트 증가
    if (status === 'left' && prediction[5].probability > 0.999 && correctCount + inCorrectCount < totalCount) {
      setStatus('middle'); // 상태를 'middle'로 변경
    }

    // 예측 결과에 따라 상태 변경
    if (prediction[0].probability > 0.999) {
      setStatus('left'); // 예측된 포즈가 왼쪽이면 상태를 'left'로 변경
    } else if (prediction[5].probability > 0.999) {
      setStatus('middle'); // 예측된 포즈가 중앙이면 상태를 'middle'로 변경
    }

    // 예측 결과를 상태에 저장하여 렌더링
    setPredictions(prediction);

    drawPose(pose); // 포즈를 캔버스에 그리기
  };

  const stop = () => {
    if (!isRunning) return; // 이미 중지된 경우 추가 처리하지 않음
    setIsRunning(false); // 세션을 실행 중지로 설정

    if (webcam) {
      try {
        webcam.stop(); // 웹캠 중지
      } catch (error) {
        console.error('Error stopping webcam:', error);
      }
    }

    if (requestID) {
      window.cancelAnimationFrame(requestID); // 애니메이션 프레임 요청 취소
    }

    if (canvasRef.current) {
      canvasRef.current.style.display = 'none'; // 캔버스 숨기기
    }

    setTimeout(() => playAudio('finish'), 1000); // 세션 종료 오디오 재생
  };

  // 오디오 재생 함수
  const playAudio = (count: string) => {
    const audioPath = process.env.PUBLIC_URL + `/audio/${selectedVoice}/${count}.mp3`; // 오디오 파일 경로 설정
    const audio = new Audio(audioPath); // 새로운 오디오 객체 생성
    audio.play().catch((err) => console.error('Failed to play audio:', err)); // 오디오 재생, 실패 시 에러 출력
  };

  // 포즈를 캔버스에 그리는 함수
  const drawPose = (pose: any) => {
    const canvas = canvasRef.current; // 캔버스 요소 참조
    if (canvas && webcam) {
      const ctx = canvas.getContext('2d'); // 캔버스의 2D 컨텍스트 가져오기
      ctx?.drawImage(webcam.canvas, 0, 0); // 웹캠에서 캔버스로 이미지 복사

      if (pose) {
        const minPartConfidence = 0.5; // 최소 포즈 신뢰도 설정
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx!); // 관절 점 그리기
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx!); // 뼈대 그리기
      }
    }
  };

  return (
    <S.Container>
      <S.Title>Teachable Machine Pose Model</S.Title>
      <S.ContainerInner>
        <S.Label htmlFor="totalCount">운동 횟수 설정:</S.Label>
        <S.Input
          type="number"
          id="totalCount"
          name="totalCount"
          value={totalCount}
          min="1"
          onChange={(e) => setTotalCount(parseInt(e.target.value))} // 운동 횟수 설정 변경 시 상태 업데이트
        />
        <S.Label htmlFor="voiceSelect">목소리 선택:</S.Label>
        <S.Select id="voiceSelect" onChange={(e) => setSelectedVoice(e.target.value)}>
          {' '}
          {/* 음성 선택 변경 시 상태 업데이트 */}
          <option value="아라">아라</option>
          <option value="레이첼">레이첼</option>
          <option value="와카바">와카바</option>
          <option value="은우">은우</option>
          <option value="토모코">토모코</option>
        </S.Select>
        {/* // 카메라 시작 버튼 클릭 시 init 함수 호출 */}
        <S.Button type="button" onClick={init} children="카메라 시작" />
        {/* // 종료 버튼 클릭 시 stop 함수 호출 */}
        <S.Button type="button" onClick={stop} children="종료" />
        {/* // 캔버스 요소, 초기에는 숨겨져 있음 */}
        <canvas id="canvas" ref={canvasRef} style={{ display: 'none' }} />
        {/* // 라벨 컨테이너 요소 */}
        <S.LabelContainer>
          {predictions.map((pred, index) => (
            <div key={index}>{`${pred.className}: ${Math.round(pred.probability * 100)}%`}</div>
          ))}
        </S.LabelContainer>
        {/* // 카운트 컨테이너 요소 */}
        <S.CountContainer>
          {correctCount} / {totalCount}
        </S.CountContainer>
        {/* // 코멘트 컨테이너 요소 */}
        <S.CommentContainer>
          {comments.map((comment, index) => (
            <div key={index}>
              {index + 1}회차: {comment}
            </div>
          ))}
        </S.CommentContainer>
      </S.ContainerInner>
    </S.Container>
  );
};

export default AI2; // 컴포넌트 내보내기

// Styled components for UI elements
const S = {
  Container: styled.div`
    background-color: #121212;
    color: #ffffff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `,
  Title: styled.h1`
    color: #ffffff;
    margin-bottom: 20px;
    font-size: 24px;
  `,
  ContainerInner: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    background-color: #1f1f1f;
    padding: 20px;
    border-radius: 10px;
  `,
  Label: styled.label`
    font-size: 18px;
    margin-bottom: 8px;
    color: #ffffff;
  `,
  Input: styled.input`
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    background-color: #333333;
    color: #ffffff;
    outline: none;
  `,
  Select: styled.select`
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    background-color: #333333;
    color: #ffffff;
    outline: none;
  `,
  Button: styled.button`
    padding: 10px 20px;
    margin-bottom: 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #6200ea;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      background-color: #3700b3;
    }
  `,
  LabelContainer: styled.div`
    margin-top: 20px;
  `,
  CountContainer: styled.div`
    margin-top: 20px;
  `,
  CommentContainer: styled.div`
    margin-top: 20px;
    color: #ffffff;
  `,
};
