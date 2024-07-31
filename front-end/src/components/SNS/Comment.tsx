import React from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';


const s = {
  Container: styled.section`
    height: 40px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 25px;
  `,
  CommentArea: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 3px;
    margin-left: 10px;
  `,
  CommentAuthorArea: styled.div`
    display: flex;
  `,
  CommentAuthor: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
  `,
  CommentMenu: styled.div`
    color: ${(props) => props.theme.textColor2};
    font-size: 12px;
    margin-left: 15px;
  `,
  CommentContent: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
  `,
};


interface CommentProps {
  commentProfileImage: string;
  commentAuthor: string;
  commentContent: string;
  isUserComment: boolean;
}


const Comment = (props: CommentProps): JSX.Element => {
  const { commentProfileImage, commentAuthor, commentContent, isUserComment } = props;
  return (
    <s.Container>
      <Image
        width="34px"
        height="34px"
        src={commentProfileImage}
      />
      <s.CommentArea>
        <s.CommentAuthorArea>
          <s.CommentAuthor>{commentAuthor}</s.CommentAuthor>
          <s.CommentMenu>12시간</s.CommentMenu>
          { isUserComment === true ? (
            <s.CommentMenu>수정</s.CommentMenu>
          ) : (
            <></>)}
          { isUserComment === true ? (
            <s.CommentMenu>삭제</s.CommentMenu>
          ) : (
            <></>)}
        </s.CommentAuthorArea>
        <s.CommentContent>{commentContent}</s.CommentContent>
      </s.CommentArea>
    </s.Container>
  )
};

export default Comment;