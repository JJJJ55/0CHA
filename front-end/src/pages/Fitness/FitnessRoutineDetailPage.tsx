import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import FitnessPlan from '../../components/Fitness/Detail/FitnessPlan';
import { FitnessPlanData } from '../../util/TestData';
import FitnessRoutineListDetail from '../../components/Fitness/Detail/FitnessRoutineListDetail';
const s = {
  Container: styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    padding: 60px 0 80px;
  `,
};

const FitnessRoutineDetatilPage = (): JSX.Element => {
  return (
    <s.Container>
      <Header text={FitnessPlanData.title}>
        <Button width="80px" height="40px" children="불러오기" onClick={() => {}} size="14px" margin="0 20px 0 0" />
      </Header>
      <s.MainArea>
        <FitnessRoutineListDetail exercise={FitnessPlanData.exercise} />
      </s.MainArea>
      <BottomNav />
    </s.Container>
  );
};

export default FitnessRoutineDetatilPage;
