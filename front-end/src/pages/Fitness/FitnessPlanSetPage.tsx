import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import { FitnessPlanData } from '../../util/TestData';
import FitnessPlan from '../../components/Fitness/FitnessList/FitnessPlan';
import { ReactComponent as add } from '../../asset/img/svg/add.svg';
import IconSvg from '../../components/Common/IconSvg';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import FitnessPlanSetModal from '../../components/Modal/FitnessPlanSetModal';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    border: 3px solid yellow;
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
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid red;
    margin: 15px auto;
    cursor: pointer;
  `,
  FitnessArea: styled.div`
    width: 90%;
    border: 1px solid red;
    margin: 0 auto;
  `,
  FitnessAdd: styled.div`
    width: 100px;
    height: 60px;
    margin: 20px auto;
    border: 1px solid red;
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
    border: 1px solid red;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const FitnessPlanSetPage = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleChangeOpen = (): void => {
    setOpen(!open);
  };
  return (
    <s.Container>
      <Header text="새루틴">
        <Button width="80px" height="40px" children="불러오기" onClick={() => {}} size="14px" margin="0 20px 0 0" />
      </Header>
      <s.ContentArea>
        <s.DateArea onClick={handleChangeOpen}>이름과 날짜를 지정해주세요.</s.DateArea>
        <s.FitnessArea>
          <FitnessPlan exercise={FitnessPlanData.exercise} />
        </s.FitnessArea>
        <s.FitnessAdd>
          운동 추가
          <IconSvg width="24" height="24" Ico={add} />
        </s.FitnessAdd>
        <s.BtnArea>
          <Button
            width="170px"
            height="40px"
            children="루틴 저장"
            onClick={() => {}}
            bold="500"
            size="14px"
            margin="10px"
          />
          <Button
            width="170px"
            height="40px"
            children="운동시작"
            onClick={() => {}}
            bold="500"
            size="14px"
            type="main"
            margin="10px"
          />
        </s.BtnArea>
      </s.ContentArea>
      <BottomNav />
      <FitnessPlanSetModal open={open} />
    </s.Container>
  );
};

export default FitnessPlanSetPage;
