import React from 'react';
import styled, { css } from 'styled-components';

const s = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7); // 투명도 설정
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,
  ModalContent: styled.div`
    background: #000;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: ${(props) => props.theme.mainColor};
    width: 80%;
    max-width: 400px;
    overflow: hidden;
  `,
  ModalTitle: styled.h2`
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainColor};
  `,
  ResultList: styled.div`
    margin-bottom: 20px;
    text-align: left;
  `,
  ResultItem: styled.div<{ isError: boolean }>`
    margin: 5px 0;
    ${(props) =>
      props.isError
        ? css`
            color: ${(props) => props.theme.textColor};
          `
        : css`
            color: ${(props) => props.theme.mainColor};
          `}
    font-size: 14px;
  `,
  ConfirmBtn: styled.button`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
  `,
};

interface ResultModalProps {
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ onClose }) => {
  const results = [
    { set: 1, isError: false, message: '좋은 자세입니다.' },
    { set: 2, isError: true, message: '허리 굽힘이 발생했습니다.' },
    { set: 3, isError: false, message: '좋은 자세입니다.' },
    { set: 4, isError: true, message: '더 내려가야 합니다.' },
    { set: 5, isError: false, message: '좋은 자세입니다.' },
    { set: 6, isError: false, message: '좋은 자세입니다.' },
    { set: 7, isError: false, message: '좋은 자세입니다.' },
    { set: 8, isError: true, message: '더 내려가야 합니다.' },
    { set: 9, isError: false, message: '좋은 자세입니다.' },
    { set: 10, isError: false, message: '좋은 자세입니다.' },
  ];

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <s.ModalOverlay onClick={handleOverlayClick}>
      <s.ModalContent onClick={(e) => e.stopPropagation()}>
        <s.ModalTitle children="실행 결과" />
        <s.ResultList>
          {results.map((result) => (
            <s.ResultItem key={result.set} isError={result.isError}>
              {result.set}회차 {result.isError ? 'X' : 'O'} {result.message}
            </s.ResultItem>
          ))}
        </s.ResultList>
        <s.ConfirmBtn onClick={onClose}>확인</s.ConfirmBtn>
      </s.ModalContent>
    </s.ModalOverlay>
  );
};

export default ResultModal;
