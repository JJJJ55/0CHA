import React from 'react';
import { styled } from 'styled-components';
import Header from '../../components/Common/Header';
import Button from '../../components/Common/Button';
import Text from '../../components/Common/Text';
import RecordInbodyInput from '../../components/Record/Inbody/RecordInbodyInput';
import BottomNav from '../../components/Common/BottomNav';

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
  p: styled.p`
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    line-height: 20px;
    margin: 10px auto;
  `,
  SpanBold: styled.span`
    color: ${(props) => props.theme.mainColor};
    font-size: 14px;
    font-weight: 500;
  `,
  InputArea: styled.div`
    width: 90%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
  `,
  ListLine: styled.hr`
    width: 90%;
    background: #212121;
    height: 1px;
    border: 0;
    margin: 35px auto;
  `,
};

const RecordInBodyScanResultPage = (): JSX.Element => {
  return (
    <s.Container>
      <Header text="인바디 스캔" />
      <s.MainArea>
        <s.p>
          스캔 결과가 <s.SpanBold>부정확</s.SpanBold>한 부분이 있을 수 있습니다. <br />
          정확한 수치를 입력해주세요.
        </s.p>
        <Text
          children="기본 정보"
          width="90%"
          color="textColor2"
          size="14px"
          bold="500"
          margin="20px auto"
          display="block"
        />
        <s.InputArea>
          <RecordInbodyInput id="height" title="신장" unit="cm" />
          <RecordInbodyInput id="weight" title="체중" unit="kg" />
        </s.InputArea>
        <s.ListLine />
        <Text
          children="체성분"
          width="90%"
          color="textColor2"
          size="14px"
          bold="500"
          margin="20px auto"
          display="block"
        />
        <s.InputArea>
          <RecordInbodyInput id="body_water" title="체수분" unit="L" />
          <RecordInbodyInput id="protein" title="단백질" unit="kg" />
        </s.InputArea>
        <s.InputArea>
          <RecordInbodyInput id="mineral" title="무기질" unit="kg" />
          <RecordInbodyInput id="body_fat" title="체지방" unit="kg" />
        </s.InputArea>
        <s.ListLine />
        <Text
          children="근육"
          width="90%"
          color="textColor2"
          size="14px"
          bold="500"
          margin="20px auto"
          display="block"
        />
        <s.InputArea>
          <RecordInbodyInput id="muscle_mass" title="골격근" unit="kg" />
          <RecordInbodyInput id="muscle_body" title="몸통" unit="kg" />
        </s.InputArea>
        <s.InputArea>
          <RecordInbodyInput id="muscle_left_arm" title="왼팔" unit="kg" />
          <RecordInbodyInput id="muscle_right_arm" title="오른팔" unit="kg" />
        </s.InputArea>
        <s.InputArea>
          <RecordInbodyInput id="muscle_left_leg" title="왼다리" unit="kg" />
          <RecordInbodyInput id="muscle_right_leg" title="오른다리" unit="kg" />
        </s.InputArea>
        <s.ListLine />
        <Text
          children="비만"
          width="90%"
          color="textColor2"
          size="14px"
          bold="500"
          margin="20px auto"
          display="block"
        />
        <s.InputArea>
          <RecordInbodyInput id="bmi" title="BMI" unit="kg/m2" />
          <RecordInbodyInput id="body_fat_percent" title="체지방률" unit="%" />
        </s.InputArea>
        <Button
          children="저장하기"
          bold="500"
          size="14px"
          display="block"
          margin="25px auto 0"
          height="40px"
          type="main"
          width="90%"
        />
      </s.MainArea>
      <BottomNav />
    </s.Container>
  );
};

export default RecordInBodyScanResultPage;
