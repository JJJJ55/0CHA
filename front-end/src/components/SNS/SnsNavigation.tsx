import React, { useEffect } from 'react';
import styled from 'styled-components';

import Button from '../Common/Button';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { pageActions, selectSnsType } from '../../store/page';

const s = {
  Container: styled.section`
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
  `,
  NavigationSelect: styled.select`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 600;
    background-color: #000000;
    border: none;
    line-height: 2;
    cursor: pointer;
    outline: none;
  `,
  NavigationOption: styled.option`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  `,
};

const SnsNavigation = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };

  const snsType = useAppSelector(selectSnsType);
  const dispatch = useAppDispatch();
  const handleChangeSnsType = () => {
    snsType === 'feed' ? dispatch(pageActions.changeSnsType('market')) : dispatch(pageActions.changeSnsType('feed'));
  };
  useEffect(() => {
    snsType === 'feed' ? navigate('../feed', { replace: true }) : navigate('../market', { replace: true });
  }, [snsType]);
  return (
    <s.Container>
      <s.NavigationSelect value={snsType} onChange={handleChangeSnsType}>
        <s.NavigationOption value={'feed'}>운동</s.NavigationOption>
        <s.NavigationOption value={'market'}>거래</s.NavigationOption>
      </s.NavigationSelect>
      <Button
        width="45px"
        height="30px"
        type="main"
        children="작성"
        bold="500"
        size="12px"
        onClick={() => handleMovePage('write')}
      />
    </s.Container>
  );
};

export default SnsNavigation;
