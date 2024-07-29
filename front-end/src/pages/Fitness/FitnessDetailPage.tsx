import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import Text from './../../components/Common/Text';
import Button from '../../components/Common/Button';
import IconSvg from '../../components/Common/IconSvg';
import { ReactComponent as jjimOn } from '../../asset/img/svg/jjimOn.svg';
import { ReactComponent as jjimOff } from '../../asset/img/svg/jjimOff.svg';
import test from '../../asset/img/testImg.png';
import Image from '../../components/Common/Image';
import BottomNav from '../../components/Common/BottomNav';
import FitnessDetailChart from '../../components/Fitness/FitnessList/FitnessDetailChart';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  IconArea: styled.div`
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  ContentArea: styled.div`
    width: 100%;
    height: 200px;
    border: 1px solid red;
    display: flex;
    align-items: center;
    line-height: 25px;
    padding: 20px;
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
  `,
};

const FitnessDetailPage = (): JSX.Element => {
  const handleClickJjim = () => {
    alert('클릭');
  };
  return (
    <s.Container>
      <Header text="운동이름">
        <s.IconArea onClick={handleClickJjim}>
          <IconSvg width="24" height="24" Ico={jjimOn} />
        </s.IconArea>
      </Header>
      <Image width="100%" src={test} height="50%" type="rect" />
      <s.ContentArea>
        덤벨 프론트 레이즈는 어깨 근육, 특히 전면 삼각근을 강화하는 데 효과적인 운동입니다. 이 운동은 어깨의 크기와 힘을
        증가시키는 데 도움이 됩니다.
      </s.ContentArea>
      <FitnessDetailChart />
      <BottomNav />
    </s.Container>
  );
};

export default FitnessDetailPage;
