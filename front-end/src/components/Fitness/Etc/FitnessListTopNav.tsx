import React from 'react';
import styled from 'styled-components';

const s = {
  Container: styled.section`
    width: 100%;
    height: 55px !important;
    display: flex;
    justify-content: space-between;
  `,
  SelectArea: styled.button`
    width: 100%;
    color: ${(props) => props.theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    &:hover {
      color: ${(props) => props.theme.mainColor};
      border-bottom: 3px solid ${(props) => props.theme.mainColor};
    }
  `,
};

const FitnessListTopNav = (): JSX.Element => {
  return (
    <s.Container>
      <s.SelectArea>전체</s.SelectArea>
      <s.SelectArea>가슴</s.SelectArea>
      <s.SelectArea>등</s.SelectArea>
      <s.SelectArea>하체</s.SelectArea>
      <s.SelectArea>어깨</s.SelectArea>
      <s.SelectArea>팔</s.SelectArea>
      <s.SelectArea>기타</s.SelectArea>
    </s.Container>
  );
};

export default FitnessListTopNav;
