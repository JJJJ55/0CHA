import React from 'react';
import styled from 'styled-components';

import Button from '../Common/Button';
import Input from '../Common/Input';
import ReactModal from 'react-modal';
import Comment from '../SNS/Comment';
import { useState } from 'react';

import test from '../../asset/img/testImg.png';
import axios from 'axios';


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
  test: styled.span`
    color: red;
  `
};

type commentData = {
  id: number;
  content: string;
  createdAt: string;
  author: {
    userId: number;
    nickname: string;
    profileImage: string;
  }
}

interface CommentModalProps {
  open: boolean;
  onModal: Function;
  data?: commentData[];
  feedId: number | null;
};


const CommentModal = (props: CommentModalProps): JSX.Element => {
  const toggleModal = () => {
    props.onModal();
  };

  const [commentValue, setCommentValue] = useState('');

  const commentOnChange = (event:React.FormEvent<HTMLInputElement>) => {
    const {currentTarget: {value},} = event;
    setCommentValue(value);
    
  };

  const commentOnSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    console.log(commentValue)
    console.log(props.feedId)

    axios.post(`/api/sns/feed/${props.feedId}/comment`, {
      "comment": commentValue
    }, {
      headers: {
        "Authorization": "accessToken"
      }
    }).then((res) => {

    }).catch((error) => {
      
    });
  }

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
            {props.data?.map((data, index) => (
              <Comment key={index}
                commentProfileImage={data.author.profileImage}
                commentAuthor={data.author.nickname}
                commentContent={data.content}
                isUserComment={false}
              />

            ))}
          </s.CommentArea>
          <s.CreateComment>
            <Input width="100%" height="40px" placeholder="댓글 작성" onChange={commentOnChange}/>
            <s.CreateButton>
              <Button width="64px" height="40px" type="main" children="작성" size="14px" bold="500" onClick={commentOnSubmit}/>
            </s.CreateButton>
          </s.CreateComment>
        </s.Container>
      </ReactModal>
    </>
  );
};

export default CommentModal;
