import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import { ReactComponent as likeOn } from '../../asset/img/svg/likeOn.svg';
import { ReactComponent as likeOff } from '../../asset/img/svg/likeOff.svg';

const s = {
  Container: styled.section`
    height: 70px;
    min-width: 250px;
    display: flex;
    padding: 0 15px;
    margin: 20px 0;
    cursor: pointer;
  `,
  ItemName: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: 600;
  `,
  ItemPrice: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    align-items: center;
  `,
  Available: styled.div`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    font-weight: 600;
  `,
  Unavailable: styled.div`
    color: #666666;
    font-size: 12px;
    font-weight: 600;
  `,
  ItemLike: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    font-weight: 500;
    margin-left: 10px;
  `,
  ItemInfoArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
  `,
  ItemTopArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  ItemBottomArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  ItemLikeArea: styled.div`
    display: flex;
    align-items: center;
  `,
  Horizon: styled.hr`
    margin: 0 15px;
    min-width: 250px;
    border-color: #212121;
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

interface MarketItemProps {
  data? :marketItem[];
  onClick: MouseEventHandler<HTMLElement>;
}


const MarketItem = (props: MarketItemProps): JSX.Element => {
  const { onClick } = props;

  return (
    <>
    {props.data?.map((data, index) => (
      <>
        <s.Container key={index}>
          <Image width="70px" height="70px" src={data.images[0]} type="rect" />
          <s.ItemInfoArea>
            <s.ItemTopArea onClick={onClick}>
              <s.ItemName>{data.title}</s.ItemName>
              {data.isSold === false ? <s.Available>판매중</s.Available> : <s.Unavailable>판매완료</s.Unavailable>}
            </s.ItemTopArea>
            <s.ItemBottomArea>
              <s.ItemPrice>{data.price.toLocaleString('ko-KR')}원</s.ItemPrice>
              <s.ItemLikeArea onClick={() => alert('클릭')}>
                {data.isLike === 1 ? (
                  <IconSvg width="23" height="23" Ico={likeOn} />
                ) : (
                  <IconSvg width="23" height="23" Ico={likeOff} />
                )}
                <s.ItemLike>{data.likeCount}</s.ItemLike>
              </s.ItemLikeArea>
            </s.ItemBottomArea>
          </s.ItemInfoArea>
        </s.Container>
        <s.Horizon/>
      </>
    ))}
    </>
  );
};

export default MarketItem;
