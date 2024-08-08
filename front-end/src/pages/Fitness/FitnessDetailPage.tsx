import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import IconSvg from '../../components/Common/IconSvg';
import { ReactComponent as jjimOn } from '../../asset/img/svg/jjimOn.svg';
import { ReactComponent as jjimOff } from '../../asset/img/svg/jjimOff.svg';
import test from '../../asset/img/testImg.png';
import Image from '../../components/Common/Image';
import BottomNav from '../../components/Common/BottomNav';
import Chart from '../../components/Common/Chart';
import { exerciseData } from '../../util/TestData';
import {
  deleteFitnessJjimCancel,
  getFitnessJjimCheck,
  getFitnessListCategory,
  postFitnessJjim,
} from '../../lib/api/fitness-api';
import { useLocation } from 'react-router';
import { FitnessType } from '../../util/types/axios-fitness';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  IconArea: styled.div`
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  ContentArea: styled.div`
    width: 100%;
    height: 100%;
    padding: 57px 0 90px;
    overflow: auto;
  `,
  FitnessTextArea: styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    line-height: 25px;
    padding: 20px;
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
  `,
  Title: styled.div`
    width: 90%;
    margin: 10px auto;
    text-align: left;
    font-size: 14px;
    color: ${(props) => props.theme.textColor2};
  `,
};

const FitnessDetailPage = (): JSX.Element => {
  const labels = ['07.14', '07.15', '07.16', '07.17', '07.18', '07.19', '07,20'];
  const [fitness, setFieness] = useState<FitnessType>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const id = useLocation().state?.id;

  useEffect(() => {
    getFitnessListCategory(
      id,
      (resp) => {
        setFieness(resp.data);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
    getFitnessJjimCheck(
      id,
      (resp) => {
        resp.data.favorite ? setIsLike(true) : setIsLike(false);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
  }, []);
  const handleClickJjim = async () => {
    await postFitnessJjim(
      id,
      (resp) => {
        setIsLike(true);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
  };
  const handleClickNotJjim = async () => {
    await deleteFitnessJjimCancel(
      id,
      (resp) => {
        setIsLike(false);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
  };
  return (
    <s.Container>
      <Header text={fitness?.name}>
        {isLike ? (
          <s.IconArea onClick={handleClickNotJjim}>
            <IconSvg width="24" height="24" Ico={jjimOn} />
          </s.IconArea>
        ) : (
          <s.IconArea onClick={handleClickJjim}>
            <IconSvg width="24" height="24" Ico={jjimOff} />
          </s.IconArea>
        )}
      </Header>
      <s.ContentArea>
        <Image width="100%" src={fitness?.image} height="50%" type="rect" />
        <s.FitnessTextArea>{fitness?.description}</s.FitnessTextArea>
        <s.Title>운동이력</s.Title>
        <Chart datas={exerciseData} labels={labels} />
      </s.ContentArea>
      <BottomNav />
    </s.Container>
  );
};

export default FitnessDetailPage;
