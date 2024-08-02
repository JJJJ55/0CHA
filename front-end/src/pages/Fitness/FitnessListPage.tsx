import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Common/Input';
import FitnessListTopNav from '../../components/Fitness/Etc/FitnessListTopNav';
import FitnessList from '../../components/Fitness/List/FitnessList';
import { FitnessData } from '../../util/TestData';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import { Outlet, useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  HeaderArea: styled.div`
    width: 100%;
    max-width: 800px;
    position: fixed;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    height: 100%;
    padding: 120px 0 140px;
    border: 1px solid red;
    overflow: auto;
  `,
  InputArea: styled.div`
    width: 80%;
    margin: 10px auto;
  `,
  FitnessArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  Btn: styled.button`
    width: 169px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    margin: 10px auto;
    display: block;
    position: fixed;
    background-color: ${(props) => props.theme.mainColor};
    border-radius: 10px;
    bottom: 70px;
    left: 0;
    right: 0;
  `,
};

const FitnessListPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleClickMove = (): void => {
    navigate('../plan');
  };
  return (
    <s.Container>
      <s.HeaderArea>
        <s.InputArea>
          <Input width="100%" height="40px" placeholder="검색" type="text" name="" value={''} onChange={() => {}} />
        </s.InputArea>
        <FitnessListTopNav />
      </s.HeaderArea>
      <s.MainArea>
        <s.FitnessArea>
          <FitnessList text="즐겨찾기" data={FitnessData} />
          <FitnessList text="전체" data={FitnessData} />
        </s.FitnessArea>
      </s.MainArea>
      <Outlet />
      <s.Btn onClick={handleClickMove}>새 루틴에 추가하기</s.Btn>
      <BottomNav />
    </s.Container>
  );
};

export default FitnessListPage;
