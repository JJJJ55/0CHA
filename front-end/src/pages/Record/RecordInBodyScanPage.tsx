import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import Button from '../../components/Common/Button';
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
  CameraArea: styled.div`
    width: 80%;
    height: 550px;
    border: 1px solid red;
    margin: 0 auto;
  `,
  BtnArea: styled.div`
    width: 80%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
  `,
};

const RecordInBodyScanPage = (): JSX.Element => {
  return (
    <s.Container>
      <Header text="인바디 스캔" />
      <s.MainArea>
        <s.p>
          결과지 테두리를 <s.SpanBold>사각형</s.SpanBold>에 맞춘 후<br /> 촬영 버튼을 눌러주세요.
        </s.p>
        <s.CameraArea />
        <s.BtnArea>
          <Button width="47%" height="40px" children="갤러리" bold="500" size="14px" type="main" />
          <Button width="47%" height="40px" children="촬영" bold="500" size="14px" type="main" />
        </s.BtnArea>
      </s.MainArea>
      <BottomNav />
    </s.Container>
  );
};

export default RecordInBodyScanPage;
