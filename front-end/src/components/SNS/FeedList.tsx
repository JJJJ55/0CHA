import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import Button from '../Common/Button';
import { ReactComponent as likeOn } from '../../asset/img/svg/likeOn.svg';
import { ReactComponent as likeOff } from '../../asset/img/svg/likeOff.svg';
import { ReactComponent as comment } from '../../asset/img/svg/comment.svg';
import { useNavigate } from 'react-router';

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
  comment: number;
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


const FeedList = (props: FeedListProps): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };
  const { onClick } = props;
  return (
    
    
    <>
    {/* {props.data === "피드 0개입니다" ? (
      <s.AuthorName>피드 0개입니다</s.AuthorName>
    ) : (
      <div></div>
    )} */}
    {props.data?.map((data, index) => (
      <s.FeedItem key={index}>
      <s.AuthorProfileArea>
        <s.AuthorProfileImage
          width="30px"
          height="30px"
          src={data.profileImage}
          onClick={() => handleMovePage('../profile/id')}
        />
        <s.AuthorName onClick={() => handleMovePage('../profile/id')}>{data.nickname}</s.AuthorName>
      </s.AuthorProfileArea>
      <Image
        width="100%"
        height="auto"
        src={data.image}
        type="rect"
      />
      <s.FeedInteractionArea>
        <s.IconArea>
          {data.isLike === 1 ? (
            <IconSvg width="25" height="25" color="#ffffff" Ico={likeOn} />
          ) : (
            <IconSvg width="25" height="25" color="#ffffff" Ico={likeOff} />
          )}
          <s.FeedCaption>{data.likeCount}</s.FeedCaption>
        </s.IconArea>
        {/* <s.IconArea onClick={onClick}> */}
        <s.IconArea onClick={() => onClick(data.id)}>
          <IconSvg
            width="25"
            height="25"
            color="#ccff33"
            Ico={comment}
          />
          <s.FeedCaption>{data.comment}</s.FeedCaption>
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
      <s.FeedContentArea>{data.content}</s.FeedContentArea>
      {index + 1 === props.data?.length}
      </s.FeedItem>
    ))}
    </>
  );
};

export default FeedList;
