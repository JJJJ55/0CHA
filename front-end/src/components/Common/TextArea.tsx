import React from 'react';
import styled from 'styled-components';

const s = {
  TextArea: styled.textarea<TextAreaProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.theme.subColor};
    color: ${(props) => props.theme.textColor};
    font-weight: 500;
    size: 14px;
    outline: none;
    border-radius: 10px;
    border: none;
    resize: none;
    padding: 10px;
  `,
};

interface TextAreaProps {
  width?: string;
  height?: string;
  placeholder?: string;
}

const TextArea = (props: TextAreaProps): JSX.Element => {
  const { width, height, placeholder } = props;

  return <s.TextArea width={width} height={height} placeholder={placeholder} />;
};
export default TextArea;
