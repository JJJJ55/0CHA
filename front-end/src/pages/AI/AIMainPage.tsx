import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import ResultModal from '../../components/AI/ResultModal';
import SettingModal from '../../components/AI/SettingModal';

const s = {
  Container: styled.div`
    padding: 60px 0 80px;
    background-color: ${(props) => props.theme.Color};
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  `,
  PageBody: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  `,
  CameraBox: styled.div`
    width: 80%;
    height: 70%;
    border: 1px solid red;
    color: ${(props) => props.theme.textColor};
  `,
  CameraHeader: styled.h2`
    font-size: 15px;
    color: ${(props) => props.theme.textColor};
    margin: 4px;
  `,
  SettingBtn: styled.button`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
  `,
};

const AIMainPage: React.FC = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      <Header text="AI 트레이너" />
      <s.Container>
        <s.CameraHeader children="카메라를 사용자 기준 우측 하단에 위치해 주세요." />
        <s.CameraBox children="카메라 화면" />
        <s.PageBody>
          {isResultModalOpen && <ResultModal onClose={() => setIsResultModalOpen(false)} />}
          {isSettingsModalOpen && <SettingModal onClose={() => setIsSettingsModalOpen(false)} />}
          <s.SettingBtn onClick={() => setIsSettingsModalOpen(true)} children="트레이닝 설정" />
          <s.SettingBtn onClick={() => setIsResultModalOpen(true)} children="결과 보기" />
        </s.PageBody>
      </s.Container>
    </>
  );
};

export default AIMainPage;
