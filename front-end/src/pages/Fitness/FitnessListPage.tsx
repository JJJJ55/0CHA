import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Common/Input';
import FitnessListTopNav from '../../components/Fitness/Etc/FitnessListTopNav';
import FitnessList from '../../components/Fitness/List/FitnessList';
import { FitnessData } from '../../util/TestData';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import { Outlet, useNavigate } from 'react-router';
import { getFitnessJjimList, getFitnessList } from '../../lib/api/fitness-api';
import { CreateRoutine, FitnessType } from '../../util/types/axios-fitness';
import Text from '../../components/Common/Text';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  HeaderArea: styled.div`
    width: 100%;
    max-width: 800px;
    position: fixed;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    height: 100%;
    padding: 120px 0 140px;
    border: 1px solid red;
    overflow: auto;
  `,
  InputArea: styled.div`
    width: 80%;
    margin: 10px auto;
  `,
  FitnessArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  Btn: styled.button`
    width: 169px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    margin: 10px auto;
    display: block;
    position: fixed;
    background-color: ${(props) => props.theme.mainColor};
    border-radius: 10px;
    bottom: 70px;
    left: 0;
    right: 0;
  `,
};

const FitnessListPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [jjim, setjjim] = useState<FitnessType[]>([]);
  const [fitness, setFitness] = useState<FitnessType[]>([]);
  useEffect(() => {
    getFitnessList(
      (resp) => {
        setFitness(resp.data);
      },
      (error) => {
        console.log(error);
      },
    );
    getFitnessJjimList(
      (resp) => {
        setjjim(resp.data);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);
  // 상태가 업데이트된 후에 실행되는 useEffect
  useEffect(() => {
    console.log('Fitness 데이터:', fitness);
  }, [fitness]);

  const [add, setAdd] = useState<CreateRoutine[]>([]);
  const handleClickAdd = (id: number, name: string) => {
    setAdd((prevAdd) => {
      const existingItem = prevAdd.find((item) => item.id === id);
      if (existingItem) {
        // Remove item if it already exists
        return prevAdd.filter((item) => item.id !== id);
      } else {
        // Add new item
        return [...prevAdd, { id, name }];
      }
    });
  };
  const handleClickMove = (): void => {
    navigate('../plan', { state: { add } });
    // console.log(add);
  };

  return (
    <s.Container>
      <s.HeaderArea>
        <s.InputArea>
          <Input width="100%" height="40px" placeholder="검색" type="text" name="" value={''} onChange={() => {}} />
        </s.InputArea>
        <FitnessListTopNav />
      </s.HeaderArea>
      <s.MainArea>
        <s.FitnessArea>
          <FitnessList text="즐겨찾기" data={jjim} add={add} onAdd={handleClickAdd} />
          <FitnessList text="전체" data={fitness} add={add} onAdd={handleClickAdd} />
        </s.FitnessArea>
      </s.MainArea>
      <s.Btn onClick={handleClickMove}>새 루틴에 추가하기</s.Btn>
      <BottomNav />
    </s.Container>
  );
};

export default FitnessListPage;
