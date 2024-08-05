import React, { useState } from 'react';
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

const MarketPage = (): JSX.Element => {
  const isMarket = useAppSelector(selectModalMarket);
  const isUserSearch = useAppSelector(selectModalUserSearch);
  const dispatch = useAppDispatch();

  const toggleMarket = (): void => {
    dispatch(modalActions.toggleMarket());
  };
  const toggleUserSearch = (): void => {
    dispatch(modalActions.toggleUserSearch());
  };
  useModalExitHook();
  return (
    <>
      <s.Container>
        <SnsHeader />
        <SnsNavigation />
        <LocationDropdown />
        <MarketItem
          itemImage={test}
          itemName="덤벨 40kg"
          itemPrice="50,000원"
          isOnSale={true}
          itemLike="25"
          isLiked={true}
          onClick={toggleMarket}
        />
        <s.Horizon />
        <MarketItem
          itemImage={test}
          itemName="테스트 상품명"
          itemPrice="50,000원"
          isOnSale={false}
          itemLike="25"
          isLiked={false}
          onClick={toggleMarket}
        />
        <s.Horizon />
        <MarketItem
          itemImage={test}
          itemName="덤벨 40kg"
          itemPrice="50,000원"
          isOnSale={true}
          itemLike="25"
          isLiked={true}
          onClick={toggleMarket}
        />
        <s.Horizon />
        <ItemModal open={isMarket} onModal={toggleMarket} />
        <UserSearchModal open={isUserSearch} onModal={toggleUserSearch} />
      </s.Container>
      <BottomNav />
    </>
  );
};

export default MarketPage;
