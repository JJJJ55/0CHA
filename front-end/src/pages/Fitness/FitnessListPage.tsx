import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Common/Input';
import TopNav from '../../components/Fitness/FitnessList/TopNav';
import FitnessList from '../../components/Fitness/FitnessList/FitnessList';
import { FitnessData } from '../../util/TestData';
import Button from '../../components/Common/Button';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    border: 3px solid yellow;
  `,
  InputArea: styled.div`
    width: 80%;
    margin: 10px auto;
    border: 1px solid red;
  `,
  FitnessArea: styled.div`
    width: 100%;
    border: 3px solid aqua;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
};

const FitnessListPage = (): JSX.Element => {
  return (
    <s.Container>
      <s.InputArea>
        <Input width="100%" height="40px" placeholder="검색" type="text" name="" value={''} onChange={() => {}} />
      </s.InputArea>
      <TopNav />
      <s.FitnessArea>
        <FitnessList text="즐겨찾기" data={FitnessData} />
        <FitnessList text="전체" data={FitnessData} />
      </s.FitnessArea>
      <Button
        width="169px"
        height="40px"
        children="새 루틴에 추가하기"
        size="14px"
        onClick={() => {}}
        margin="10px auto"
        type="main"
        display="block"
      />
    </s.Container>
  );
};

export default FitnessListPage;
