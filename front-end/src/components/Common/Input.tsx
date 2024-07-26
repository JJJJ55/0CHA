import React from 'react';
import styled from 'styled-components';

const s = {
  input: styled.input<InputProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.theme.subColor};
    color: ${(props) => props.theme.textColor};
    font-weight: 500;
    size: 14px;
    margin: ${(props) => props.margin};
    &::placeholder {
      color: ${(props) => props.theme.textColor};
    }
  `,
};

interface InputProps {
  width?: string;
  height?: string;
  placeholder?: string;
  margin?: string;
  size?: string;
  type?: string;
  name: string;
  value: string;
  onChange: Function;
}
const Input = (props: InputProps): JSX.Element => {
  const { width, height, placeholder, type, margin, name, value, onChange } = props;
  return (
    <s.input
      type={type}
      width={width}
      height={height}
      margin={margin}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
