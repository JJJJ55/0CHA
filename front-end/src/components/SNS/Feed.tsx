import React from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import { ReactComponent as likeOn } from '../../asset/img/svg/likeOn.svg'
import { ReactComponent as likeOff } from '../../asset/img/svg/liekOff.svg'
import { ReactComponent as comment } from '../../asset/img/svg/comment.svg'
import IconSvg from '../Common/IconSvg';
import Button from '../Common/Button';


// const feed = styled.span<FeedProps>`
//   width: ${(props) => props.width};
//   height: ${(props) => props.height};
// `;

const s = {
  FeedContentArea: styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  margin: 15px;
  `,
  authorName: styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  `,
  FeedCaption: styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  margin-left: 8px;
  margin-right: 15px;
  `,
  authorProfileArea: styled.div`
  display: flex;
  align-items: center;
  margin: 15px 15px 10px 15px;
  `,
  FeedInteractionArea: styled.div`
  display: flex;
  align-items: center;
  margin: 15px;
  `,
  RoutineButton: styled.div`
  display: flex;
  margin-left: auto; 
  `,
  authorProfileImage: styled(Image)`
  margin-right: 10px;
  `,
};

interface FeedProps {
  width: string;
  height: string;
  src: string;
  authorName: string;
  authorProfileImage: string;
  like: string;
  likeCnt: string;
  commentCnt: string;
  content: string;
}

const Feed = (props: FeedProps): JSX.Element => {
  const { width, height, src, content, like, likeCnt, commentCnt, authorName, authorProfileImage } = props;
  return (
    <>
    <s.authorProfileArea>
      <s.authorProfileImage
        width="7.7vw"
        height="7.7vw"
        src={authorProfileImage}
      />
      <s.authorName>{authorName}</s.authorName>
    </s.authorProfileArea>

    <Image 
      width={width}
      height={height}
      src={src}
      type="rect"
    />
    
    <s.FeedInteractionArea>
    {like === 'true' ? (
      <IconSvg width="25" height="25" color="#ffffff" Ico={likeOn} />
    ) : (
      <IconSvg width="25" height="25" color="#ffffff" Ico={likeOff} />
    )}
      <s.FeedCaption>{likeCnt}</s.FeedCaption>
      <IconSvg width="25" height="25" color="#ffffff" Ico={comment} />
      <s.FeedCaption>{commentCnt}</s.FeedCaption>
      <s.RoutineButton>
        <Button
          width="100%"
          height="30px"
          type="sub"
          children="루틴 불러오기"
        />
      </s.RoutineButton>
    </s.FeedInteractionArea>

    <s.FeedContentArea>{content}</s.FeedContentArea>
    </>
  )
};

export default Feed;