import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../lib/hook/useReduxHook';
import { fitnessActions, selectFitnessType } from '../../../store/fitness';

const s = {
  Container: styled.section`
    width: 100%;
    height: 55px !important;
    display: flex;
    justify-content: space-between;
  `,
  SelectArea: styled.button`
    width: 100%;
    color: ${(props) => props.color || props.theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 3px solid ${(props) => props.color || '#000'};
    &:hover {
      color: ${(props) => props.theme.mainColor};
      border-bottom: 3px solid ${(props) => props.theme.mainColor};
    }
  `,
};

const FitnessListTopNav = (): JSX.Element => {
  const type = useAppSelector(selectFitnessType);
  const dispatch = useAppDispatch();
  const handleClickIcon = (mode: string) => {
    dispatch(fitnessActions.changeFitnessType(mode));
  };

  const getColor = (mode: string) => {
    return type === mode ? '#ccff33' : undefined;
  };
  return (
    <s.Container>
      <s.SelectArea onClick={() => handleClickIcon('all')} color={getColor('all')}>
        전체
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('chest')} color={getColor('chest')}>
        가슴
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('back')} color={getColor('back')}>
        등
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('leg')} color={getColor('leg')}>
        하체
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('shoulder')} color={getColor('shoulder')}>
        어깨
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('arm')} color={getColor('arm')}>
        팔
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('etc')} color={getColor('etc')}>
        기타
      </s.SelectArea>
    </s.Container>
  );
};

export default FitnessListTopNav;
