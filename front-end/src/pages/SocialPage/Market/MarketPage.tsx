import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SnsHeader from '../../../components/SNS/SnsHeader';
import SnsNavigation from '../../../components/SNS/SnsNavigation';
import BottomNav from '../../../components/Common/BottomNav';
import LocationDropdown from '../../../components/SNS/LocationDropdown';
import MarketItem from '../../../components/SNS/MarketItem';
import ItemModal from '../../../components/Modal/ItemModal';

import test from '../../../asset/img/testImg.png';
import { useAppDispatch, useAppSelector } from '../../../lib/hook/useReduxHook';
import { modalActions, selectModalMarket, selectModalUserSearch } from '../../../store/modal';
import { useModalExitHook } from '../../../lib/hook/useModalExitHook';
import UserSearchModal from '../../../components/Modal/UserSearchModal';

import { SnsItemList } from '../../../lib/api/sns-api';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding-bottom: 68px;
  `,
  Horizon: styled.hr`
    margin: 0 15px;
    min-width: 250px;
    border-color: #212121;
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
}

const MarketPage = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]); // 아이템 리스트 상태 관리
  const [selectedItem, setSelectedItem] = useState<number | null>(null); // 선택된 아이템 상태 관리

  const isMarket = useAppSelector(selectModalMarket);
  const isUserSearch = useAppSelector(selectModalUserSearch);
  const dispatch = useAppDispatch();

  const toggleMarket = (itemId?: number): void => {
    if (itemId !== undefined) {
      setSelectedItem(itemId); // 선택된 아이템 설정
    }
    dispatch(modalActions.toggleMarket());
  };
  const toggleUserSearch = (): void => {
    dispatch(modalActions.toggleUserSearch());
  };
  useModalExitHook();

  const getItemList = async () => {
    await SnsItemList(
      0,
      (resp) => {
        setItems(resp.data); // 서버에서 받은 데이터를 상태로 설정
        console.log(resp.data);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // 마운트 됐을 때 수행
  useEffect(() => {
    getItemList();
  }, []);
  return (
    <>
      <s.Container>
        <SnsHeader />
        <SnsNavigation />
        <LocationDropdown />
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <MarketItem
              itemId={item.id}
              itemImage={item.images}
              itemName={item.title}
              itemPrice={item.price}
              isOnSale={!item.isSold}
              itemLike={item.likeCount}
              isLike={item.isLike}
              onClick={() => toggleMarket(item.id)} // 클릭 시 해당 아이템을 모달에 설정
            />
            <s.Horizon />
          </React.Fragment>
        ))}
        <s.Horizon />
        <ItemModal open={isMarket} onModal={toggleMarket} itemId={selectedItem} />
        <UserSearchModal open={isUserSearch} onModal={toggleUserSearch} />
      </s.Container>
      <BottomNav />
    </>
  );
};

export default MarketPage;
