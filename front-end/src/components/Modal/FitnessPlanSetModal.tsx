import React, { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import moment from 'moment';
import '../../styles/modal.css';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Text from '../Common/Text';
import CalendarArea from '../Common/CalendarArea';
import { useModalExitHook } from '../../lib/hook/useModalExitHook';

const s = {
  Container: styled.div`
    width: 100%;
    height: 100%;
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
  onModal: Function;
  onTitle: Function;
  onDate: Function;
}
interface FitnessRoutineProps {
  title: string;
  date: string;
}

const FitnessPlanSetModal = (props: FitnessPlanModalProps): JSX.Element => {
  const attendDay = ['2024-07-30', '2024-07-15', '2024-08-12']; // 운동시작 버튼 누른 날
  const attendDay2 = ['2024-07-31', '2024-07-16', '2024-08-13']; // 운동 시작버튼 안누른 날(계획)

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
      alert('운동을 완료한 날입니다.');
    } else if (attendDay2.find((x) => x === routineDate)) {
      alert('기존 루틴이 있는 날입니다.');
    } else {
      setInfo({ ...info, date: routineDate });
      alert('선택되었습니다.');
      props.onDate(info.date);
    }
  };

  const handleClickInfo = () => {
    if (info.title === '' || info.date === '') {
      alert('제목 및 날짜를 선택하십시오.');
    } else {
      alert('설정되었습니다.');
      props.onTitle(info.title);
      props.onDate(info.date);
      props.onModal();
    }
  };

  return (
    <ReactModal
      isOpen={props.open}
      ariaHideApp={false}
      onRequestClose={() => props.onModal()}
      className="FitnessCalendarModal"
      overlayClassName="Overlay"
    >
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
          placeholder={'루틴제목'}
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
        <CalendarArea
          className="react-calendar"
          onChangeDate={handleChangeDate}
          Routine={attendDay2}
          RoutineFinish={attendDay}
          // pick={info.date}
        />
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
