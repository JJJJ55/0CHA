import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Common/Button';

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
  PaginationButtons: styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
  `,
  PageButton: styled(Button)`
    width: 100px;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    margin: 0 5px;
    border-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.mainColor};
      color: ${(props) => props.theme.btnTextColor};
    }
  `,
};

interface Item {
  id: number;
  images: string[];
  title: string;
  price: string;
  isSold: boolean;
  likeCount: number;
  isLike: number;
}

const MarketPage = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]); // 아이템 리스트 상태 관리
  const [selectedItem, setSelectedItem] = useState<number | null>(null); // 선택된 아이템 상태 관리

  const [page, setPage] = useState<number>(1); // 현재 페이지 번호
  const [limit] = useState<number>(10); // 페이지당 아이템 수
  const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수

  const isMarket = useAppSelector(selectModalMarket);
  const isUserSearch = useAppSelector(selectModalUserSearch);
  const dispatch = useAppDispatch();

  // 광역, 기초자치 상태관리
  const [location1, setLocation1] = useState<string>(''); // 광역자치 상태 관리
  const [location2, setLocation2] = useState<string>(''); // 기초자치 상태 관리

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
    console.log('광역 자치단체:', location1);
    console.log('기초 자치단체:', location2);
    const param = {
      userId: 0,
      page: page,
      limit: limit,
      district: location1,
      siGunGu: location2,
      title: '',
    };
    await SnsItemList(
      param,
      (resp) => {
        // 중고장터 0개입니다 뜨면
        setItems(resp.data.items); // 서버에서 받은 데이터를 상태로 설정
        setTotalPages(Math.ceil(resp.data.size / limit)); // 전체 페이지 수 설정
        console.log(resp.data);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // 아이템 리스트의 특정 아이템 업데이트 함수
  const handleItemUpdated = (updatedItem: Item) => {
    console.log(`업데이트!`);
    console.log(updatedItem);
    setItems((prevItems) => prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  // location1, location2 상태가 변경될 때마다 getItemList 호출
  useEffect(() => {
    setPage(1);
    getItemList();
  }, [location1, location2]);

  useEffect(() => {
    getItemList(); // 페이지나 limit이 변경될 때마다 아이템 리스트를 다시 조회
  }, [page, limit]);

  const handleItemDeleted = () => {
    getItemList(); // 아이템 삭제 후 목록을 다시 조회
    toggleMarket(); // 모달 닫기
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <>
      <s.Container>
        <SnsHeader />
        <SnsNavigation />
        <LocationDropdown
          location1={location1}
          setLocation1={setLocation1}
          location2={location2}
          setLocation2={setLocation2}
        />
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <MarketItem
              itemId={item.id}
              itemImage={item.images[0]}
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
        <s.PaginationButtons>
          <s.PageButton type="main" onClick={handlePreviousPage}>
            이전
          </s.PageButton>
          <s.PageButton type="main" onClick={handleNextPage}>
            다음
          </s.PageButton>
        </s.PaginationButtons>
        <s.Horizon />
        <ItemModal
          open={isMarket}
          onModal={toggleMarket}
          itemId={selectedItem}
          onDelete={handleItemDeleted} // 삭제 후 호출될 콜백 함수 전달
          onItemUpdate={handleItemUpdated} // 아이템 업데이트 후 호출될 콜백 함수 전달
        />
        <UserSearchModal open={isUserSearch} onModal={toggleUserSearch} />
      </s.Container>
      <BottomNav />
    </>
  );
};

export default MarketPage;
