import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Common/Input';
import FitnessListTopNav from '../../components/Fitness/Etc/FitnessListTopNav';
import FitnessList from '../../components/Fitness/List/FitnessList';
import BottomNav from '../../components/Common/BottomNav';
import { useNavigate } from 'react-router';
import { getFitnessJjimList, getFitnessList } from '../../lib/api/fitness-api';
import { CreateRoutine, FitnessType } from '../../util/types/axios-fitness';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { fitnessActions, selectFitnessType } from '../../store/fitness';
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
  title: styled.div`
    width: 90%;
    height: fit-content;
    margin: 10px auto;
    color: ${(props) => props.theme.textColor2};
    font-size: 14px;
  `,
};

const FitnessListPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectFitnessType);
  const [jjim, setjjim] = useState<FitnessType[]>([]);
  const [fitness, setFitness] = useState<FitnessType[]>([]);
  const [filteredJjim, setFilteredJjim] = useState<FitnessType[]>([]);
  const [filteredFitness, setFilteredFitness] = useState<FitnessType[]>([]);
  const [add, setAdd] = useState<CreateRoutine[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getFitnessList(
      (resp) => {
        const data = Array.isArray(resp.data) ? resp.data : [];
        setFitness(data);
        setFilteredFitness(data);
      },
      (error) => {
        setFitness([]);
        setFilteredFitness([]);
        console.log(error);
      },
    );
    getFitnessJjimList(
      (resp) => {
        const data = Array.isArray(resp.data) ? resp.data : [];
        setjjim(data);
        setFilteredJjim(data);
      },
      (error) => {
        setjjim([]);
        setFilteredJjim([]);
        console.log('없음');
      },
    );
  }, []);

  useEffect(() => {
    // 검색어가 변경될 때마다 데이터를 필터링
    const searchLower = search.toLowerCase();

    const filterBySearch = (items: FitnessType[]) => {
      if (!Array.isArray(items)) {
        console.error('Expected an array but got', items);
        return [];
      }
      return items.filter((item) => item.name.toLowerCase().includes(searchLower));
    };
    const filterByType = (items: FitnessType[]) => {
      if (!Array.isArray(items)) {
        console.error('Expected an array but got', items);
        return [];
      }

      const filteredItems = category === '전체' ? items : items.filter((item) => item.category === category);
      return filterBySearch(filteredItems);
    };

    setFilteredJjim(filterByType(jjim));
    setFilteredFitness(filterByType(fitness));
  }, [search, jjim, fitness, category]);

  const handleClickAdd = (exerciseId: number, exerciseName: string) => {
    setAdd((prevAdd) => {
      const existingItem = prevAdd.find((item) => item.exerciseId === exerciseId);
      if (existingItem) {
        const list = prevAdd.filter((item) => item.exerciseId !== exerciseId);
        dispatch(fitnessActions.setAddList(list));
        return list;
      } else {
        const list = [...prevAdd, { exerciseId, exerciseName }];
        dispatch(fitnessActions.setAddList(list));
        return list;
      }
    });
  };

  const handleClickMove = (): void => {
    if (add.length !== 0) {
      navigate('../plan', { state: { add } });
    } else {
      alert('루틴에 운동을 추가해주세요.');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <s.Container>
      <s.HeaderArea>
        <s.InputArea>
          <Input
            width="100%"
            height="40px"
            placeholder="검색"
            type="text"
            name="search"
            value={search}
            onChange={handleSearch}
          />
        </s.InputArea>
        <FitnessListTopNav />
      </s.HeaderArea>
      <s.MainArea>
        <s.FitnessArea>
          <s.title>즐겨찾기</s.title>
          {filteredJjim.length === 0 ? (
            <Text
              children="데이터가 존재하지 않습니다."
              width="90%"
              bold="700"
              color="textColor"
              size="16px"
              display="block"
              margin="20px auto"
            />
          ) : (
            <FitnessList data={filteredJjim} add={add} onAdd={handleClickAdd} />
          )}
          <s.title>운동 목록</s.title>
          {filteredFitness.length === 0 ? (
            <Text
              children="데이터가 존재하지 않습니다."
              width="90%"
              bold="700"
              color="textColor"
              size="16px"
              display="block"
              margin="20px auto"
            />
          ) : (
            <FitnessList data={filteredFitness} add={add} onAdd={handleClickAdd} />
          )}
        </s.FitnessArea>
      </s.MainArea>
      <s.Btn onClick={handleClickMove}>새 루틴에 추가하기</s.Btn>
      <BottomNav />
    </s.Container>
  );
};

export default FitnessListPage;
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import Input from '../../components/Common/Input';
// import FitnessListTopNav from '../../components/Fitness/Etc/FitnessListTopNav';
// import FitnessList from '../../components/Fitness/List/FitnessList';
// import BottomNav from '../../components/Common/BottomNav';
// import { useNavigate } from 'react-router';
// import { useQuery } from '@tanstack/react-query';
// import { CreateRoutine, FitnessType } from '../../util/types/axios-fitness';
// import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
// import { fitnessActions, selectFitnessType } from '../../store/fitness';
// import Text from '../../components/Common/Text';
// import { fetchFitnessJjimList, fetchFitnessList } from '../../lib/api/fitnessList-qurey';

// const s = {
//   Container: styled.section`
//     height: 100%;
//     background-color: ${(props) => props.theme.bgColor};
//     overflow: auto;
//   `,
//   HeaderArea: styled.div`
//     width: 100%;
//     max-width: 800px;
//     position: fixed;
//     background-color: ${(props) => props.theme.bgColor};
//   `,
//   MainArea: styled.div`
//     height: 100%;
//     padding: 120px 0 140px;
//     overflow: auto;
//   `,
//   InputArea: styled.div`
//     width: 80%;
//     margin: 10px auto;
//   `,
//   FitnessArea: styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     flex-grow: 1;
//   `,
//   Btn: styled.button`
//     width: 169px;
//     height: 40px;
//     font-size: 14px;
//     font-weight: 500;
//     margin: 10px auto;
//     display: block;
//     position: fixed;
//     background-color: ${(props) => props.theme.mainColor};
//     border-radius: 10px;
//     bottom: 70px;
//     left: 0;
//     right: 0;
//   `,
//   title: styled.div`
//     width: 90%;
//     height: fit-content;
//     margin: 10px auto;
//     color: ${(props) => props.theme.textColor2};
//     font-size: 14px;
//   `,
// };

// const FitnessListPage = (): JSX.Element => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const category = useAppSelector(selectFitnessType);
//   const [add, setAdd] = useState<CreateRoutine[]>([]);
//   const [search, setSearch] = useState<string>('');

//   // useQuery로 데이터 가져오기
//   const { data: fitness = [], isLoading: isLoadingFitness } = useQuery<FitnessType[]>({
//     queryKey: ['fitnessList'],
//     queryFn: fetchFitnessList,
//   });

//   const { data: jjim = [], isLoading: isLoadingJjim } = useQuery<FitnessType[]>({
//     queryKey: ['fitnessJjimList'],
//     queryFn: fetchFitnessJjimList,
//   });

//   // 데이터 필터링
//   const filteredJjim = Array.isArray(jjim)
//     ? jjim.filter(
//         (item: FitnessType) =>
//           item.name.toLowerCase().includes(search.toLowerCase()) && (category === '전체' || item.category === category),
//       )
//     : [];

//   const filteredFitness = Array.isArray(fitness)
//     ? fitness.filter(
//         (item: FitnessType) =>
//           item.name.toLowerCase().includes(search.toLowerCase()) && (category === '전체' || item.category === category),
//       )
//     : [];

//   const handleClickAdd = (exerciseId: number, exerciseName: string) => {
//     setAdd((prevAdd) => {
//       const existingItem = prevAdd.find((item) => item.exerciseId === exerciseId);
//       if (existingItem) {
//         const list = prevAdd.filter((item) => item.exerciseId !== exerciseId);
//         dispatch(fitnessActions.setAddList(list));
//         return list;
//       } else {
//         const list = [...prevAdd, { exerciseId, exerciseName }];
//         dispatch(fitnessActions.setAddList(list));
//         return list;
//       }
//     });
//   };

//   const handleClickMove = (): void => {
//     if (add.length !== 0) {
//       navigate('../plan', { state: { add } });
//     } else {
//       alert('루틴에 운동을 추가해주세요.');
//     }
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   if (isLoadingFitness || isLoadingJjim) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <s.Container>
//       <s.HeaderArea>
//         <s.InputArea>
//           <Input
//             width="100%"
//             height="40px"
//             placeholder="검색"
//             type="text"
//             name="search"
//             value={search}
//             onChange={handleSearch}
//           />
//         </s.InputArea>
//         <FitnessListTopNav />
//       </s.HeaderArea>
//       <s.MainArea>
//         <s.FitnessArea>
//           <s.title>즐겨찾기</s.title>
//           {filteredJjim.length === 0 ? (
//             <Text
//               children="데이터가 존재하지 않습니다."
//               width="90%"
//               bold="700"
//               color="textColor"
//               size="16px"
//               display="block"
//               margin="20px auto"
//             />
//           ) : (
//             <FitnessList data={filteredJjim} add={add} onAdd={handleClickAdd} />
//           )}
//           <s.title>운동 목록</s.title>
//           {filteredFitness.length === 0 ? (
//             <Text
//               children="데이터가 존재하지 않습니다."
//               width="90%"
//               bold="700"
//               color="textColor"
//               size="16px"
//               display="block"
//               margin="20px auto"
//             />
//           ) : (
//             <FitnessList data={filteredFitness} add={add} onAdd={handleClickAdd} />
//           )}
//         </s.FitnessArea>
//       </s.MainArea>
//       <s.Btn onClick={handleClickMove}>새 루틴에 추가하기</s.Btn>
//       <BottomNav />
//     </s.Container>
//   );
// };

// export default FitnessListPage;
