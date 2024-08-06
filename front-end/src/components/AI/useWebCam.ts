import { useState, useEffect, useRef } from 'react';
import * as tmPose from '@teachablemachine/pose';

export const useWebCam = (size: number, flip: boolean) => {
  const [webcam, setWebcam] = useState<tmPose.Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [requestID, setRequestID] = useState<number | null>(null);

  useEffect(() => {
    const setupWebcam = async () => {
      const newWebcam = new tmPose.Webcam(size, size, flip);
      await newWebcam.setup();
      await newWebcam.play();
      setWebcam(newWebcam);
    };

    setupWebcam();

    return () => {
      if (requestID) {
        window.cancelAnimationFrame(requestID);
      }
    };
  }, [size, flip]);

  return { webcam, canvasRef, requestID, setRequestID };
};
