import React from 'react';
import styled from 'styled-components';
import Text from '../../Common/Text';
import Button from '../../Common/Button';
import IconSvg from '../../Common/IconSvg';
import { ReactComponent as jjimOn } from '../../../asset/img/svg/jjimOn.svg';
import { ReactComponent as jjimOff } from '../../../asset/img/svg/jjimOff.svg';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.div`
    height: 100%;
    padding: 60px 0 60px;
    overflow: auto;
  `,
  ListBoxArea: styled.div``,
  ListArea: styled.div`
    width: 80%;
    height: 60px;
    margin: 10px auto;
    display: flex;
    align-items: center;
  `,
  ContentArea: styled.div`
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: column;
    cursor: pointer;
  `,
  IconArea: styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  ListLine: styled.hr`
    width: 80%;
    background: #212121;
    height: 1px;
    border: 0;
  `,
};

interface RoutineListProps {
  num: number;
}

const FitnessRoutineList = (props: RoutineListProps): JSX.Element => {
  const navigate = useNavigate();
  const handleClickMove = (): void => {
    navigate('detail');
  };
  return (
    <s.Container>
      {[...Array(props.num)].map((n, index) => (
        <s.ListBoxArea key={index}>
          <s.ListArea>
            <s.ContentArea onClick={handleClickMove}>
              <Text
                width="100%"
                children="가슴루틴"
                color="textColor"
                size="16px"
                bold="700"
                margin="10px"
                cursor="pointer"
              />
              <Text
                width="100%"
                children="07.16"
                color="textColor2"
                size="14px"
                bold="700"
                margin="0 0 0 10px"
                cursor="pointer"
              />
            </s.ContentArea>
            <s.IconArea>
              <IconSvg width="25" height="25" Ico={jjimOff} />
            </s.IconArea>
          </s.ListArea>
          {/* {index + 1 === props.data?.length || <s.ListLine />} */}
          <s.ListLine />
        </s.ListBoxArea>
      ))}
    </s.Container>
  );
};

export default FitnessRoutineList;
