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
import { ScriptTarget } from 'typescript';

import { SnsFeedList } from '../../../lib/api/sns-api';
import { logDOM } from '@testing-library/react';
import { SnsCommentList } from '../../../lib/api/sns-api';

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

type feedData = {
  id: number;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  userId: number;
  nickname: string;
  profileImage: string;
  isLike: number;
}

type commentData = {
  comment: string;
  createdAt: string;
  feedId: number;
  id: number;
  nickname: string;
  profileImage: string;
  userId: number;
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

  const [feedData, setFeedData] = useState<feedData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMoreData, setIsMoreData] = useState(true);
  const [feedId, setFeedId] = useState<number | null>(null);
  const [commentData, setCommentData] = useState<commentData[]>([]);


  // const [userId, setUserId] = useState(null)

  // const userStr = localStorage.getItem("user")

  // useEffect(() => {
  //   if (userStr) {
  //     const userObj = JSON.parse(userStr)
  //     // const userId = userObj.id
  //     setUserId(userObj.id)
  //     console.log(userObj.id)
  //   }
  // }, [])
  // const getFeedData = async (page: number) => {
  //   if (loading) return;
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`http://localhost:4000/feedData?_page=${page}&_limit=10`);
  //     const data = res.data;

  //     if (data.length === 0) {
  //       setIsMoreData(false);
  //     } else {
  //       setFeedData((prevData) => [...prevData, ...data]);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const [offset, setOffset] = useState(0);
  const getFeedData = async (offset: number) => {
    if (loading) return;
    setLoading(true);

    await SnsFeedList(
      10,
      offset,
      (resp) => {
        const data = resp.data;
        // if (data.length === 0) {
        if (data === '피드 0개입니다') {
          setIsMoreData(false);
        } else {
          setFeedData((prevData) => [...prevData, ...data]);
        }
        console.log(data)
        setLoading(false)
      },
      (error) => {
        console.error(error)
      },
    )

  }

  // useEffect(() => {
  //   getFeedData(page);
  // }, [page]);
  useEffect(() => {
    getFeedData(offset);
    console.log('getfeeddata', offset)
  }, [offset]);

  const handleScroll = debounce(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if ((scrollTop + clientHeight+1000) >= scrollHeight) {
        if (!loading && isMoreData) {
          setOffset((prevOffset) => prevOffset + 10);
          // console.log(offset)
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


  const handleCommentClick = async (id: number) => {
    setFeedId(id);
    toggleModalComment();
    await SnsCommentList(
      id,
      (resp) => {
        const data = resp.data;
        // console.log(data)
        if (data === '댓글 0개입니다') {
          setCommentData([]);
        } else {
          setCommentData(data);
        }
      },
      (error) => {
        setCommentData([]);
        console.error(error);
      }
    );
    // try {
    //   const res = await axios.get(`http://localhost:4000/comment${id}`);
    //   const data = res.data;
    //   if (data.length === 0) {
    //     setCommentData([]);
    //   } else {
    //     setCommentData(data);
    //   }

    // } catch (error) {
    //   setCommentData([]);
    //   console.error(error);
    // }
  }

  useModalExitHook();

  return (
    <>
        <SnsHeader />
        <SnsNavigation />
      <s.Container ref={containerRef}>
        {/* <FeedList data={feedData} onClick={toggleModalComment} /> */}
        <FeedList data={feedData} onClick={handleCommentClick} />
        <CommentModal open={isComment} onModal={toggleModalComment} data={commentData} feedId={feedId}/>
        <UserSearchModal open={isUserSearch} onModal={toggleModalUserSearch} />
      </s.Container>
      <BottomNav />
    </>
  );
};

export default FeedPage;
