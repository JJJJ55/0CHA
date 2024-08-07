import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '../Common/Button';
import Input from '../Common/Input';
import ReactModal from 'react-modal';
import Comment from '../SNS/Comment';

import { SnsCommentWrite } from '../../lib/api/sns-api';

const s = {
  Container: styled.section`
    height: 100%;
    padding: 10px;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    border-radius: 10px 10px 0 0;
  `,
  CreateComment: styled.section`
    display: flex;
    justify-content: space-between;
  `,
  CommentArea: styled.div`
    flex-grow: 1;
    overflow: auto;
  `,
  TopBar: styled.div`
    margin: 0 auto;
    width: 140px;
    height: 3px;
    background-color: #ffffff;
    margin-bottom: 25px;
    cursor: pointer;
  `,
  CreateButton: styled.div`
    margin-left: 10px;
  `,
};

type commentData = {
  comment: string;
  createdAt: string;
  feedId: number;
  id: number;
  nickname: string;
  profileImage: string;
  userId: number;
};

interface CommentModalProps {
  open: boolean;
  onModal: Function;
  data?: commentData[];
  feedId: number | null;
};

const CommentModal = (props: CommentModalProps): JSX.Element => {
  const { open, onModal, data, feedId } = props;

  const [commentValue, setCommentValue] = useState('');
  const [comments, setComments] = useState<commentData[]>(data || []);

  useEffect(() => {
    setComments(data || []);
  }, [data]);

  const toggleModal = () => {
    onModal();
  };

  const commentOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = event;
    setCommentValue(value);
  };

  const commentOnSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    if (feedId) {
      await SnsCommentWrite(
        feedId,
        commentValue,
        (resp) => {
          console.log(resp);
          // 새로운 댓글을 상태에 추가합니다.
          const newComment: commentData = {
            comment: commentValue,
            // createdAt: new Date().toISOString(),
            createdAt: "방금",
            feedId: feedId,
            id: 111111111,
            nickname: '나는누구지', // 사용자 닉네임을 적절히 설정해주세요.
            profileImage: 'path/to/profile/image', // 프로필 이미지를 적절히 설정해주세요.
            userId: 111111111,
          };

          console.log(newComment)
          setComments([...comments, newComment]);
          setCommentValue(''); // 입력 필드를 초기화합니다.
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  return (
    <>
      <ReactModal
        isOpen={open}
        ariaHideApp={false}
        onRequestClose={toggleModal}
        overlayClassName="Overlay"
        className="CommentModal"
      >
        <s.Container>
          <s.TopBar onClick={toggleModal}></s.TopBar>
          <s.CommentArea>
            {comments.map((data, index) => (
              <Comment key={index}
                commentProfileImage={data.profileImage}
                commentAuthor={data.nickname}
                commentContent={data.comment}
                isUserComment={false}
                createdAt={data.createdAt}
              />
            ))}
          </s.CommentArea>
          <s.CreateComment>
            <Input width="100%" height="40px" placeholder="댓글 작성" onChange={commentOnChange} value={commentValue} />
            <s.CreateButton>
              <Button width="64px" height="40px" type="main" size="14px" bold="500" onClick={commentOnSubmit}>
                작성
              </Button>
            </s.CreateButton>
          </s.CreateComment>
        </s.Container>
      </ReactModal>
    </>
  );
};

export default CommentModal;
