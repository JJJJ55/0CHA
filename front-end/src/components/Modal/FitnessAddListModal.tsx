// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Input from '../../components/Common/Input';
// import FitnessListTopNav from '../../components/Fitness/Etc/FitnessListTopNav';
// import FitnessList from '../../components/Fitness/List/FitnessList';
// import BottomNav from '../../components/Common/BottomNav';
// import { useNavigate } from 'react-router';
// import { getFitnessJjimList, getFitnessList } from '../../lib/api/fitness-api';
// import { CreateRoutine, FitnessType } from '../../util/types/axios-fitness';
// import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
// import { fitnessActions, selectAddList } from '../../store/fitness';
// import ReactModal from 'react-modal';
// import FitnessModalList from '../Fitness/List/FitnessModalList';

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
// };

// interface FitnessPlanModalProps {
//   open: boolean;
//   onModal: Function;
// }

// const FitnessAddListModal = (props: FitnessPlanModalProps): JSX.Element => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const addList = useAppSelector(selectAddList);
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
//     setAdd({ ...addList });
//   }, []);
//   // 상태가 업데이트된 후에 실행되는 useEffect
//   useEffect(() => {
//     console.log('Fitness 데이터:', fitness);
//   }, [fitness]);

//   const [add, setAdd] = useState<CreateRoutine[]>([]);
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
//     // if (add.length !== 0) {
//     //   navigate('../testplan', { state: { add } });
//     // } else {
//     //   alert('루틴에 운동을 추가해주세요.');
//     // }
//     props.onModal();
//   };

//   return (
//     <ReactModal
//       isOpen={props.open}
//       ariaHideApp={false}
//       onRequestClose={() => props.onModal()}
//       className="FitnessCalendarModal"
//       overlayClassName="Overlay"
//     >
//       <s.Container>
//         <s.HeaderArea>
//           <s.InputArea>
//             <Input width="100%" height="40px" placeholder="검색" type="text" name="" value={''} onChange={() => {}} />
//           </s.InputArea>
//           {/* <FitnessListTopNav /> */}
//         </s.HeaderArea>
//         <s.MainArea>
//           <s.FitnessArea>
//             <FitnessModalList text="전체" data={fitness} add={add} onAdd={handleClickAdd} />
//           </s.FitnessArea>
//         </s.MainArea>
//         <s.Btn onClick={handleClickMove}>루틴에 추가하기</s.Btn>
//       </s.Container>
//     </ReactModal>
//   );
// };

// export default FitnessAddListModal;
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Common/Input';
import ReactModal from 'react-modal';
import FitnessModalList from '../Fitness/List/FitnessModalList';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { fitnessActions, selectAddList } from '../../store/fitness';
import { getFitnessList } from '../../lib/api/fitness-api';
import { CreateRoutine, FitnessType } from '../../util/types/axios-fitness';

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
};

interface FitnessPlanModalProps {
  open: boolean;
  onModal: Function;
}

const FitnessAddListModal = (props: FitnessPlanModalProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const addList = useAppSelector(selectAddList);
  const [fitness, setFitness] = useState<FitnessType[]>([]);

  useEffect(() => {
    getFitnessList(
      (resp) => {
        setFitness(resp.data);
      },
      (error) => {
        setFitness([]);
        console.error(error);
      },
    );
  }, []);

  const [add, setAdd] = useState<CreateRoutine[]>(addList || []);

  const handleClickAdd = (exerciseId: number, exerciseName: string) => {
    setAdd((prevAdd) => {
      const existingItem = prevAdd.find((item) => item.exerciseId === exerciseId);
      if (existingItem) {
        // Remove item if it already exists
        const list = prevAdd.filter((item) => item.exerciseId !== exerciseId);
        dispatch(fitnessActions.setAddList(list));
        return list;
      } else {
        // Add new item
        const list = [...prevAdd, { exerciseId, exerciseName }];
        dispatch(fitnessActions.setAddList(list));
        return list;
      }
    });
  };

  const handleClickMove = (): void => {
    props.onModal();
  };

  return (
    <ReactModal
      isOpen={props.open}
      ariaHideApp={false}
      onRequestClose={() => props.onModal()}
      className="FitnessCalendarModal"
      overlayClassName="Overlay"
    >
      <s.Container>
        <s.HeaderArea>
          <s.InputArea>
            <Input width="100%" height="40px" placeholder="검색" type="text" name="" value={''} onChange={() => {}} />
          </s.InputArea>
        </s.HeaderArea>
        <s.MainArea>
          <s.FitnessArea>
            <FitnessModalList text="전체" data={fitness} add={add} onAdd={handleClickAdd} />
          </s.FitnessArea>
        </s.MainArea>
        <s.Btn onClick={handleClickMove}>루틴에 추가하기</s.Btn>
      </s.Container>
    </ReactModal>
  );
};

export default FitnessAddListModal;
