import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Feed from '../../../components/SNS/Feed';
import SnsHeader from '../../../components/SNS/SnsHeader';
import SnsNavigation from '../../../components/SNS/SnsNavigation';
import CommentModal from '../../../components/Modal/CommentModal';
import BottomNav from '../../../components/Common/BottomNav';
import UserSearchModal from '../../../components/Modal/UserSearchModal';

import test from '../../../asset/img/testImg.png';
import { useAppDispatch, useAppSelector } from '../../../lib/hook/useReduxHook';
import { modalActions, selectModalComment, selectModalUserSearch } from '../../../store/modal';
import { useNavigate } from 'react-router';
import { useModalExitHook } from '../../../lib/hook/useModalExitHook';

import FeedList from '../../../components/SNS/FeedList';
import axios from 'axios';
import { debounce } from 'lodash';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding-bottom: 68px;
  `,
  Title: styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: end;
    margin-bottom: 30px;
  `,
  LoginArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  InputArea: styled.div`
    width: 80%;
    margin: 0px auto;
  `,
  LoginCheckInput: styled.input`
    accent-color: '#ccff33';
  `,
  LoginLabel: styled.label`
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
  `,
  TextBtnArea: styled.div`
    text-align: center;
    color: ${(props) => props.theme.textColor};
    width: 230px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
  `,
  SnsText: styled.span`
    color: #666666;
    font-size: 14px;
  `,
};

type dataType = {
  id: number;
  content: string;
  image: string;
  like: number;
  comment: number;
  created_at: string;
  author: {
    id: number;
    nickname: string;
    profile_image: string;
  }
}


const FeedPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };

  const dispatch = useAppDispatch();
  const isComment = useAppSelector(selectModalComment);
  const isUserSearch = useAppSelector(selectModalUserSearch);
  const toggleModalComment = (): void => {
    dispatch(modalActions.toggleComment());
  };
  const toggleModalUserSearch = (): void => {
    dispatch(modalActions.toggleUserSearch());
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const [feedData, setFeedData] = useState<dataType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const[isMoreData, setIsMoreData] = useState(true);


  const getFeedData = async (page: number) => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/test?_page=${page}&_limit=10`);
      const data = res.data;

      if (data.length === 0) {
        setIsMoreData(false);
      } else {
        setFeedData((prevData) => [...prevData, ...data]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedData(page);
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
      <s.Container ref={containerRef}>
        <SnsHeader />
        <SnsNavigation />
        <FeedList data={feedData} onClick={toggleModalComment} />
        {/* <Feed
          width="100vw"
          height="100vw"
          src={test}
          authorName="stranger_00"
          authorProfileImage={test}
          like="true"
          likeCnt="100"
          commentCnt="30"
          content="example content test"
          onClick={toggleModalComment}
        /> */}
        <CommentModal open={isComment} onModal={toggleModalComment} />
        <UserSearchModal open={isUserSearch} onModal={toggleModalUserSearch} />
      </s.Container>
      <BottomNav />
    </>
  );
};

export default FeedPage;
