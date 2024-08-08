import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import { ReactComponent as add } from '../../asset/img/svg/add.svg';
import IconSvg from '../../components/Common/IconSvg';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import FitnessPlanSetModal from '../../components/Modal/FitnessPlanSetModal';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { modalActions, selectModalCalendar } from '../../store/modal';
import { useModalExitHook } from '../../lib/hook/useModalExitHook';
import { pageActions } from '../../store/page';
import FitnessPlan from '../../components/Fitness/Detail/FitnessPlan';
import { CreateRoutine, ExerciseDetailType } from '../../util/types/axios-fitness';
import Text from '../../components/Common/Text';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  ContentArea: styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 57px 0 80px;
  `,
  DateArea: styled.div`
    color: ${(props) => props.theme.textColor2};
    font-size: 16px;
    width: 200px;
    height: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px auto;
    cursor: pointer;
  `,
  FitnessArea: styled.div`
    width: 90%;
    margin: 0 auto;
  `,
  FitnessAdd: styled.div`
    width: 100px;
    height: 60px;
    margin: 20px auto;
    color: ${(props) => props.theme.mainColor};
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  `,
  BtnArea: styled.div`
    width: 100%;
    max-width: 500px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const FitnessPlanSetPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('이름과 날짜를 지정해주세요.');
  const [date, setDate] = useState('');
  const data: CreateRoutine[] = useLocation().state?.add || [];
  const [fitness, setFitness] = useState<
    {
      name: string;
      id: number;
      detail: ExerciseDetailType[];
    }[]
  >(data.map((item) => ({ ...item, detail: [] })));

  const handleChangeOpen = (): void => {
    dispatch(modalActions.toggleCalendar());
  };

  const handleClickMove = (path: string): void => {
    navigate(path);
  };

  const handleDeleteExercise = (index: number): void => {
    const updatedFitness = fitness.filter((_, idx) => idx !== index);
    setFitness(updatedFitness);
  };

  const handleSetChange = (exerciseIndex: number, updatedSets: ExerciseDetailType[]) => {
    const updatedFitness = fitness.map((exercise, idx) => {
      if (idx === exerciseIndex) {
        return { ...exercise, detail: updatedSets };
      }
      return exercise;
    });
    setFitness(updatedFitness);
  };

  const isModal = useAppSelector(selectModalCalendar);
  const dispatch = useAppDispatch();

  const toggleModal = (): void => {
    dispatch(modalActions.toggleCalendar());
  };

  const handlePlay = (): void => {
    console.log('Current Fitness Data:', fitness); // 콘솔에 현재 데이터를 출력
    // dispatch(pageActions.toogleIsPlay(true));
    // navigate('/play', { state: { fitnessData: fitness } }); // 데이터를 운동 페이지로 전달
  };

  useModalExitHook();

  return (
    <s.Container>
      <Header text="새루틴">
        <Button
          width="80px"
          height="40px"
          children="불러오기"
          onClick={() => handleClickMove('../history')}
          size="14px"
          margin="0 20px 0 0"
        />
      </Header>
      <s.ContentArea>
        <s.DateArea onClick={handleChangeOpen}>
          {title}
          <Text
            children={date}
            margin="0 auto"
            size="16px"
            bold="500"
            textalian="center"
            display="block"
            color="textColor2"
            cursor="pointer"
          />
        </s.DateArea>

        <s.FitnessArea>
          {fitness.map((exercise, index) => (
            <div key={index}>
              <FitnessPlan
                exercise={exercise}
                index={index + 1}
                onChangeSet={(exerciseIndex, updatedSets) => handleSetChange(exerciseIndex, updatedSets)}
                onDelete={() => handleDeleteExercise(index)}
              />
            </div>
          ))}
        </s.FitnessArea>
        <s.FitnessAdd onClick={() => handleClickMove('../list')}>
          운동 추가
          <IconSvg width="24" height="24" Ico={add} />
        </s.FitnessAdd>
        <s.BtnArea>
          <Button
            width="170px"
            height="40px"
            children="루틴 저장"
            onClick={() => {
              alert('저장되었습니다.');
              handleClickMove('../history');
            }}
            bold="500"
            size="14px"
            margin="10px"
          />
          <Button
            width="170px"
            height="40px"
            children="운동시작"
            onClick={handlePlay}
            bold="500"
            size="14px"
            type="main"
            margin="10px"
          />
        </s.BtnArea>
      </s.ContentArea>
      <BottomNav />
      <FitnessPlanSetModal open={isModal} onModal={toggleModal} onTitle={setTitle} onDate={setDate} />
    </s.Container>
  );
};

export default FitnessPlanSetPage;
