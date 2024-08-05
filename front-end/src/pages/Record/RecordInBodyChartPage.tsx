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
    padding: 60px 0 40px;
    overflow: auto;
  `,
  TextBtnArea: styled.section`
    width: 90%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    margin: 5px auto 50px;
  `,
  Btn: styled.button`
    width: 100%;
    color: ${(props) => props.theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    &:hover {
      color: ${(props) => props.theme.mainColor};
    }
  `,
};

const RecordInBodyChartPage = (): JSX.Element => {
  const labels = ['07.14', '07.15', '07.16', '07.17', '07.18', '07.19', '07,20'];
  return (
    <s.Container>
      <Header text="인바디 결과" />
      <s.MainArea>
        <Text
          children="체성분"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="20px auto"
        />
        <Chart labels={labels} datas={exerciseData} />
        <s.TextBtnArea>
          <s.Btn>체지방</s.Btn>
          <s.Btn>단백질</s.Btn>
          <s.Btn>무기질</s.Btn>
          <s.Btn>체수분</s.Btn>
        </s.TextBtnArea>
        <Text
          children="골격근"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="20px auto"
        />
        <Chart labels={labels} datas={exerciseData} />
        <s.TextBtnArea>
          <s.Btn>골격근량</s.Btn>
          <s.Btn>체지방량</s.Btn>
          <s.Btn>체중</s.Btn>
        </s.TextBtnArea>
        <Text
          children="부위별 근육"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="20px auto"
        />
        <Chart labels={labels} datas={exerciseData} />
        <s.TextBtnArea>
          <s.Btn>왼팔</s.Btn>
          <s.Btn>오른팔</s.Btn>
          <s.Btn>몸통</s.Btn>
          <s.Btn>오른다리</s.Btn>
          <s.Btn>왼다리</s.Btn>
        </s.TextBtnArea>
      </s.MainArea>
      {/* <BottomNav /> */}
    </s.Container>
  );
};

export default RecordInBodyChartPage;
