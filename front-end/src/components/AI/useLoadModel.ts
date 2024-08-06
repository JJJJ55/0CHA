import { useState, useEffect } from 'react';
import * as tmPose from '@teachablemachine/pose';

export const useLoadModel = (modelURL: string, metadataURL: string) => {
  const [model, setModel] = useState<tmPose.CustomPoseNet | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tmPose.load(modelURL, metadataURL);
        setModel(loadedModel);
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    };
    loadModel();
  }, [modelURL, metadataURL]);

  return model;
};
