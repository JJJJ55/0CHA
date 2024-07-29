import React from 'react';
import styled from 'styled-components';

const Img = styled.img<ImgProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: ${(props) => props.cursor};
`;
const s = {
  FeedImg: styled(Img)``,
  ProfileImg: styled(Img)`
    border-radius: 50%;
  `,
};

interface ImgProps {
  width: string;
  height: string;
  src: string;
  type?: string;
  cursor?: string;
  onClick?: Function;
}

const Image = (props: ImgProps): JSX.Element => {
  return <>{props.type === 'rect' ? <s.FeedImg {...props} /> : <s.ProfileImg {...props} />}</>;
};

export default Image;
