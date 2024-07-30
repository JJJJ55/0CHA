import React from 'react';
import styled from 'styled-components';
import { ReactComponent as back } from '../../asset/img/svg/back.svg';
import IconSvg from '../Common/IconSvg';
import Button from '../Common/Button';
import Input from '../Common/Input';

import Image from '../Common/Image';
import test from '../../asset/img/testImg.png';
import { ReactComponent as alarm } from '../../asset/img/svg/alram.svg';
import { ReactComponent as message } from '../../asset/img/svg/message.svg';

import ReactModal from 'react-modal';
import Comment from './Comment';
import { useState } from 'react';


const s = {
  Container: styled.section`
    width: 100%;
    display: flex;

    justify-content: space-between;
    align-items: center;
    /* margin: 15px 0px; */
    padding: 0px 15px;
  `,
  CreateComment: styled.section`
    display: flex;
    justify-content: space-between;

  `,
  ReactModal: styled(ReactModal)`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    `,
  CommentArea: styled.div`
  `,
  TopBar: styled.div`
    margin: 0 auto;
    width: 140px;
    height: 3px;
    background-color: #ffffff;
    margin-bottom: 25px;
  `,
  
};

const CommentModal = (): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const toggleModal = () => {
    setModalIsOpen(false);
  }
  return (
    <>
      <s.ReactModal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        
        onRequestClose={toggleModal}
        // overlayClassName="Overlay"

        style={{
          overlay: {
            width: "100%",
            maxWidth: "800px",
            top: "30%",
            margin: "0 auto",
            backgroundColor: "#000000",
            borderRadius: "12px 12px 0px 0px",
          },
          content: {
            padding: "25px",
            paddingTop: "10px",
            color: "#ffffff",
          }
        }}
      >
        <s.CommentArea>
          <s.TopBar onClick={toggleModal}></s.TopBar>
          <Comment
            commentProfileImage={test}
            commentAuthor='stranger_00'
            commentContent='그 루틴 좋아보이네여'
            isUserComment={false}
          />
          <Comment
            commentProfileImage={test}
            commentAuthor='stranger_00'
            commentContent='아아 마이크체크 마이크체크'
            isUserComment={false}
          />
          <Comment
            commentProfileImage={test}
            commentAuthor='it_is_me'
            commentContent='내 댓글이예요'
            isUserComment={true}
          />
        </s.CommentArea>
        <s.CreateComment>
          <Input
            width="80%"
            height="40px"
            placeholder="댓글 작성"
          />
          <Button
            width="17.5%"
            height="40px"
            type="main"
            children="작성"
          />
        </s.CreateComment>
      </s.ReactModal>
    </>
  );
};

export default CommentModal;
