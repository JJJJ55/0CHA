import React, { useState, useRef } from 'react';

const CameraApp = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [facingMode, setFacingMode] = useState('user'); // 'user'는 전방 카메라, 'environment'는 후방 카메라

  const startCamera = () => {
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
          setCameraStarted(true);
        }
      })
      .catch((error) => {
        console.error('카메라 접근 권한이 거부되었습니다:', error);
      });
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        setPhotoTaken(true);
      }
    }
  };

  const downloadPhoto = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'photo.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setPhotoTaken(false);
  };

  const switchCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    setCameraStarted(false); // 카메라를 다시 시작해야 새로운 facingMode가 적용됩니다.
  };

  return (
    <div>
      <h1>웹 기반 카메라 PWA</h1>
      <div>
        <button onClick={startCamera} disabled={cameraStarted}>
          카메라 시작
        </button>
        <button onClick={switchCamera} disabled={!cameraStarted}>
          {facingMode === 'user' ? '후방 카메라로 전환' : '전방 카메라로 전환'}
        </button>
        <button onClick={takePhoto} disabled={!cameraStarted || photoTaken}>
          사진 촬영
        </button>
        <button onClick={downloadPhoto} disabled={!photoTaken}>
          사진 다운로드
        </button>
      </div>
      <div>
        <video ref={videoRef} autoPlay playsInline width="100%" height="100%" />
      </div>
      <div>
        <canvas
          ref={canvasRef}
          width={videoRef.current?.videoWidth}
          height={videoRef.current?.videoHeight}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default CameraApp;
