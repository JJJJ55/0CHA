import React, { MouseEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import Button from '../Common/Button';
import { ReactComponent as comment } from '../../asset/img/svg/comment.svg';
import { useNavigate } from 'react-router';

import LikeIcon from './LikeIcon';

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
    cursor: pointer;
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
    cursor: pointer;
  `,
  IconArea: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
  FeedItem: styled.div`
    margin-bottom: 80px;
  `
};

type feedData = {
  id: number;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  userId: number;
  nickname: string;
  profileImage: string;
  isLike: number;
};

interface FeedListProps {
  data?: feedData[];
  // onClick: MouseEventHandler<HTMLDivElement>;
  onClick: (id: number) => void;
};


const FeedList = ({data, onClick}: FeedListProps): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };


  return (
    <>
    {data?.map((feed) => (
      <s.FeedItem key={feed.id}>
      <s.AuthorProfileArea>
        <s.AuthorProfileImage
          width="30px"
          height="30px"
          src={feed.profileImage}
          onClick={() => handleMovePage('../profile/id')}
        />
        <s.AuthorName onClick={() => handleMovePage('../profile/id')}>{feed.nickname}</s.AuthorName>
      </s.AuthorProfileArea>
      <Image
        width="100%"
        height="auto"
        src={feed.image}
        type="rect"
      />
      <s.FeedInteractionArea>
        <LikeIcon feedId={feed.id} isLike={feed.isLike} likeCount={feed.likeCount} />
        <s.IconArea onClick={() => onClick(feed.id)}>
          <IconSvg
            width="25"
            height="25"
            color="#ccff33"
            Ico={comment}
          />
          <s.FeedCaption>{feed.commentCount}</s.FeedCaption>
        </s.IconArea>
        <s.RoutineButton>
          <Button
            width="90px"
            height="30px"
            children="루틴 불러오기"
            size="12px"
            bold="500"
            onClick={() => handleMovePage('/fitness/history/detail')}
          />
        </s.RoutineButton>
      </s.FeedInteractionArea>
      <s.FeedContentArea>{feed.content}</s.FeedContentArea>
      </s.FeedItem>
    ))}
    </>
  );
};

export default FeedList;
