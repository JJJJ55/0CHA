import { useState, useEffect, useRef } from 'react';
import * as tmPose from '@teachablemachine/pose';

interface PosePrediction {
  probability: number;
  className: string;
}

interface UseExerciseTrackingProps {
  model: tmPose.CustomPoseNet | null;
  webcam: tmPose.Webcam | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  totalCount: number;
}

export const useExerciseTracking = ({ model, webcam, canvasRef, totalCount }: UseExerciseTrackingProps) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [inCorrectCount, setInCorrectCount] = useState(0);
  const [predictions, setPredictions] = useState<PosePrediction[]>([]);
  const [status, setStatus] = useState('middle');
  const [progress, setProgress] = useState<number>(0);
  const prevStatusRef = useRef<string>('');
  const requestIDRef = useRef<number | null>(null);

  const stopTracking = () => {
    if (webcam) {
      webcam.stop();
    }
    if (requestIDRef.current) {
      cancelAnimationFrame(requestIDRef.current);
    }
    if (canvasRef.current) {
      canvasRef.current.style.display = 'none';
    }
  };

  useEffect(() => {
    if (correctCount + inCorrectCount >= totalCount) {
      stopTracking();
    }
  }, [correctCount, inCorrectCount, totalCount]);

  useEffect(() => {
    if (prevStatusRef.current !== status) {
      if (status === 'middle' && prevStatusRef.current === 'left') {
        setCorrectCount((prevCount) => prevCount + 1);
        const nextProgress = progress + 100 / totalCount;
        setProgress(nextProgress);
      }
    }
    prevStatusRef.current = status;
  }, [status]);

  const loop = async () => {
    if (!canvasRef.current || !webcam || !model) return;

    webcam.update();
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    const context = canvasRef.current.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.drawImage(webcam.canvas, 0, 0);

      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, context);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, context);
      }

      setPredictions(prediction);

      context.font = '400px Pretendard';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      const centerX = canvasRef.current.width / 2;
      const centerY = canvasRef.current.height / 2;

      if (status === 'left' && prediction[5].probability > 0.999 && correctCount + inCorrectCount < totalCount) {
        setStatus('middle');
      }
      if (prediction[0].probability > 0.999) {
        setStatus('left');
        context.fillStyle = 'green';
        context.fillText('X', centerX, centerY);
      } else if (prediction[5].probability > 0.999) {
        setStatus('middle');
      } else if (prediction[1].probability > 0.999) {
        setStatus('right');
      }

      if (status !== 'middle' && prediction[5].probability < 0.999) {
        context.fillStyle = 'red';
        context.fillText('X', centerX, centerY);
      }
    }

    requestIDRef.current = requestAnimationFrame(loop);
  };

  return {
    predictions,
    correctCount,
    inCorrectCount,
    status,
    progress,
    startTracking: () => requestAnimationFrame(loop),
    stopTracking,
  };
};
