import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

import Button from '../Common/Button';
import Header from '../Common/Header';
import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import { ReactComponent as likeOn } from '../../asset/img/svg/likeOn.svg';
import { ReactComponent as likeOff } from '../../asset/img/svg/likeOff.svg';

import { useNavigate } from 'react-router';
import { SnsItemDetail, SnsItemLike, SnsItemLikeCancel } from '../../lib/api/sns-api';

const s = {
  Container: styled.section`
    padding-top: 57px;
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow-y: auto;
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
    cursor: pointer;
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
  `,
};

interface Item {
  id: number;
  images: string;
  title: string;
  price: string;
  isSold: boolean;
  likeCount: number;
  isLike: number;
  nickname: string;
  content: string;
}

interface MarketModalProps {
  open: boolean;
  onModal: Function;
  itemId: number | null; // 선택된 아이템을 받을 수 있는 프로퍼티 추가
}

const ItemModal = (props: MarketModalProps): JSX.Element => {
  const { itemId, open, onModal } = props;
  const [item, setItem] = useState<Item | null>(null);
  const [like, setLike] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

  const getItemDetail = async () => {
    if (itemId) {
      await SnsItemDetail(
        itemId,
        (resp) => {
          console.log(resp.data);
          setItem(resp.data);
          setLike(resp.data.isLike);
          setLikeCount(resp.data.likeCount);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  const handleLike = async () => {
    if (like) {
      await SnsItemLikeCancel(
        item!.id,
        (resp) => {
          setLike(0);
          setLikeCount(likeCount - 1);
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      await SnsItemLike(
        item!.id,
        (resp) => {
          setLike(1);
          setLikeCount(likeCount + 1);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  useEffect(() => {
    getItemDetail();
  }, [itemId]);

  const handleMovePage = (): void => {
    onModal();
    navigate('../chat/id');
  };

  return (
    <ReactModal
      isOpen={open}
      ariaHideApp={false}
      onRequestClose={() => onModal()}
      className="marketModal"
      overlayClassName="Overlay"
    >
      <s.Header>
        <Header text="거래글 상세" onBack={onModal} />
      </s.Header>
      <s.Container>
        <Image width="100%" height="auto" src={item?.images || ''} type="rect" />
        <s.SellerInfo>
          <Image width="34px" height="34px" src={item?.images || ''} />
          <s.SellerNameArea>
            <s.SellerName>{item?.nickname}</s.SellerName>
            <s.CreatedAt>3시간 전</s.CreatedAt>
          </s.SellerNameArea>
          <s.ButtonArea>
            <s.LikeArea onClick={handleLike}>
              <IconSvg width="23" height="23" Ico={like ? likeOn : likeOff} />
              <s.LikeCnt>{likeCount}</s.LikeCnt>
            </s.LikeArea>
            <Button
              width="80px"
              height="30px"
              children="채팅하기"
              type="main"
              size="14px"
              bold="500"
              onClick={handleMovePage}
            />
          </s.ButtonArea>
        </s.SellerInfo>

        <s.ItemTitleArea>
          <s.ItemName>{item?.title}</s.ItemName>
          <s.ItemPrice>{item?.price}원</s.ItemPrice>
        </s.ItemTitleArea>
        <s.Horizon />
        <s.ItemContent>{item?.content}</s.ItemContent>
      </s.Container>
    </ReactModal>
  );
};

export default ItemModal;
