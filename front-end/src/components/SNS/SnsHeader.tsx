import React from 'react';
import styled from 'styled-components';

import IconSvg from '../Common/IconSvg';
import Input from '../Common/Input';
import Image from '../Common/Image';
import { ReactComponent as alarm } from '../../asset/img/svg/alram.svg';
import { ReactComponent as message } from '../../asset/img/svg/message.svg';

import test from '../../asset/img/testImg.png';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { modalActions, selectModalUserSearch } from '../../store/modal';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
  `,
};

const SnsHeader = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };
  const dispatch = useAppDispatch();
  const toggleModal = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      dispatch(modalActions.toggleUserSearch());
    }
  };
  return (
    <s.Container>
      <Image width="35px" height="35px" src={test} cursor="pointer" onClick={() => handleMovePage('../profile/id')} />
      <Input width="60%" height="35px" placeholder="검색" onKeyPress={toggleModal} />
      <IconSvg
        width="25"
        height="25"
        color="#ffffff"
        Ico={alarm}
        cursor="pointer"
        onClick={() => handleMovePage('../notification')}
      />
      <IconSvg
        width="25"
        height="25"
        color="#ffffff"
        Ico={message}
        cursor="pointer"
        onClick={() => handleMovePage('../chat')}
      />
    </s.Container>
  );
};

export default SnsHeader;
