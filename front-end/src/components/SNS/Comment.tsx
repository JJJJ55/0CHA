import React from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import { create } from 'lodash';


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
  createdAt: string;
}


const Comment = (props: CommentProps): JSX.Element => {
  const { commentProfileImage, commentAuthor, commentContent, isUserComment, createdAt } = props;

  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const now = today.toISOString();

  const year=Number(now.substring(0, 4));
  const month=Number(now.substring(5, 7));
  const day=Number(now.substring(8, 10));
  const hour=Number(now.substring(11, 13));
  const minute=Number(now.substring(14, 16));
  const createdYear=Number(createdAt.substring(0, 4));
  const createdMonth=Number(createdAt.substring(5, 7));
  const createdDay=Number(createdAt.substring(8, 10));
  const createdHour=Number(createdAt.substring(11, 13));
  const createdMinute=Number(createdAt.substring(14, 16));
  
  let createdStr;
  let createdRecent;

  if (year === createdYear) {
    if (month === createdMonth) {
      if (day === createdDay) {
        if (hour === createdHour) {
          createdRecent="minute"
          createdStr=minute-createdMinute;
        } else {
          createdRecent="hour"
          createdStr=hour-createdHour;
        }
      } else {
        createdRecent="false";
      }
    }
  }

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

          {createdAt === "방금" ? (
            <s.CommentMenu>방금</s.CommentMenu>
          ) : (
          <>
          {createdRecent === "false" ? (
            <s.CommentMenu>{createdAt.substring(0, 4)}년 {createdAt.substring(5, 7)}월 {createdAt.substring(8, 10)}일</s.CommentMenu>
          ) : (
            <>
              {createdRecent === "hour" ? (
                <s.CommentMenu>{createdStr}시간 전</s.CommentMenu>
              ) : (
                <s.CommentMenu>{createdStr}분 전</s.CommentMenu>
              )}
            </>
          )}
          </>
          )}

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