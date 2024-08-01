import React, { useState } from 'react';
import styled from 'styled-components';

import SnsHeader from '../../../components/SNS/SnsHeader';
import SnsNavigation from '../../../components/SNS/SnsNavigation';
import BottomNav from '../../../components/Common/BottomNav';
import LocationDropdown from '../../../components/SNS/LocationDropdown';
import MarketItem from '../../../components/SNS/MarketItem';
import ItemModal from '../../../components/SNS/ItemModal';

import test from "../../../asset/img/testImg.png";


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
  return (
    <>
    <s.Container>
      <SnsHeader />
      <SnsNavigation />
      <LocationDropdown/>
      <MarketItem
        itemImage={test}
        itemName="덤벨 40kg"
        itemPrice="50,000원"
        isOnSale={true}
        itemLike="25"
        isLiked={true}
      />
      <s.Horizon/>
      <MarketItem
        itemImage={test}
        itemName="테스트 상품명"
        itemPrice="50,000원"
        isOnSale={false}
        itemLike="25"
        isLiked={false}
      />
      <s.Horizon/>
      <MarketItem
        itemImage={test}
        itemName="덤벨 40kg"
        itemPrice="50,000원"
        isOnSale={true}
        itemLike="25"
        isLiked={true}
      />
      <s.Horizon/>
      <ItemModal/>
    </s.Container>
    <BottomNav/>
    </>
  );
};

export default MarketPage;
