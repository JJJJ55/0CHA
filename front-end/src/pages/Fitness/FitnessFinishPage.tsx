import React from 'react';
import styled from 'styled-components';
import { ReactComponent as finish } from '../../asset/img/svg/finish.svg';
import Text from '../../components/Common/Text';
import IconSvg from '../../components/Common/IconSvg';
import Button from '../../components/Common/Button';
import { useNavigate } from 'react-router';
const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    position: relative;
    top: 15%;
  `,
  IconArea: styled.div`
    width: fit-content;
    margin: 0 auto 60px;
  `,
  ContentArea: styled.div`
    width: 280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin: 5px auto;
  `,
  BtnArea: styled.div`
    width: 100%;
    max-width: 500px;
    height: 70px;
    position: relative;
    top: 30%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const FitnessFinishPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleClickMove = (path: string): void => {
    navigate(path);
  };
  return (
    <s.Container>
      <s.MainArea>
        <Text
          width="150px"
          textalian="center"
          children="운동 완료"
          bold="800"
          size="32px"
          color="mainColor"
          display="block"
          margin="0 auto 20px"
        />
        <s.IconArea>
          <IconSvg width="50" height="50" Ico={finish} />
        </s.IconArea>
        <Text
          width="80%"
          textalian="center"
          children="오늘의 루틴을 완료했어요."
          size="18px"
          color="textColor"
          display="block"
          margin="20px auto 0"
        />
        <Text
          width="80%"
          textalian="center"
          children="지금 피드에 업로드해보세요."
          size="18px"
          color="textColor"
          display="block"
          margin="5px auto 60px"
        />
        <Text
          width="280px"
          textalian="left"
          children="07.18."
          size="16px"
          color="textColor2"
          display="block"
          margin="0 auto"
        />
        <s.ContentArea>
          <Text width="50%" textalian="left" children="운동 시간" size="18px" color="textColor" />
          <Text width="50%" textalian="right" children="1:00:05" size="18px" color="textColor" bold="bold" />
        </s.ContentArea>
        <s.ContentArea>
          <Text width="50%" textalian="left" children="운동량" size="18px" color="textColor" />
          <Text width="50%" textalian="right" children={'6300' + 'kg'} size="18px" color="textColor" bold="bold" />
        </s.ContentArea>
      </s.MainArea>
      <s.BtnArea>
        <Button
          width="170px"
          height="40px"
          children="확인"
          onClick={() => handleClickMove('record')}
          bold="500"
          size="14px"
          margin="10px"
        />
        <Button
          width="170px"
          height="40px"
          children="업로드"
          onClick={() => {}}
          bold="500"
          size="14px"
          type="main"
          margin="10px"
        />
      </s.BtnArea>
    </s.Container>
  );
};

export default FitnessFinishPage;
