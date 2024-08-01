import React from 'react';
import styled from 'styled-components';
import Image from '../../Common/Image';
import test from '../../../asset/img/testImg.png';
import Text from '../../Common/Text';
import IconSvg from '../../Common/IconSvg';
import { ReactComponent as jjimOn } from '../../../asset/img/svg/jjimOn.svg';
import { ReactComponent as jjimOff } from '../../../asset/img/svg/jjimOff.svg';
import { ReactComponent as addOff } from '../../../asset/img/svg/pickOff.svg';
import { ReactComponent as addOn } from '../../../asset/img/svg/pickOn.svg';

const s = {
  Container: styled.section`
    width: 100%;
    border: 3px solid orange;
    flex: 1;
  `,
  title: styled.div`
    width: 90%;
    border: 1px solid red;
    height: fit-content;
    margin: 10px auto;
    color: ${(props) => props.theme.textColor2};
    font-size: 14px;
  `,
  ListArea: styled.div`
    width: 90%;
    height: 60px;
    margin: 10px auto;
    border: 1px solid lightblue;
    display: flex;
  `,
  ContentArea: styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    border: 3px solid orange;
    cursor: pointer;
  `,
  IconArea: styled.div`
    border: 1px solid red;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  FitnessTitle: styled.span`
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
    margin-left: 30px;
  `,
  ListLine: styled.hr`
    width: 90%;
    background: #212121;
    height: 1px;
    border: 0;
  `,
};

type dataType = {
  src: string;
  title: string;
};

interface FitnessListProps {
  text: string;
  data?: dataType[];
}

const FitnessList = (props: FitnessListProps): JSX.Element => {
  return (
    <s.Container>
      <s.title>{props.text}</s.title>
      {props.data?.map((data, index) => (
        <div key={index}>
          <s.ListArea>
            <s.ContentArea onClick={() => alert('클릭')}>
              <Image width="60" height="60" type="" src={test} />
              <s.FitnessTitle>{data.title}</s.FitnessTitle>
            </s.ContentArea>
            <s.IconArea>
              <IconSvg width="25" height="25" Ico={jjimOff} color="#ccff33" />
              <IconSvg width="25" height="25" Ico={addOff} color="#ccff33" />
            </s.IconArea>
          </s.ListArea>
          {index + 1 === props.data?.length || <s.ListLine />}
        </div>
      ))}
    </s.Container>
  );
};

export default FitnessList;
