import React, { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

import Button from '../Common/Button';
import Header from '../Common/Header';
import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import { ReactComponent as likeOn } from '../../asset/img/svg/likeOn.svg'
import { ReactComponent as likeOff } from '../../asset/img/svg/liekOff.svg'

import test from '../../asset/img/testImg.png';


const s = {
  Container: styled.section`
    padding-top: 57px;
    height: 100%;
    overflow-y: auto;
  `,
  ReactModal: styled(ReactModal)`
    height: 100%;
  `,
  Header: styled.div`
    position: fixed;
  `,
  SellerInfo: styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  `,
  SellerName: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 7px;
  `,
  CreatedAt: styled.div`
    color: #666666;
    font-size: 12px;
    font-weight: 400;
  `,
  LikeCnt: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    font-weight: 500;
    margin-left: 7px;
  `,
  SellerNameArea: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  `,
  LikeArea: styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
  `,
  ButtonArea: styled.div`
    display: flex;
    margin-left: auto;
  `,
  ItemTitleArea: styled.div`
    margin: 20px 0;
    padding: 0 20px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  ItemName: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: 500;
  `,
  ItemPrice: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: 700;
  `,
  Horizon: styled.hr`
    margin: 0 20px;
    border-color: #212121;
  `,
  ItemContent: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    padding: 0 20px;
    margin: 20px 0;
  `
};


const ItemModal = (): JSX.Element => {
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
      style={{
        overlay: {
          width: "100%",
          height: "100%",
          maxWidth: "800px",
          backgroundColor: "#000000",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
        content: {
          color: "#ffffff",

        }
      }}
    >
      <s.Header onClick={toggleModal}>
        <Header text="거래글 상세"/>
      </s.Header>
      <s.Container>
        <Image
          width="100%"
          height="auto"
          src={test}
          type="rect"
        />

      <s.SellerInfo>
        <Image
          width="34px"
          height="34px"
          src={test}
        />
        <s.SellerNameArea>
          <s.SellerName>stranger_00</s.SellerName>
          <s.CreatedAt>3시간 전</s.CreatedAt>
        </s.SellerNameArea>
        <s.ButtonArea>
          <s.LikeArea>
            <IconSvg width="23" height="23" Ico={likeOn}/>
            <s.LikeCnt>25</s.LikeCnt>
          </s.LikeArea>
          <Button
            width="80px"
            height="30px"
            children="채팅하기"
            type="main"
            size="14px"
            bold="500"
          />
        </s.ButtonArea>
      </s.SellerInfo>

      <s.ItemTitleArea>
        <s.ItemName>덤벨 40kg</s.ItemName>
        <s.ItemPrice>50,000원</s.ItemPrice>
      </s.ItemTitleArea>
      <s.Horizon/>
      <s.ItemContent>40kg 덤벨 판매합니다. 무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요무거워요</s.ItemContent>
      {/* <s.ItemContent>40kg 덤벨 판매합니다. 무거워요</s.ItemContent> */}
      </s.Container>
    </s.ReactModal>
    </>
  );
};

export default ItemModal;
