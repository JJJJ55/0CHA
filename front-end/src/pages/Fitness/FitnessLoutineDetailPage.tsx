import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import FitnessPlan from '../../components/Fitness/FitnessList/FitnessPlan';
import { FitnessPlanData } from '../../util/TestData';
import FitnessPlanDetail from './../../components/Fitness/FitnessList/FitnessPlanDetail';
const s = {
  Container: styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    padding: 60px 0 80px;
    border: 1px solid red;
  `,
};

const FitnessLoutineDetatilPage = (): JSX.Element => {
  return (
    <s.Container>
      <Header text={FitnessPlanData.title}>
        <Button width="80px" height="40px" children="불러오기" onClick={() => {}} size="14px" margin="0 20px 0 0" />
      </Header>
      <s.MainArea>
        <FitnessPlanDetail exercise={FitnessPlanData.exercise} />
      </s.MainArea>
      <BottomNav />
    </s.Container>
  );
};

export default FitnessLoutineDetatilPage;
