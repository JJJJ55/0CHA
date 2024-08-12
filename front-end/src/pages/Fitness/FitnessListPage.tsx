// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Input from '../../components/Common/Input';
// import FitnessListTopNav from '../../components/Fitness/Etc/FitnessListTopNav';
// import FitnessList from '../../components/Fitness/List/FitnessList';
// import BottomNav from '../../components/Common/BottomNav';
// import { useNavigate } from 'react-router';
// import { getFitnessJjimList, getFitnessList } from '../../lib/api/fitness-api';
// import { CreateRoutine, FitnessType } from '../../util/types/axios-fitness';
// import { useAppDispatch } from '../../lib/hook/useReduxHook';
// import { fitnessActions } from '../../store/fitness';

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
//     border: 1px solid red;
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
// };

// const FitnessListPage = (): JSX.Element => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [jjim, setjjim] = useState<FitnessType[]>([]);
//   const [fitness, setFitness] = useState<FitnessType[]>([]);
//   useEffect(() => {
//     getFitnessList(
//       (resp) => {
//         setFitness(resp.data);
//       },
//       (error) => {
//         setFitness([]);
//         console.log(error);
//       },
//     );
//     getFitnessJjimList(
//       (resp) => {
//         setjjim(resp.data);
//       },
//       (error) => {
//         // console.log(error);
//         console.log('없음');
//         setjjim([]);
//       },
//     );
//   }, []);
//   // 상태가 업데이트된 후에 실행되는 useEffect
//   useEffect(() => {
//     console.log('Fitness 데이터:', fitness);
//   }, [fitness]);

//   const [add, setAdd] = useState<CreateRoutine[]>([]);
//   const [search, setSearch] = useState<string>('');
//   const handleClickAdd = (exerciseId: number, exerciseName: string) => {
//     setAdd((prevAdd) => {
//       const existingItem = prevAdd.find((item) => item.exerciseId === exerciseId);
//       if (existingItem) {
//         // Remove item if it already exists
//         const list = prevAdd.filter((item) => item.exerciseId !== exerciseId);
//         dispatch(fitnessActions.setAddList(list));
//         return list;
//       } else {
//         // Add new item
//         const list = [...prevAdd, { exerciseId, exerciseName }];
//         dispatch(fitnessActions.setAddList(list));
//         return list;
//       }
//     });
//   };
//   const handleClickMove = (): void => {
//     if (add.length !== 0) {
//       navigate('../testplan', { state: { add } });
//     } else {
//       alert('루틴에 운동을 추가해주세요.');
//     }
//     // console.log(add);
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//     console.log(e.target.value);
//   };

//   // alert(jjim);
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
//           <FitnessList text="즐겨찾기" data={jjim} add={add} onAdd={handleClickAdd} />
//           <FitnessList text="전체" data={fitness} add={add} onAdd={handleClickAdd} />
//         </s.FitnessArea>
//       </s.MainArea>
//       <s.Btn onClick={handleClickMove}>새 루틴에 추가하기</s.Btn>
//       <BottomNav />
//     </s.Container>
//   );
// };

// export default FitnessListPage;
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
        setFitness(resp.data);
        setFilteredFitness(resp.data); // 초기에는 모든 데이터를 보여줌
      },
      (error) => {
        setFitness([]);
        setFilteredFitness([]);
        console.log(error);
      },
    );
    getFitnessJjimList(
      (resp) => {
        setjjim(resp.data);
        setFilteredJjim(resp.data); // 초기에는 모든 데이터를 보여줌
      },
      (error) => {
        setjjim([]);
        setFilteredJjim([]);
        console.log('없음');
      },
    );
  }, []);

  // useEffect(() => {
  //   // 검색어가 변경될 때마다 데이터를 필터링
  //   const searchLower = search.toLowerCase();
  //   setFilteredJjim(jjim.filter((item) => item.name.toLowerCase().includes(searchLower)));
  //   setFilteredFitness(fitness.filter((item) => item.name.toLowerCase().includes(searchLower)));
  // }, [search, jjim, fitness]);
  useEffect(() => {
    // 검색어가 변경될 때마다 데이터를 필터링
    const searchLower = search.toLowerCase();
    const filterBySearch = (items: FitnessType[]) =>
      items.filter((item) => item.name.toLowerCase().includes(searchLower));

    const filterByType = (items: FitnessType[]) => {
      if (category === 'all') {
        return filterBySearch(items);
      }
      return filterBySearch(items.filter((item) => item.category === category));
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
      navigate('../testplan', { state: { add } });
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
          <FitnessList text="즐겨찾기" data={filteredJjim} add={add} onAdd={handleClickAdd} />
          <FitnessList text="전체" data={filteredFitness} add={add} onAdd={handleClickAdd} />
        </s.FitnessArea>
      </s.MainArea>
      <s.Btn onClick={handleClickMove}>새 루틴에 추가하기</s.Btn>
      <BottomNav />
    </s.Container>
  );
};

export default FitnessListPage;
