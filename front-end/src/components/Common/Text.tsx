import React from 'react';
import styled from 'styled-components';

const text = styled.span<identification>`
  width: ${(props) => props.width};
  font-weight: 900;
  font-size: ${(props) => props.size};
  border-radius: 10px;
  font-weight: 100;
  cursor: ${(props) => props.cursor || 'default'};
`;
const s = {
  Guide: styled(text)`
    color: ${(props) => props.theme.textColor};
  `,
  Warning: styled(text)`
    color: ${(props) => props.theme.mainColor};
  `,
};

interface identification {
  width?: string;
  size?: string;
  cursor?: string;
  type?: string;
  onClick?: Function;
  children: React.ReactNode;
}
const Text = (props: identification): JSX.Element => {
  const { width, size, type, children, ...rest } = props;
  return (
    <>
      {type === 'guide' ? (
        <s.Guide width={width} size={size} {...rest}>
          {children}
        </s.Guide>
      ) : (
        <s.Warning width={width} size={size} {...rest}>
          {children}
        </s.Warning>
      )}
    </>
  );
};

export default Text;
