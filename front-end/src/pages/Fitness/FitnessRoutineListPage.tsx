import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FitnessRoutineList from '../../components/Fitness/List/FitnessRoutineList';
import Header from '../../components/Common/Header';
import BottomNav from '../../components/Common/BottomNav';
import Button from '../../components/Common/Button';
import { getRoutineList } from '../../lib/api/fitness-api';
import { RoutineList } from '../../util/types/axios-fitness';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
};

const FitnessRoutineListPage = (): JSX.Element => {
  const [routine, setRoutine] = useState<RoutineList[]>([]);
  useEffect(() => {
    getRoutineList(
      (resp) => {
        setRoutine(resp.data);
      },
      (error) => {},
    );
  }, []);
  return (
    <>
      <Header text="루틴목록"></Header>
      <s.Container>
        <FitnessRoutineList list={routine} />
        <BottomNav />
      </s.Container>
    </>
  );
};

export default FitnessRoutineListPage;
