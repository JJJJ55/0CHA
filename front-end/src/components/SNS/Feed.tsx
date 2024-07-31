import React from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import Button from '../Common/Button';
import { ReactComponent as likeOn } from '../../asset/img/svg/likeOn.svg'
import { ReactComponent as likeOff } from '../../asset/img/svg/liekOff.svg'
import { ReactComponent as comment } from '../../asset/img/svg/comment.svg'


const s = {
  FeedContentArea: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    margin: 15px;
  `,
  AuthorName: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
  `,
  FeedCaption: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    margin-left: 8px;
    margin-right: 15px;
  `,
  AuthorProfileArea: styled.div`
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
  AuthorProfileImage: styled(Image)`
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
  const test = () =>{
    alert("클릭")
  }
  const { width, height, src, content, like, likeCnt, commentCnt, authorName, authorProfileImage } = props;
  return (
    <>
    <s.AuthorProfileArea>
      <s.AuthorProfileImage
        width="30px"
        height="30px"
        src={authorProfileImage}
      />
      <s.AuthorName>{authorName}</s.AuthorName>
    </s.AuthorProfileArea>
    <Image 
      width="100%"
      height="auto"
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
      <IconSvg width="25" height="25" color="#ffffff" Ico={comment} onClick={test} />
      <s.FeedCaption>{commentCnt}</s.FeedCaption>
      <s.RoutineButton>
        <Button
          width="90px"
          height="30px"
          children="루틴 불러오기"
          size="12px"
          bold="500"
        />
      </s.RoutineButton>
    </s.FeedInteractionArea>
    <s.FeedContentArea>{content}</s.FeedContentArea>
    </>
  )
};

export default Feed;