import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import Text from '../../components/Common/Text';
import { exerciseData } from '../../util/TestData';
import Chart from '../../components/Common/Chart';
import { getFitnessData } from '../../lib/api/record-api';
import { FitnessData } from '../../util/types/axios-record';
import { fitnessActions, selectRmType } from '../../store/fitness';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';

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
  TextBtnArea: styled.section`
    width: 90%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    margin: 5px auto 50px;
  `,
  Btn: styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.color || '#fff'};
  `,
};

const RecordFitnessChartPage = (): JSX.Element => {
  const [fitnessData, setFitnessData] = useState<FitnessData[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [totalVolumes, setTotalVolumes] = useState<number[]>([]);
  const [totalTimes, setTotalTimes] = useState<number[]>([]);

  useEffect(() => {
    getFitnessData(
      (resp) => {
        setFitnessData(resp.data);
        setDates(fitnessData.map((data) => data.date));
        setTotalVolumes(fitnessData.map((data) => data.totalVolume));
        setTotalTimes(fitnessData.map((data) => data.totalTime));
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
    return () => {
      dispatch(fitnessActions.changeRmType('스쿼트'));
    };
  }, []);

  useEffect(() => {
    setDates(fitnessData.map((data) => data.date));
    setTotalVolumes(fitnessData.map((data) => data.totalVolume));
    setTotalTimes(fitnessData.map((data) => data.totalTime));
  }, [fitnessData]);

  const rmType = useAppSelector(selectRmType);
  const dispatch = useAppDispatch();
  const handleButtonClick = (dataType: string) => {
    dispatch(fitnessActions.changeRmType(dataType));
    // setcompositionChart(dataType);
  };

  const getColor = (mode: string) => {
    return rmType === mode ? '#ccff33' : undefined;
  };

  console.log(totalTimes);
  const labels = ['07.14', '07.15', '07.16', '07.17', '07.18', '07.19', '07,20'];
  return (
    <s.Container>
      <Header text="운동 기록" />
      <s.MainArea>
        <Text children="1RM" width="90%" bold="700" color="textColor" size="16px" display="block" margin="20px auto" />
        <Chart labels={labels} datas={exerciseData} />
        <s.TextBtnArea>
          <s.Btn onClick={() => handleButtonClick('스쿼트')} color={getColor('스쿼트')}>
            스쿼트
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick('데드리프트')} color={getColor('데드리프트')}>
            데드리프트
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick('벤치프레스')} color={getColor('벤치프레스')}>
            벤치프레스
          </s.Btn>
        </s.TextBtnArea>
        <Text
          children="운동량"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="100px auto 20px"
        />
        {totalVolumes.length === 0 ? (
          <Text
            children="데이터가 존재하지 않습니다."
            width="90%"
            bold="700"
            color="textColor"
            size="16px"
            display="block"
            margin="20px auto"
          />
        ) : (
          <Chart labels={dates} datas={totalVolumes} />
        )}

        <Text
          children="운동시간"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="100px auto 20px"
        />
        {totalTimes.length === 0 ? (
          <Text
            children="데이터가 존재하지 않습니다."
            width="90%"
            bold="700"
            color="textColor"
            size="16px"
            display="block"
            margin="20px auto"
          />
        ) : (
          <Chart labels={dates} datas={totalTimes} />
        )}
      </s.MainArea>
      {/* <BottomNav /> */}
    </s.Container>
  );
};

export default RecordFitnessChartPage;
