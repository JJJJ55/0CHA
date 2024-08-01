import React from 'react';
import styled from 'styled-components';
import Button from '../../Common/Button';
import Text from '../../Common/Text';

const s = {
  Container: styled.div`
    width: 100%;
    max-width: 800px;
    height: 70px;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid red;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
  `,
  MainArea: styled.div`
    width: 50%;
    border: 1px solid yellow;
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
  `,
  ContentArea: styled.div`
    width: 50%;
    height: 40px;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
};

const FitnessPlayBottomNav = (): JSX.Element => {
  return (
    <s.Container>
      <s.MainArea>
        <s.ContentArea>
          <Text width="100%" children="휴식 시간" bold="500" size="16px" textalian="center" />
          <Text width="100%" children="00:00" bold="700" size="16px" textalian="center" />
        </s.ContentArea>
        <s.ContentArea>
          <Text width="100%" children="운동 시간" bold="500" size="16px" textalian="center" />
          <Text width="100%" children="00:00" bold="700" size="16px" textalian="center" />
        </s.ContentArea>
      </s.MainArea>
      <Button width="40%" height="40px" children="운동 종료" bold="500" type="main" onClick={() => {}} />
    </s.Container>
  );
};

export default FitnessPlayBottomNav;
