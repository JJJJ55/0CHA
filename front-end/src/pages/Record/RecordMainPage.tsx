import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import CalendarArea from '../../components/Common/CalendarArea';
import Text from '../../components/Common/Text';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import IconSvg from '../../components/Common/IconSvg';
import { ReactComponent as move } from '../../asset/img/svg/move.svg';
import { useNavigate } from 'react-router';
const s = {
  Continer: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    height: 100%;
    padding: 60px 0 80px;
    overflow: auto;
  `,
  TextBtnArea: styled.div`
    width: 80%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
    cursor: pointer;
  `,
};

const RecordMainPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleClickMove = (path: string): void => {
    navigate(path);
  };
  const attendDay = ['2024-07-30', '2024-07-15', '2024-08-12']; // 운동시작 버튼 누른 날
  const attendDay2 = ['2024-07-31', '2024-07-16', '2024-08-13']; // 운동 시작버튼 안누른 날(계획)
  const handleChangeDate = () => {};

  return (
    <s.Continer>
      <Header text="기록" />
      <s.MainArea>
        <CalendarArea
          className="react-calendar__record"
          onChangeDate={handleChangeDate}
          Routine={attendDay2}
          RoutineFinish={attendDay}
        />
        <Text
          children="7월 19일"
          color="textColor2"
          bold="500"
          size="14px"
          width="80%"
          display="block"
          margin="0 auto"
        />
        <Button
          width="80%"
          height="40px"
          children="등록하기"
          bold="500"
          size="14px"
          type="main"
          display="block"
          margin="20px auto 50px"
        />
        <Text
          children="기록관리"
          color="textColor2"
          bold="500"
          size="14px"
          width="80%"
          display="block"
          margin="0 auto"
        />
        <s.TextBtnArea onClick={() => handleClickMove('../inbody/scan')}>
          <Text children="인바디 등록" color="textColor" bold="500" size="16px" width="100px" cursor="pointer" />
          <IconSvg width="24" height="24" Ico={move} />
        </s.TextBtnArea>
        <s.TextBtnArea onClick={() => handleClickMove('../inbody/data')}>
          <Text children="인바디 결과" color="textColor" bold="500" size="16px" width="100px" cursor="pointer" />
          <IconSvg width="24" height="24" Ico={move} />
        </s.TextBtnArea>
        <s.TextBtnArea onClick={() => handleClickMove('../data')}>
          <Text children="운동 기록" color="textColor" bold="500" size="16px" width="100px" cursor="pointer" />
          <IconSvg width="24" height="24" Ico={move} />
        </s.TextBtnArea>
      </s.MainArea>
      {/* <BottomNav /> */}
    </s.Continer>
  );
};

export default RecordMainPage;
