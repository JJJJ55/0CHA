import React, { MouseEventHandler, useEffect, useId, useState } from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import Button from '../Common/Button';
import { ReactComponent as comment } from '../../asset/img/svg/comment.svg';
import { useNavigate } from 'react-router';

import LikeIcon from './LikeIcon';

import { SnsFeedDel } from '../../lib/api/sns-api';

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
    justify-content: space-between;
    margin: 15px 15px 10px 15px;
  `,
  AuthorProfile: styled.div`
    display: flex;
    align-items: center;
  `,
  MyFeedMenuArea: styled.div`
    display: flex;
  `,
  MyFeedMenu: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    cursor: pointer;
    margin-left: 20px;
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
  FeedItem: styled.div<FeedDeleteProps>`
    margin-bottom: 80px;
    display: ${(props) => (props.$isdelete === false ? '' : 'none')};
  `,
  ImageArea: styled.div`
    width: 100%;
    aspect-ratio: 1;
    border: #212121 1px solid;
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
  feedId: number;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  userId: number;
  nickname: string;
  profileImage: string;
  isLike: number;
  // onClick: MouseEventHandler<HTMLDivElement>;
  onClick: (id: number) => void;
  loginUser: number;
};

interface FeedDeleteProps {
  $isdelete?: boolean;
}



const FeedList = (props: FeedListProps): JSX.Element => {
  
// const FeedList = ({data, onClick}: FeedListProps): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };

  


  // 피드 삭제
  const [isDelete, setIsDelete] = useState(false);

  const feedDelOnClick = async (feedId: number) => {
    console.log(feedId, 'feedId')
    console.log(props.userId, '로그인유저')
    SnsFeedDel(
      feedId,
      (resp) => {
        console.log(resp.data);
        setIsDelete(true);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <>

      <s.FeedItem key={props.feedId} $isdelete={isDelete}>
      <s.AuthorProfileArea>
        <s.AuthorProfile>
          <s.AuthorProfileImage
            width="30px"
            height="30px"
            src={props.profileImage}
            onClick={() => handleMovePage(`../profile/${props.userId}`)}
          />
          <s.AuthorName onClick={() => handleMovePage(`../profile/${props.userId}`)}>{props.nickname}</s.AuthorName>
        </s.AuthorProfile>
        {props.userId === props.loginUser ? (
          <s.MyFeedMenuArea>
            <s.MyFeedMenu>수정</s.MyFeedMenu>
            <s.MyFeedMenu onClick={() => {feedDelOnClick(props.feedId)}}>삭제</s.MyFeedMenu>
          </s.MyFeedMenuArea>
        ) : (
          <></>
        )}
        
      </s.AuthorProfileArea>
      <s.ImageArea>
        <Image
          width="100%"
          height="100%"
          src={props.image}
          type="rect"
        />
      </s.ImageArea>
      <s.FeedInteractionArea>
        <LikeIcon feedId={props.feedId} isLike={props.isLike} likeCount={props.likeCount} />
        <s.IconArea onClick={() => props.onClick(props.feedId)}>
          <IconSvg
            width="25"
            height="25"
            color="#ccff33"
            Ico={comment}
          />
          <s.FeedCaption>{props.commentCount}</s.FeedCaption>
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
      <s.FeedContentArea>{props.content}</s.FeedContentArea>
      </s.FeedItem>    
    </>
  );
};

export default FeedList;
