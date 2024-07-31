import React, { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import Calendar from 'react-calendar';
import moment from 'moment';
import '../../styles/modal.css';
import '../../styles/Calendar.css';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Text from '../Common/Text';

const s = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    padding: 20px;
  `,

  CalendarArea: styled.div`
    width: 90%;
    height: auto;
    border: 1px solid red;
    margin: 0 auto;
  `,
  /* 오늘 날짜에 텍스트 삽입 스타일 */
  StyledToday: styled.div`
    font-size: x-small;
    color: ${(props) => props.theme.mainColor};
    font-weight: 600;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  `,

  /* 출석한 날짜에 점 표시 스타일 */
  StyledDot: styled.div`
    background-color: ${(props) => props.theme.mainColor};
    border-radius: 50%;
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
  `,
};

interface FitnessPlanModalProps {
  open: boolean;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const FitnessPlanSetModal = (props: FitnessPlanModalProps): JSX.Element => {
  let test = '테스트';
  const today = new Date();
  const attendDay = ['2024-07-30', '2024-07-15', '2024-08-12'];
  const attendDay2 = ['2024-07-31', '2024-07-16', '2024-08-13'];

  const [date, setDate] = useState<Date>(today);

  const handleChangeDate = (newDate: Date) => {
    const routineDate = moment(newDate).format('YYYY-MM-DD');
    setDate(newDate);
    alert(routineDate);
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
        <Calendar
          locale="ko"
          onClickDay={handleChangeDate}
          value={date}
          formatDay={(locale, date) => moment(date).format('DD')}
          prev2Label={null}
          next2Label={null}
          calendarType="gregory"
          showNeighboringMonth={false}
          minDetail="decade"
          tileDisabled={({ date, view }) => {
            const currentDate = new Date();
            // 일주일 후의 날짜를 구합니다.
            const oneWeekLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
            // 일주일 후부터의 날짜를 비활성화 처리합니다.
            return date >= oneWeekLater;
          }}
          tileClassName={({ date, view }) => {
            if (attendDay.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
              return 'routineFinish';
            }
            if (attendDay2.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
              return 'routine';
            }
          }}
          tileContent={({ date, view }) => {
            let html = [];
            if (view === 'month' && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
              html.push(<s.StyledToday key={'today'}>오늘</s.StyledToday>);
            }
            if (attendDay.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
              html.push(<s.StyledDot key={moment(date).format('YYYY-MM-DD')} />);
            }
            return <>{html}</>;
          }}
        ></Calendar>
        <s.CalendarArea></s.CalendarArea>
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
