import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import testImage from '../../asset/img/testImg.png';
import IconSvg from '../../components/Common/IconSvg';
import { ReactComponent as alarm } from '../../asset/img/svg/alram.svg';
import BottomNav from '../../components/Common/BottomNav';
import Button from '../../components/Common/Button';

const s = {
  Header: styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  `,
  Title: styled.h1`
    font-size: 20px;
    margin: 0;
  `,
  HeaderIcons: styled.div`
    display: flex;
    align-items: center;
  `,
  ScrollContainer: styled.section`
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    color: ${(props) => props.theme.textColor};
    width: 100%;
  `,
  ScrollArea: styled.div`
    display: flex;
    overflow-x: auto;
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
  `,
  Item: styled.div`
    position: relative;
    min-width: 150px;
    height: 150px;
    background-color: ${(props) => props.theme.subColor};
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${(props) => props.theme.mainColor};
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    overflow: hidden;
  `,
  ItemImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  `,
  ItemText: styled.div`
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border-radius: 5px;
  `,
  RoutineList: styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 60px;
  `,
  RoutineItem: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid ${(props) => props.theme.textColor2};
  `,
  RoutineBtn: styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.mainColor};
    border: 1px solid ${(props) => props.theme.mainColor};
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  `,
  RoutineInfo: styled.div`
    display: flex;
    flex-direction: column;
  `,
  RoutineName: styled.div`
    font-size: 16px;
    font-weight: bold;
  `,
  RoutineDate: styled.div`
    font-size: 12px;
    color: ${(props) => props.theme.textColor2};
    margin-top: 10px;
  `,
  MoreBtn: styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.textColor2};
    font-size: 14px;
    cursor: pointer;
  `,
  Icon: styled.img`
    width: 24px;
    height: 24px;
  `,
  ProfileImage: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `,
  Container: styled.div`
    padding: 10px 20px 20px;
    background-color: ${(props) => props.theme.bgColor};
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  SectionTitleContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  SectionTitle: styled.h4`
    font-size: 18px;
    margin: 0;
  `,
  PageBody: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
  BtnArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  `,
  LiveBtn: styled(Button)`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
  `,
};

interface HorizontalScrollProps {
  items: { name: string; image: string }[];
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ items }) => {
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollWrapper = scrollWrapperRef.current;
    if (scrollWrapper) {
      const handleWheel = (event: WheelEvent) => {
        if (event.deltaY !== 0) {
          event.preventDefault();
          scrollWrapper.scrollLeft += event.deltaY;
        }
      };
      scrollWrapper.addEventListener('wheel', handleWheel);
      return () => {
        scrollWrapper.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <s.ScrollContainer>
      <s.SectionTitle children="추천 루틴" />
      <s.ScrollArea ref={scrollWrapperRef}>
        {items.map((item, index) => (
          <s.Item key={index}>
            <s.ItemImage src={item.image} alt={item.name} />
            <s.ItemText>{item.name}</s.ItemText>
          </s.Item>
        ))}
      </s.ScrollArea>
    </s.ScrollContainer>
  );
};

const MainPage = (): JSX.Element => {
  const items = [
    { name: '월요일 추천 루틴', image: testImage },
    { name: '헬스장 꿀팁 300선', image: testImage },
    { name: '홈트레이닝 맛있게', image: testImage },
    { name: '치킨을 먹기 위해', image: testImage },
    { name: '걸어서 집 가기 싫은 날', image: testImage },
    { name: '인간의 진화 이전 모습을 보고 싶다면', image: testImage },
  ];

  const routineItems = [
    { date: '07월 14일', name: '07월 14일 루틴' },
    { date: '07월 13일', name: '토요일 루틴' },
    { date: '07월 12일', name: '금요일 루틴' },
    { date: '07월 11일', name: '금요일 루틴' },
    { date: '07월 10일', name: '금요일 루틴' },
    { date: '07월 09일', name: '금요일 루틴' },
  ];

  const PageHeader = () => (
    <s.Header>
      <s.Title children="홈" />
      <s.HeaderIcons>
        <IconSvg width="25" height="25" color="#ffffff" Ico={alarm} />
        <s.ProfileImage src={testImage} alt="Profile" />
      </s.HeaderIcons>
    </s.Header>
  );

  const handleLiveExercise = () => {
    alert('진행중인 운동 페이지로 이동합니다.');
  };

  const handleMoreClick = () => {
    alert('목록 페이지로 이동합니다');
    // 여기서 목록 페이지로 이동하는 로직을 추가할 수 있습니다.
  };

  return (
    <s.Container>
      <PageHeader />
      <s.PageBody>
        <HorizontalScroll items={items} />
        <s.BtnArea>
          <s.LiveBtn children="진행 중인 운동" onClick={handleLiveExercise} />
        </s.BtnArea>
        <s.ScrollContainer>
          <s.SectionTitleContainer>
            <s.SectionTitle children="내 루틴" />
            <s.MoreBtn onClick={handleMoreClick} children="더보기" />
          </s.SectionTitleContainer>
          <s.RoutineList>
            {routineItems.map((routine, index) => (
              <s.RoutineItem key={index}>
                <s.RoutineInfo>
                  <s.RoutineName children={routine.name} />
                  <s.RoutineDate children={routine.date} />
                </s.RoutineInfo>
                <s.RoutineBtn children="상세보기" />
              </s.RoutineItem>
            ))}
          </s.RoutineList>
        </s.ScrollContainer>
      </s.PageBody>
      <BottomNav />
    </s.Container>
  );
};

export default MainPage;
