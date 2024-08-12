import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import { useLocation, useNavigate } from 'react-router';
import {
  axiosCreateRoutine,
  ExerciseDetailType,
  RoutineDetails,
  RoutineListDetail,
} from '../../util/types/axios-fitness';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { pageActions } from '../../store/page';
import { putFinishRoutine, putUpdateRoutine } from '../../lib/api/fitness-api';
import FitnessPlayPlan from '../../components/Fitness/Detail/FitnessPlayPlan';
import { fitnessActions, selectPlan, selectSave, selectTime, selectVolume } from '../../store/fitness';

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
  const isSave = useAppSelector(selectSave);
  const plan = useAppSelector(selectPlan);
  let planTest = { ...plan };
  const locationState = useLocation().state;
  const historyData = planTest || (locationState?.data as RoutineListDetail);
  const time = useAppSelector(selectTime);
  const volume = useAppSelector(selectVolume);
  console.log(historyData);

  // Fallback to user-provided data if historyData is not available
  // const data: CreateRoutine[] = locationState?.add || [];

  // Initialize fitness based on historyData or map data to desired structure
  const [fitness, setFitness] = useState<RoutineDetails[]>(
    // historyData?.details || data.map((item) => ({ ...item, sequence: 0, sets: [] })),
    historyData?.details,
  );

  useEffect(() => {
    if (isSave) {
      setFitness(planTest.details);
      save();
      // setFitness(plan.details.map((item) => ({ ...item, sequence: 0, sets: [] })));
    }
    // return () => {
    //   save();
    // };
  }, []);

  useEffect(() => {
    save();
  }, [fitness]);

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
    // save();
    console.log('Updated fitness:', updatedFitness); // 디버깅 로그
  };

  const save = () => {
    const param: axiosCreateRoutine = {
      id: historyData.id || planTest.id,
      title: historyData.title || planTest.title,
      dueDate: historyData.dueDate || planTest.dueDate,
      sumTime: time,
      sumVolume: volume,
      details: fitness,
    };
    dispatch(fitnessActions.setPlanData(param));
    dispatch(fitnessActions.toggleSave(true));
  };

  // 피트니스 바텀 nav
  const dispatch = useAppDispatch();

  const handleFinish = (t: number) => {
    const param: axiosCreateRoutine = {
      title: historyData.title || planTest.title,
      dueDate: historyData.dueDate || planTest.dueDate,
      sumTime: t,
      sumVolume: volume,
      details: fitness,
    };
    console.log(param);
    putUpdateRoutine(
      historyData.id! || planTest.id!,
      param,
      (resp) => {
        putFinishRoutine(
          historyData.id! || planTest.id!,
          (resp) => {
            dispatch(pageActions.toogleIsFinish(true));
            navigate('/play', {
              state: { data: { date: historyData.dueDate || planTest.dueDate, volume: volume, time: t } },
            });
          },
          (error) => {
            alert('잠시 후 다시 시도해주세요.(운동완료)');
          },
        );
      },
      (error) => {
        alert('잠시 후 다시 시도해주세요.(운동루틴수정)');
      },
    );
  };

  return (
    <s.Container>
      <Header text="운동" onBack={() => navigate('/main')} />
      <s.MainArea>
        {fitness.map((exercise, index) => (
          <div key={index}>
            <FitnessPlayPlan
              exercise={exercise}
              index={index}
              onChangeSet={handleSetChange}
              onDelete={() => handleDeleteExercise(index)}
              onFinish={handleFinish}
            />
          </div>
        ))}
      </s.MainArea>
    </s.Container>
  );
};

export default FitnessPlayPage;
