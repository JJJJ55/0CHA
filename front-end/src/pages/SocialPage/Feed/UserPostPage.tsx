import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Text from '../../../components/Common/Text';
import { ReactComponent as Logo } from '../../../asset/img/svg/0CHA.svg';
import test from '../../../asset/img/testImg.png';
import Image from '../../../components/Common/Image';
import Feed from '../../../components/SNS/Feed';
import Header from '../../../components/Common/Header';
import SnsNavigation from '../../../components/SNS/SnsNavigation';
import BottomNav from '../../../components/Common/BottomNav';
import UserProfileInfo from '../../../components/SNS/UserProfileInfo';
import { useParams } from 'react-router';

import { UserPage } from '../../../lib/api/sns-api';
import { UserPageFeed } from '../../../lib/api/sns-api';
import { UserPageItem } from '../../../lib/api/sns-api';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding-top: 57px;
    padding-bottom: 68px;
  `,
  TabBar: styled.div`
    display: flex;
    justify-content: space-around;
  `,
  TabBarContent: styled.span``,
  ActiveText: styled.div`
    width: 50%;
    color: ${(props) => props.theme.mainColor};
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid ${(props) => props.theme.mainColor};
    text-align: center;
    padding: 10px;
    cursor: pointer;
  `,
  InactiveText: styled.div`
    width: 50%;
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    padding: 10px;
    cursor: pointer;
  `,
  testArea: styled.div`
    width: 100%;
    margin-top: 3px;
  `,
  ThumbnailArea: styled.div`
    width: 100%;
    margin: auto;
    display: inline-flex;
    flex-wrap: wrap;
    
  `,
  Thumbnail: styled.div`
    width: 33%;
    aspect-ratio: 1;
    padding: 1px;
    border: 1px #212121 solid;
  `,
};

type userPageData = {
  id: number;
  nickname: string;
  profileImage: string;
  feedCount: number;
  itemCount: number;
  followedIdCount: number;
  followerIdCount: number;
};

type userPageFeedData = {
  id: number;
  image: string;
};

type userPageMarketData = {
  id: number;
  image: string;
};

const UserPostPage = (): JSX.Element => {
  const [isFitness, setIsFitness] = useState(true);
  const switchTabbar = () => {
    setIsFitness(!isFitness);
  };

  const [userId, setUserId] = useState(0)
  const [userNickname, setUserNickname] = useState('')
  const [userProfileImage, setUserProfileImage] = useState('')

  const userStr = localStorage.getItem("user")

  useEffect(() => {
    if (userStr) {
      const userTmp = JSON.parse(userStr)
      setUserId(userTmp.id)
      setUserNickname(userTmp.nickname)
      setUserProfileImage(userTmp.profileImage)
    }
  }, [])
  
  const [userData, setUserData] = useState<userPageData>();
  const [feedData, setFeedData] = useState<userPageFeedData[]>([]);
  const [marketData, setMarketData] = useState<userPageMarketData[]>([]);
  const params = useParams()
  const feedUserId = params.id

  useEffect(() => {
    console.log(feedUserId)
  }, [feedUserId])

  const getUserPage = async() => {
    if (feedUserId){
      await UserPage(
        parseInt(feedUserId),
        (resp) => {
          setUserData(resp.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  const getUserPageFeed = async() => {
    if (feedUserId) {
      await UserPageFeed(
        parseInt(feedUserId),
        (resp) => {
          if (resp.data === '피드 0개입니다') {
            setFeedData([])
          } else {
            setFeedData(resp.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const getUserPageMarket = async () => {
    if (feedUserId) {
      await UserPageItem(
        parseInt(feedUserId),
        (resp) => {
          if (resp.data === '중고거래 0개입니다') {
            setMarketData([]);
          } else {
            setMarketData(resp.data);
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  useEffect(() => {
    getUserPage();
    getUserPageFeed();
    getUserPageMarket();
  }, [])

  return (
    <>
      <Header text="피드" />
      <s.Container>
        <UserProfileInfo
          profileUserId={userData?.id}
          isCurrentUser={userId === userData?.id}
          userName={userData?.nickname}
          postCnt={userData?.feedCount}
          marketCnt={userData?.itemCount}
          followerCnt={userData?.followerIdCount}
          followingCnt={userData?.followedIdCount}
        />
        <s.TabBar>
          {isFitness === true ? (
            <s.ActiveText>운동</s.ActiveText>
          ) : (
            <s.InactiveText onClick={switchTabbar}>운동</s.InactiveText>
          )}
          {isFitness === true ? (
            <s.InactiveText onClick={switchTabbar}>거래</s.InactiveText>
          ) : (
            <s.ActiveText>거래</s.ActiveText>
          )}
        </s.TabBar>
        <s.testArea>
          <s.ThumbnailArea>
            {isFitness === true ? (
              <>
                {feedData.map((thumbnail) => (
                  <s.Thumbnail key={thumbnail.id}>
                    <Image width="100%" height="auto" src={thumbnail.image} type="rect" cursor="pointer" />
                  </s.Thumbnail>
                ))}
              </>
            ) : (
              <>
                {marketData.map((thumbnail) => (
                  <s.Thumbnail key={thumbnail.id}>
                    <Image width="100%" height="auto" src={thumbnail.image} type="rect" cursor="pointer" />
                  </s.Thumbnail>
                ))}
              </>
            )}      
          </s.ThumbnailArea>
        </s.testArea>
      </s.Container>
      <BottomNav />
    </>
  );
};

export default UserPostPage;
