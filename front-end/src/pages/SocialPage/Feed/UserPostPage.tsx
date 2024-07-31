import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Text from '../../../components/Common/Text';
import { ReactComponent as Logo } from '../../../asset/img/svg/0CHA.svg';
import test from "../../../asset/img/testImg.png";
import Image from '../../../components/Common/Image';
import Feed from '../../../components/SNS/Feed';
import Header from '../../../components/Common/Header';
import SnsNavigation from '../../../components/SNS/SnsNavigation';
import BottomNav from '../../../components/Common/BottomNav';
import UserProfileInfo from '../../../components/SNS/UserProfileInfo';

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
  TabBarContent: styled.span`
    
  `,
  ActiveText: styled.div`
    width: 50%;
    color: ${(props) => props.theme.mainColor};
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid ${(props) => props.theme.mainColor};
    text-align: center;
    padding: 10px;
  `,
  InactiveText: styled.div`
    width: 50%;
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    padding: 10px;
  `,
  testArea: styled.div`
    width: 100%;
    margin-top: 3px;
  `,
  ThumbnailArea: styled.div`

    margin: auto;
    display: inline-flex;
    flex-wrap: wrap;
  `,
  Thumbnail: styled.div`
    width: 33%;
    padding: 1px;
  `,
};


const UserPostPage = (): JSX.Element => {
  const [ isFitness, setIsFitness ] = useState(true);
  const switchTabbar = () => {
    setIsFitness(!isFitness)
  }

  return (
    <>
      <Header
        text="피드"/>
      <s.Container>
        <UserProfileInfo
          isCurrentUser={false}
          userName={"stranger_00"}
          postCnt={"9"}
          followerCnt={"12"}
          followingCnt={"23"}
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
            <s.Thumbnail>
              <Image
                width="100%"
                height="auto"
                src={test}
                type="rect"
              />
            </s.Thumbnail>
            <s.Thumbnail>
              <Image
                width="100%"
                height="auto"
                src={test}
                type="rect"
              />
            </s.Thumbnail>
            <s.Thumbnail>
              <Image
                width="100%"
                height="auto"
                src={test}
                type="rect"
              />
            </s.Thumbnail>
            <s.Thumbnail>
              <Image
                width="100%"
                height="auto"
                src={test}
                type="rect"
              />
            </s.Thumbnail>
            <s.Thumbnail>
              <Image
                width="100%"
                height="auto"
                src={test}
                type="rect"
              />
            </s.Thumbnail>
          </s.ThumbnailArea>
        </s.testArea>
      </s.Container>
      <BottomNav/>
    </>
  );
};

export default UserPostPage;
