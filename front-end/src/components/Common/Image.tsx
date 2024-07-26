import React from 'react';
import styled from 'styled-components';

const Img = styled.img<ImgProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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
}

const Image = (props: ImgProps): JSX.Element => {
  const { width, height, src, type } = props;
  return (
    <>
      {type === 'rect' ? (
        <s.FeedImg width={width} height={height} src={src} />
      ) : (
        <s.ProfileImg width={width} height={height} src={src} />
      )}
    </>
  );
};

export default Image;
