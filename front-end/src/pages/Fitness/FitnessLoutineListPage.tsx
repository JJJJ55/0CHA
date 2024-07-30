import React from 'react';
import styled from 'styled-components';
import FitnessRoutineList from '../../components/Fitness/FitnessList/FitnessRoutineList';
import Header from '../../components/Common/Header';
import BottomNav from '../../components/Common/BottomNav';
import Button from '../../components/Common/Button';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
};

const FitnessLoutineListPage = (): JSX.Element => {
  return (
    <>
      <Header text="루틴목록"></Header>
      <s.Container>
        <FitnessRoutineList num={10} />
        <BottomNav />
      </s.Container>
    </>
  );
};

export default FitnessLoutineListPage;
