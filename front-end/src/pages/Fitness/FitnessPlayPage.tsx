import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import { FitnessPlanData } from '../../util/TestData';
import FitnessPlan from '../../components/Fitness/Detail/FitnessPlan';
import FitnessPlayBottomNav from '../../components/Fitness/Etc/FitnessPlayBottomNav';

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
