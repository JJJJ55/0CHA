import React, { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import Calendar from 'react-calendar';
import moment from 'moment';
import '../../styles/modal.css';
import 'react-calendar/dist/Calendar.css';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Text from '../Common/Text';

const s = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    padding: 40px;
  `,

  CalendarArea: styled.div`
    width: 80%;
    height: 50%;
    border: 1px solid red;
    margin: 0 auto;
    background-color: red;
  `,
};

interface FitnessPlanModalProps {
  open: boolean;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const FitnessPlanSetModal = (props: FitnessPlanModalProps): JSX.Element => {
  let test = '테스트';
  const [date, setDate] = useState<Value>(new Date());
  // onChange 핸들러 정의
  const handleChangeDate = (newData: Value) => {
    setDate(newData);
    alert(newData);
  };

  return (
    <ReactModal isOpen={true} className="FitnessCalendarModal" overlayClassName="Overlay">
      <s.Container>
        <Text
          children="루틴 제목"
          bold="700"
          size="16px"
          width="40%"
          color="mainColor"
          margin="20px auto"
          display="block"
          textalian="center"
        />
        <Input placeholder={test} bold="700" size="16px" width="50%" height="40px" display="block" margin="20px auto" />
        <s.CalendarArea>
          <Calendar locale="ko" onChange={handleChangeDate} value={date}></Calendar>
        </s.CalendarArea>
        <Button
          width="200px"
          height="40px"
          children="설정하기"
          display="block"
          margin="20px auto"
          type="main"
          size="14px"
          bold="700"
        />
      </s.Container>
    </ReactModal>
  );
};

export default FitnessPlanSetModal;
