import React from 'react';
import styled from 'styled-components';
import BottomNav from '../../components/Common/BottomNav';
import Header from '../../components/Common/Header';
import FitnessPlanDetail from '../../components/Fitness/FitnessList/FitnessPlanDetail';
import { FitnessData, FitnessPlanData } from '../../util/TestData';
import FitnessPlan from '../../components/Fitness/FitnessList/FitnessPlan';
import FitnessPlayBottomNav from '../../components/Fitness/FitnessList/FitnessPlayBottomNav';

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
  return (
    <s.Container>
      <Header text="운동" />
      <s.MainArea>
        <FitnessPlan exercise={FitnessPlanData.exercise} />
      </s.MainArea>
      <FitnessPlayBottomNav />
    </s.Container>
  );
};

export default FitnessPlayPage;
