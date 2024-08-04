import React from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';


const s = {
  Container: styled.div`
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    margin: 20px 0;
  `,
  Username: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    margin-left: 15px;
  `
};


interface CommentProps {
  profileImage: string;
  username: string;
}


const SearchProfile = (props: CommentProps): JSX.Element => {
  const { profileImage, username } = props;
  return (
    <s.Container>
      <Image
        width="45px"
        height="45px"
        src={profileImage}
      />
      <s.Username>{username}</s.Username>
    </s.Container>
  )
};

export default SearchProfile;