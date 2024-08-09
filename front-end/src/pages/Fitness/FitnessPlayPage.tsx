import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import { FitnessPlanData } from '../../util/TestData';
import FitnessPlan from '../../components/Fitness/Detail/FitnessPlan';
import FitnessPlayBottomNav from '../../components/Fitness/Etc/FitnessPlayBottomNav';
import { useLocation, useNavigate } from 'react-router';
import Timer from '../../components/Common/Timer';
import {
  axiosCreateRoutine,
  CreateRoutine,
  ExerciseDetailType,
  RoutineDetails,
  RoutineListDetail,
} from '../../util/types/axios-fitness';
import TestPlan from '../../components/Fitness/Detail/TestPlan';
import { useAppDispatch } from '../../lib/hook/useReduxHook';
import { pageActions } from '../../store/page';
import { putFinishRoutine, putUpdateRoutine } from '../../lib/api/fitness-api';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    padding: 60px 0 80px;
  `,
};

const FitnessPlayPage = (): JSX.Element => {
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const historyData = locationState?.data as RoutineListDetail;
  console.log(historyData);

  // Fallback to user-provided data if historyData is not available
  const data: CreateRoutine[] = locationState?.add || [];

  // Initialize fitness based on historyData or map data to desired structure
  const [fitness, setFitness] = useState<RoutineDetails[]>(
    historyData?.details || data.map((item) => ({ ...item, sequence: 0, sets: [] })),
  );

  // 운동 삭제
  const handleDeleteExercise = (index: number): void => {
    const updatedFitness = fitness.filter((_, idx) => idx !== index);
    setFitness(updatedFitness);
  };

  // 세트 변경
  const handleSetChange = (exerciseIndex: number, updatedSets: ExerciseDetailType[]) => {
    const updatedFitness = fitness.map((exercise, idx) => {
      if (idx === exerciseIndex) {
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setFitness(updatedFitness);
    console.log('Updated fitness:', updatedFitness); // 디버깅 로그
  };

  const dispatch = useAppDispatch();

  const handleFinish = (): void => {
    const param: axiosCreateRoutine = {
      title: historyData.title,
      dueDate: historyData.dueDate,
      sumTime: 500,
      sumVolume: 1000,
      details: fitness,
    };
    console.log(param);
    putFinishRoutine(
      historyData.id!,
      (resp) => {
        console.log('운동완료');
        putUpdateRoutine(
          historyData.id!,
          param,
          (resp) => {
            dispatch(pageActions.toogleIsFinish(true));
            navigate('/play', { state: { data: { date: historyData.dueDate, volume: 500, time: 1000 } } });
          },
          (error) => {
            alert('잠시 후 다시 시도해주세요.');
          },
        );
      },
      (error) => {
        alert('잠시 후 다시 시도해주세요.');
      },
    );
  };

  return (
    <s.Container>
      <Header text="운동" />
      <s.MainArea>
        <Timer />
        {fitness.map((exercise, index) => (
          <div key={index}>
            <TestPlan
              exercise={exercise}
              index={index}
              onChangeSet={handleSetChange}
              onDelete={() => handleDeleteExercise(index)}
            />
          </div>
        ))}{' '}
      </s.MainArea>
      <FitnessPlayBottomNav onFinish={handleFinish} />
    </s.Container>
  );
};

export default FitnessPlayPage;
