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
    z-index: 1000; // 맨 위로
  `,
  ModalContent: styled.div`
    background: ${(props) => props.theme.bgColor};
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
  ResultItem: styled.div<{ $isError: boolean }>`
    margin: 5px 0;
    /* 양호, 불량에 대한 스타일링 */
    ${(props) =>
      props.$isError
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
// 결과
interface Result {
  set: number;
  isError: boolean;
  message: string;
}

interface ResultModalProps {
  onClose: () => void;
  results: Result[];
}

const ResultModal: React.FC<ResultModalProps> = ({ onClose, results }) => {
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
            <s.ResultItem key={result.set} $isError={result.isError}>
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
