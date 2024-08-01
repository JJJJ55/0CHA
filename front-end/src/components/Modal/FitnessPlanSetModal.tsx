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
    padding: 20px 0 20px 0;
  `,

  /* 오늘 날짜에 텍스트 삽입 스타일 */
  StyledToday: styled.div`
    border: 2px solid ${(props) => props.theme.mainColor};
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

interface FitnessPlanModalProps {
  open: boolean;
}
interface FitnessRoutineProps {
  title: string;
  date: string;
}

const FitnessPlanSetModal = (props: FitnessPlanModalProps): JSX.Element => {
  let test = '테스트';
  const today = new Date();
  const attendDay = ['2024-07-30', '2024-07-15', '2024-08-12'];
  const attendDay2 = ['2024-07-31', '2024-07-16', '2024-08-13'];

  const [date, setDate] = useState<Date>(today);
  const [info, setInfo] = useState<FitnessRoutineProps>({
    title: '',
    date: '',
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDate = (newDate: Date) => {
    const routineDate = moment(newDate).format('YYYY-MM-DD');

    if (attendDay.find((x) => x === routineDate)) {
      alert('운동을 완료했습니다.');
    } else if (attendDay2.find((x) => x === routineDate)) {
      alert('기존 루틴이 있는 날입니다.');
    } else {
      setDate(newDate);
      setInfo({ ...info, date: routineDate });
      alert(routineDate);
    }
  };

  const handleClickInfo = () => {
    if (info.title === '' || info.date === '') {
      alert('제목 및 날짜를 선택하십시오.');
    } else {
      alert(info.title + ' ' + info.date);
    }
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
        <Input
          placeholder={test}
          bold="700"
          size="16px"
          width="50%"
          height="40px"
          display="block"
          margin="20px auto"
          name="title"
          value={info.title}
          onChange={handleChangeTitle}
        />
        <Calendar
          locale="ko"
          onClickDay={handleChangeDate}
          value={date}
          formatDay={(locale, date) => moment(date).format('D')}
          prev2Label={null}
          next2Label={null}
          calendarType="gregory"
          showNeighboringMonth={false}
          minDetail="decade"
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
              html.push(<s.StyledToday key={'today'} />);
            }
            return <>{html}</>;
          }}
        ></Calendar>
        <Button
          width="200px"
          height="40px"
          children="설정하기"
          display="block"
          margin="20px auto"
          type="main"
          size="14px"
          bold="700"
          onClick={handleClickInfo}
        />
      </s.Container>
    </ReactModal>
  );
};

export default FitnessPlanSetModal;
