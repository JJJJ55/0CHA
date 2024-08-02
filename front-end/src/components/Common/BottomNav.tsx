import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as home } from '../../asset/img/svg/home.svg';
import { ReactComponent as fitness } from '../../asset/img/svg/fitness.svg';
import { ReactComponent as routine } from '../../asset/img/svg/calendar.svg';
import { ReactComponent as ai } from '../../asset/img/svg/ai.svg';
import { ReactComponent as sns } from '../../asset/img/svg/sns.svg';
import IconSvg from './IconSvg';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    width: 100%;
    max-width: 800px;
    height: 68px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
  `,
  IconArea: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
};

const BottomNav = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleClickIcon = (index: number, path: string) => {
    setSelectedIndex(index);
    navigate(path);
  };

  const getColor = (index: number) => {
    return selectedIndex === index ? '#ccff33' : '#ffffff';
  };

  return (
    <s.Container>
      <s.IconArea onClick={() => handleClickIcon(0, '/main')}>
        <IconSvg width="25" height="40" color={getColor(0)} Ico={home} />
      </s.IconArea>
      <s.IconArea onClick={() => handleClickIcon(1, '/fitness')}>
        <IconSvg width="25" height="40" color={getColor(1)} Ico={fitness} />
      </s.IconArea>
      <s.IconArea onClick={() => handleClickIcon(2, '/record')}>
        <IconSvg width="25" height="40" color={getColor(2)} Ico={routine} />
      </s.IconArea>
      <s.IconArea onClick={() => handleClickIcon(3, '/ai')}>
        <IconSvg width="25" height="40" color={getColor(3)} Ico={ai} />
      </s.IconArea>
      <s.IconArea onClick={() => handleClickIcon(4, '/sns')}>
        <IconSvg width="25" height="40" color={getColor(4)} Ico={sns} />
      </s.IconArea>
    </s.Container>
  );
};

export default BottomNav;
