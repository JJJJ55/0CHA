import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import BottomNav from '../../components/Common/BottomNav';
import Text from '../../components/Common/Text';
import { exerciseData } from '../../util/TestData';
import Chart from '../../components/Common/Chart';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    height: 100%;
    padding: 60px 0 80px;
    overflow: auto;
  `,
};

const RecordFitnessChartPage = (): JSX.Element => {
  const labels = ['07.14', '07.15', '07.16', '07.17', '07.18', '07.19', '07,20'];
  return (
    <s.Container>
      <Header text="운동 기록" />
      <s.MainArea>
        <Text children="1RM" width="90%" bold="700" color="textColor" size="16px" display="block" margin="20px auto" />
        <Chart labels={labels} datas={exerciseData} />
        <Text
          children="운동량"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="100px auto 20px"
        />
        <Chart labels={labels} datas={exerciseData} />
        <Text
          children="운동시간"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="100px auto 20px"
        />
        <Chart labels={labels} datas={exerciseData} />
      </s.MainArea>
      {/* <BottomNav /> */}
    </s.Container>
  );
};

export default RecordFitnessChartPage;
