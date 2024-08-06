import React, { useEffect, useRef, useState } from 'react';
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
import axios from 'axios';
import { debounce } from 'lodash';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding-bottom: 68px;
  `,
};

type marketItem = {
  id: number;
  title: string;
  price: number;
  isSold: boolean;
  createdAt: string;
  userId: number;
  nickname: string;
  profileImage: string;
  likeCount: number;
  isLike: number;
  images: Array<string>;
}


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

  
  const containerRef = useRef<HTMLDivElement>(null);

  const [marketItem, setMarketItem] = useState<marketItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMoreData, setIsMoreData] = useState(true);

  const getMarketItem = async (page: number) => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/marketItem?_${page}&_limit=10`);
      const data = res.data;
      
      if (data.length === 0) {
        setIsMoreData(false);
      } else {
        setMarketItem((prevData) => [...prevData, ...data]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMarketItem(page);
  }, [page]);

  const handleScroll = debounce(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if ((scrollTop + clientHeight+1000) >= scrollHeight) {
        if (!loading && isMoreData) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }   
  }, 300);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  useModalExitHook();

  return (
    <>
    <SnsHeader />
    <SnsNavigation />
    <s.Container ref={containerRef}>
      <LocationDropdown />
      <MarketItem
        data={marketItem}
        onClick={toggleMarket}
      />
      <ItemModal open={isMarket} onModal={toggleMarket} />
      <UserSearchModal open={isUserSearch} onModal={toggleUserSearch} />
    </s.Container>
    <BottomNav />
    </>
  );
};

export default MarketPage;
