import React from 'react';
import styled from 'styled-components';

import Button from '../Common/Button';
import Input from '../Common/Input';
import ReactModal from 'react-modal';
import Comment from '../SNS/Comment';
import { useState } from 'react';

import test from '../../asset/img/testImg.png';

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

interface CommentModalProps {
  open: boolean;
  onModal: Function;
}

const CommentModal = (props: CommentModalProps): JSX.Element => {
  const toggleModal = () => {
    props.onModal();
  };
  return (
    <>
      <ReactModal
        isOpen={props.open}
        ariaHideApp={false}
        onRequestClose={() => props.onModal()}
        overlayClassName="Overlay"
        className="CommentModal"
      >
        <s.Container>
          <s.TopBar onClick={toggleModal}></s.TopBar>
          <s.CommentArea>
            <Comment
              commentProfileImage={test}
              commentAuthor="stranger_00"
              commentContent="그 루틴 좋아보이네여"
              isUserComment={false}
            />
            <Comment
              commentProfileImage={test}
              commentAuthor="stranger_00"
              commentContent="아아 마이크체크 마이크체크"
              isUserComment={false}
            />
            <Comment
              commentProfileImage={test}
              commentAuthor="it_is_me"
              commentContent="내 댓글이예요"
              isUserComment={true}
            />
            <Comment
              commentProfileImage={test}
              commentAuthor="it_is_me"
              commentContent="내 댓글이예요"
              isUserComment={true}
            />
            <Comment
              commentProfileImage={test}
              commentAuthor="it_is_me"
              commentContent="내 댓글이예요"
              isUserComment={true}
            />
            <Comment
              commentProfileImage={test}
              commentAuthor="it_is_me"
              commentContent="내 댓글이예요"
              isUserComment={true}
            />
            <Comment
              commentProfileImage={test}
              commentAuthor="it_is_me"
              commentContent="내 댓글이예요"
              isUserComment={true}
            />
            <Comment
              commentProfileImage={test}
              commentAuthor="it_is_me"
              commentContent="내 댓글이예요"
              isUserComment={true}
            />
            <Comment
              commentProfileImage={test}
              commentAuthor="it_is_me"
              commentContent="내 댓글이예요"
              isUserComment={true}
            />
          </s.CommentArea>
          <s.CreateComment>
            <Input width="100%" height="40px" placeholder="댓글 작성" />
            <s.CreateButton>
              <Button width="64px" height="40px" type="main" children="작성" size="14px" bold="500" />
            </s.CreateButton>
          </s.CreateComment>
        </s.Container>
      </ReactModal>
    </>
  );
};

export default CommentModal;
