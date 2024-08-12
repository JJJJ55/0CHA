// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Header from '../../components/Common/Header';
// import { ReactComponent as add } from '../../asset/img/svg/add.svg';
// import IconSvg from '../../components/Common/IconSvg';
// import Button from '../../components/Common/Button';
// import BottomNav from '../../components/Common/BottomNav';
// import FitnessPlanSetModal from '../../components/Modal/FitnessPlanSetModal';
// import { useLocation, useNavigate } from 'react-router';
// import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
// import { modalActions, selectModalAddList, selectModalCalendar } from '../../store/modal';
// import { useModalExitHook } from '../../lib/hook/useModalExitHook';
// import { axiosCreateRoutine, CreateRoutine, ExerciseDetailType } from '../../util/types/axios-fitness';
// import Text from '../../components/Common/Text';
// import { putNewRoutine } from '../../lib/api/fitness-api';
// import { RoutineListDetail, RoutineDetails } from '../../util/types/axios-fitness';
// import TestPlan from '../../components/Fitness/Detail/TestPlan';
// import { pageActions } from '../../store/page';
// import { selectAddList, selectPlan } from '../../store/fitness';
// import FitnessAddListModal from '../../components/Modal/FitnessAddListModal';

// const s = {
//   Container: styled.section`
//     height: 100%;
//     background-color: ${(props) => props.theme.bgColor};
//   `,
//   ContentArea: styled.div`
//     width: 100%;
//     height: 100%;
//     overflow: auto;
//     padding: 57px 0 80px;
//   `,
//   DateArea: styled.div`
//     color: ${(props) => props.theme.textColor2};
//     font-size: 16px;
//     width: 200px;
//     height: 50px;
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     margin: 15px auto;
//     cursor: pointer;
//   `,
//   FitnessArea: styled.div`
//     width: 90%;
//     margin: 0 auto;
//   `,
//   FitnessAdd: styled.div`
//     width: 100px;
//     height: 60px;
//     margin: 20px auto;
//     color: ${(props) => props.theme.mainColor};
//     font-size: 16px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     align-items: center;
//     cursor: pointer;
//   `,
//   BtnArea: styled.div`
//     width: 100%;
//     max-width: 500px;
//     height: 70px;
//     margin: 0 auto;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   `,
// };

// const TestPlanSetPage = (): JSX.Element => {
//   const navigate = useNavigate();
//   const addListData = useAppSelector(selectAddList);
//   const locationState = useLocation().state;
//   const historyData = locationState?.data as RoutineListDetail;

//   // Fallback to user-provided data if historyData is not available
//   // const data: CreateRoutine[] = locationState?.add || [];
//   const reduxData = useAppSelector(selectPlan);
//   console.log(reduxData);

//   // Set initial title and date based on historyData or default values
//   const [title, setTitle] = useState(historyData?.title || '이름과 날짜를 지정해주세요.');
//   const [date, setDate] = useState(historyData?.dueDate || '');

//   // Initialize fitness based on historyData or map data to desired structure
//   const [fitness, setFitness] = useState<RoutineDetails[]>(
//     // historyData?.details || data.map((item) => ({ ...item, sequence: 0, sets: [] })),
//     historyData?.details || addListData.map((item) => ({ ...item, sequence: 0, sets: [] })),
//     // reduxData.details,
//   );

//   const dispatch = useAppDispatch();
//   const isModal = useAppSelector(selectModalCalendar);
//   const isAddList = useAppSelector(selectModalAddList);

//   useEffect(() => {
//     setFitness(historyData?.details || addListData.map((item) => ({ ...item, sequence: 0, sets: [] })));
//   }, [addListData]);

//   // useEffect(() => {
//   //   return () => {
//   //     const param: axiosCreateRoutine = {
//   //       id: historyData?.id,
//   //       title: title,
//   //       dueDate: date,
//   //       details: fitness,
//   //     };

//   //     dispatch(fitnessActions.setPlanData(param));
//   //   };
//   // }, [title, date, fitness]);

//   // 날짜 선택 모달 열기
//   const handleChangeOpen = (): void => {
//     dispatch(modalActions.toggleCalendar());
//   };

//   const handleChangeAddListOpen = (): void => {
//     dispatch(modalActions.toggleAddList());
//   };

//   // 페이지 이동
//   const handleClickMove = (path: string): void => {
//     if (window.confirm('작성중인 루틴이 삭제됩니다. 그래도 진행하시겠습니까?')) {
//       navigate(path);
//     }
//   };

//   // 운동 삭제
//   const handleDeleteExercise = (index: number): void => {
//     const updatedFitness = fitness.filter((_, idx) => idx !== index);
//     setFitness(updatedFitness);
//   };

//   // 세트 변경
//   const handleSetChange = (exerciseIndex: number, updatedSets: ExerciseDetailType[]) => {
//     const updatedFitness = fitness.map((exercise, idx) => {
//       if (idx === exerciseIndex) {
//         return { ...exercise, sets: updatedSets };
//       }
//       return exercise;
//     });
//     setFitness(updatedFitness);
//     console.log('Updated fitness:', updatedFitness); // 디버깅 로그
//   };

//   const handleSaveRoutine = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     console.log(today);
//     if (date === '') {
//       alert('제목과 날짜를 선택해주세요.');
//     } else {
//       const param: axiosCreateRoutine = {
//         title: title,
//         dueDate: date,
//         details: fitness,
//       };
//       await putNewRoutine(
//         param,
//         (resp) => {
//           alert('저장완료');
//         },
//         (error) => {
//           alert('저장 중 오류');
//           console.log(error);
//         },
//       );
//     }
//   };

//   // 운동 시작 버튼 클릭
//   const handlePlay = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     console.log(today);
//     if (date === '') {
//       alert('제목과 날짜를 선택해주세요.');
//     } else if (date !== today) {
//       alert('운동시작은 당일만 가능합니다.');
//     } else {
//       console.log('Current Fitness Data:', fitness); // 콘솔에 현재 데이터를 출력

//       const param: axiosCreateRoutine = {
//         id: historyData?.id,
//         title: title,
//         dueDate: date,
//         details: fitness,
//       };

//       console.log(param);

//       await putNewRoutine(
//         param,
//         (resp) => {
//           dispatch(pageActions.toogleIsPlay(true));
//           param.id = resp.data.routineId;
//           // navigate('/play', { state: { fitnessData: fitness } }); // 데이터를 운동 페이지로 전달
//           navigate('../../play', { state: { data: param } });
//         },
//         (error) => {
//           alert('저장 중 오류');
//           console.log(error);
//         },
//       );
//     }
//   };

//   useModalExitHook();

//   return (
//     <s.Container>
//       <Header text="새루틴" onBack={() => navigate('../list')}>
//         <Button
//           width="80px"
//           height="40px"
//           children="불러오기"
//           onClick={() => handleClickMove('../history')}
//           size="14px"
//           margin="0 20px 0 0"
//         />
//       </Header>
//       <s.ContentArea>
//         <s.DateArea onClick={handleChangeOpen}>
//           {title}
//           <Text
//             children={date}
//             margin="0 auto"
//             size="16px"
//             bold="500"
//             textalian="center"
//             display="block"
//             color="textColor2"
//             cursor="pointer"
//           />
//         </s.DateArea>

//         <s.FitnessArea>
//           {fitness.map((exercise, index) => (
//             <div key={index}>
//               <TestPlan
//                 exercise={exercise}
//                 index={index}
//                 onChangeSet={handleSetChange}
//                 onDelete={() => handleDeleteExercise(index)}
//               />
//             </div>
//           ))}
//         </s.FitnessArea>
//         <s.FitnessAdd onClick={handleChangeAddListOpen}>
//           운동 추가
//           <IconSvg width="24" height="24" Ico={add} />
//         </s.FitnessAdd>
//         <s.BtnArea>
//           <Button
//             width="170px"
//             height="40px"
//             children="루틴 저장"
//             onClick={handleSaveRoutine}
//             bold="500"
//             size="14px"
//             margin="10px"
//           />
//           <Button
//             width="170px"
//             height="40px"
//             children="운동시작"
//             onClick={handlePlay}
//             bold="500"
//             size="14px"
//             type="main"
//             margin="10px"
//           />
//         </s.BtnArea>
//       </s.ContentArea>
//       <BottomNav />
//       <FitnessPlanSetModal open={isModal} onModal={handleChangeOpen} onTitle={setTitle} onDate={setDate} />
//       <FitnessAddListModal open={isAddList} onModal={handleChangeAddListOpen} />
//     </s.Container>
//   );
// };

// export default TestPlanSetPage;

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Header from '../../components/Common/Header';
// import { ReactComponent as add } from '../../asset/img/svg/add.svg';
// import IconSvg from '../../components/Common/IconSvg';
// import Button from '../../components/Common/Button';
// import BottomNav from '../../components/Common/BottomNav';
// import FitnessPlanSetModal from '../../components/Modal/FitnessPlanSetModal';
// import { useLocation, useNavigate } from 'react-router';
// import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
// import { modalActions, selectModalAddList, selectModalCalendar } from '../../store/modal';
// import { useModalExitHook } from '../../lib/hook/useModalExitHook';
// import { axiosCreateRoutine, ExerciseDetailType } from '../../util/types/axios-fitness';
// import Text from '../../components/Common/Text';
// import { putNewRoutine } from '../../lib/api/fitness-api';
// import { RoutineListDetail, RoutineDetails } from '../../util/types/axios-fitness';
// import TestPlan from '../../components/Fitness/Detail/TestPlan';
// import { pageActions } from '../../store/page';
// import { selectAddList, selectPlan } from '../../store/fitness';
// import FitnessAddListModal from '../../components/Modal/FitnessAddListModal';

// const s = {
//   Container: styled.section`
//     height: 100%;
//     background-color: ${(props) => props.theme.bgColor};
//   `,
//   ContentArea: styled.div`
//     width: 100%;
//     height: 100%;
//     overflow: auto;
//     padding: 57px 0 80px;
//   `,
//   DateArea: styled.div`
//     color: ${(props) => props.theme.textColor2};
//     font-size: 16px;
//     width: 200px;
//     height: 50px;
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     margin: 15px auto;
//     cursor: pointer;
//   `,
//   FitnessArea: styled.div`
//     width: 90%;
//     margin: 0 auto;
//   `,
//   FitnessAdd: styled.div`
//     width: 100px;
//     height: 60px;
//     margin: 20px auto;
//     color: ${(props) => props.theme.mainColor};
//     font-size: 16px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     align-items: center;
//     cursor: pointer;
//   `,
//   BtnArea: styled.div`
//     width: 100%;
//     max-width: 500px;
//     height: 70px;
//     margin: 0 auto;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   `,
// };

// const TestPlanSetPage = (): JSX.Element => {
//   const navigate = useNavigate();
//   const addListData = useAppSelector(selectAddList);
//   const locationState = useLocation().state;
//   const historyData = locationState?.data as RoutineListDetail;

//   const reduxData = useAppSelector(selectPlan);
//   console.log(reduxData);

//   const [title, setTitle] = useState(historyData?.title || '이름과 날짜를 지정해주세요.');
//   const [date, setDate] = useState(historyData?.dueDate || '');

//   // Initialize fitness state with historyData or an empty array
//   const [fitness, setFitness] = useState<RoutineDetails[]>(historyData?.details || []);

//   const dispatch = useAppDispatch();
//   const isModal = useAppSelector(selectModalCalendar);
//   const isAddList = useAppSelector(selectModalAddList);

//   // Update fitness state when addListData changes
//   useEffect(() => {
//     // Create a map of current fitness exercises by some unique property (e.g., exerciseId)
//     const fitnessMap = new Map(fitness.map((exercise) => [exercise.exerciseId, exercise]));

//     // Merge new exercises from addListData with existing ones
//     const mergedFitness = addListData.map((exercise) =>
//       fitnessMap.has(exercise.exerciseId)
//         ? { ...fitnessMap.get(exercise.exerciseId) }
//         : { ...exercise, sequence: 0, sets: [] },
//     );

//     // Ensure mergedFitness is of type RoutineDetails[]
//     setFitness(mergedFitness as RoutineDetails[]);
//   }, [addListData]);

//   const handleChangeOpen = (): void => {
//     dispatch(modalActions.toggleCalendar());
//   };

//   const handleChangeAddListOpen = (): void => {
//     dispatch(modalActions.toggleAddList());
//   };

//   const handleClickMove = (path: string): void => {
//     if (window.confirm('작성중인 루틴이 삭제됩니다. 그래도 진행하시겠습니까?')) {
//       navigate(path);
//     }
//   };

//   const handleDeleteExercise = (index: number): void => {
//     const updatedFitness = fitness.filter((_, idx) => idx !== index);
//     setFitness(updatedFitness);
//   };

//   const handleSetChange = (exerciseIndex: number, updatedSets: ExerciseDetailType[]) => {
//     const updatedFitness = fitness.map((exercise, idx) => {
//       if (idx === exerciseIndex) {
//         return { ...exercise, sets: updatedSets };
//       }
//       return exercise;
//     });
//     setFitness(updatedFitness);
//     console.log('Updated fitness:', updatedFitness); // 디버깅 로그
//   };

//   const handleSaveRoutine = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     console.log(today);
//     if (date === '') {
//       alert('제목과 날짜를 선택해주세요.');
//     } else {
//       const param: axiosCreateRoutine = {
//         title: title,
//         dueDate: date,
//         details: fitness,
//       };
//       await putNewRoutine(
//         param,
//         (resp) => {
//           alert('저장완료');
//         },
//         (error) => {
//           alert('저장 중 오류');
//           console.log(error);
//         },
//       );
//     }
//   };

//   const handlePlay = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     console.log(today);
//     if (date === '') {
//       alert('제목과 날짜를 선택해주세요.');
//     } else if (date !== today) {
//       alert('운동시작은 당일만 가능합니다.');
//     } else {
//       console.log('Current Fitness Data:', fitness); // 콘솔에 현재 데이터를 출력

//       const param: axiosCreateRoutine = {
//         id: historyData?.id,
//         title: title,
//         dueDate: date,
//         details: fitness,
//       };

//       console.log(param);

//       await putNewRoutine(
//         param,
//         (resp) => {
//           dispatch(pageActions.toogleIsPlay(true));
//           param.id = resp.data.routineId;
//           navigate('../../play', { state: { data: param } });
//         },
//         (error) => {
//           alert('저장 중 오류');
//           console.log(error);
//         },
//       );
//     }
//   };

//   useModalExitHook();

//   return (
//     <s.Container>
//       <Header text="새루틴" onBack={() => navigate('../list')}>
//         <Button
//           width="80px"
//           height="40px"
//           children="불러오기"
//           onClick={() => handleClickMove('../history')}
//           size="14px"
//           margin="0 20px 0 0"
//         />
//       </Header>
//       <s.ContentArea>
//         <s.DateArea onClick={handleChangeOpen}>
//           {title}
//           <Text
//             children={date}
//             margin="0 auto"
//             size="16px"
//             bold="500"
//             textalian="center"
//             display="block"
//             color="textColor2"
//             cursor="pointer"
//           />
//         </s.DateArea>

//         <s.FitnessArea>
//           {fitness.map((exercise, index) => (
//             <div key={index}>
//               <TestPlan
//                 exercise={exercise}
//                 index={index}
//                 onChangeSet={handleSetChange}
//                 onDelete={() => handleDeleteExercise(index)}
//               />
//             </div>
//           ))}
//         </s.FitnessArea>
//         <s.FitnessAdd onClick={handleChangeAddListOpen}>
//           운동 추가
//           <IconSvg width="24" height="24" Ico={add} />
//         </s.FitnessAdd>
//         <s.BtnArea>
//           <Button
//             width="170px"
//             height="40px"
//             children="루틴 저장"
//             onClick={handleSaveRoutine}
//             bold="500"
//             size="14px"
//             margin="10px"
//           />
//           <Button
//             width="170px"
//             height="40px"
//             children="운동시작"
//             onClick={handlePlay}
//             bold="500"
//             size="14px"
//             type="main"
//             margin="10px"
//           />
//         </s.BtnArea>
//       </s.ContentArea>
//       <BottomNav />
//       <FitnessPlanSetModal open={isModal} onModal={handleChangeOpen} onTitle={setTitle} onDate={setDate} />
//       <FitnessAddListModal open={isAddList} onModal={handleChangeAddListOpen} />
//     </s.Container>
//   );
// };

// export default TestPlanSetPage;

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Header from '../../components/Common/Header';
// import { ReactComponent as add } from '../../asset/img/svg/add.svg';
// import IconSvg from '../../components/Common/IconSvg';
// import Button from '../../components/Common/Button';
// import BottomNav from '../../components/Common/BottomNav';
// import FitnessPlanSetModal from '../../components/Modal/FitnessPlanSetModal';
// import { useLocation, useNavigate } from 'react-router';
// import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
// import { modalActions, selectModalAddList, selectModalCalendar } from '../../store/modal';
// import { useModalExitHook } from '../../lib/hook/useModalExitHook';
// import { axiosCreateRoutine, ExerciseDetailType } from '../../util/types/axios-fitness';
// import Text from '../../components/Common/Text';
// import { putNewRoutine } from '../../lib/api/fitness-api';
// import { RoutineListDetail, RoutineDetails } from '../../util/types/axios-fitness';
// import TestPlan from '../../components/Fitness/Detail/TestPlan';
// import { pageActions } from '../../store/page';
// import { selectAddList, selectPlan } from '../../store/fitness';
// import FitnessAddListModal from '../../components/Modal/FitnessAddListModal';

// const s = {
//   Container: styled.section`
//     height: 100%;
//     background-color: ${(props) => props.theme.bgColor};
//   `,
//   ContentArea: styled.div`
//     width: 100%;
//     height: 100%;
//     overflow: auto;
//     padding: 57px 0 80px;
//   `,
//   DateArea: styled.div`
//     color: ${(props) => props.theme.textColor2};
//     font-size: 16px;
//     width: 200px;
//     height: 50px;
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     margin: 15px auto;
//     cursor: pointer;
//   `,
//   FitnessArea: styled.div`
//     width: 90%;
//     margin: 0 auto;
//   `,
//   FitnessAdd: styled.div`
//     width: 100px;
//     height: 60px;
//     margin: 20px auto;
//     color: ${(props) => props.theme.mainColor};
//     font-size: 16px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     align-items: center;
//     cursor: pointer;
//   `,
//   BtnArea: styled.div`
//     width: 100%;
//     max-width: 500px;
//     height: 70px;
//     margin: 0 auto;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   `,
// };

// const TestPlanSetPage = (): JSX.Element => {
//   const navigate = useNavigate();
//   const addListData = useAppSelector(selectAddList);
//   const locationState = useLocation().state;
//   const historyData = locationState?.data as RoutineListDetail;

//   const reduxData = useAppSelector(selectPlan);
//   console.log(reduxData);

//   const [title, setTitle] = useState(historyData?.title || '이름과 날짜를 지정해주세요.');
//   const [date, setDate] = useState(historyData?.dueDate || '');

//   // Initialize fitness state with historyData or an empty array
//   const [fitness, setFitness] = useState<RoutineDetails[]>(historyData?.details || []);

//   const dispatch = useAppDispatch();
//   const isModal = useAppSelector(selectModalCalendar);
//   const isAddList = useAppSelector(selectModalAddList);

//   // Effect to update fitness state when addListData changes
//   useEffect(() => {
//     // If addListData has exercises, append them to the current fitness list
//     if (addListData.length > 0) {
//       setFitness((prevFitness) => [
//         ...prevFitness,
//         ...addListData.map((exercise) => ({ ...exercise, sequence: prevFitness.length, sets: [] })),
//       ]);
//     }
//   }, [addListData]);

//   const handleChangeOpen = (): void => {
//     dispatch(modalActions.toggleCalendar());
//   };

//   const handleChangeAddListOpen = (): void => {
//     dispatch(modalActions.toggleAddList());
//   };

//   const handleClickMove = (path: string): void => {
//     if (window.confirm('작성중인 루틴이 삭제됩니다. 그래도 진행하시겠습니까?')) {
//       navigate(path);
//     }
//   };

//   const handleDeleteExercise = (index: number): void => {
//     const updatedFitness = fitness.filter((_, idx) => idx !== index);
//     setFitness(updatedFitness);
//   };

//   const handleSetChange = (exerciseIndex: number, updatedSets: ExerciseDetailType[]) => {
//     const updatedFitness = fitness.map((exercise, idx) => {
//       if (idx === exerciseIndex) {
//         return { ...exercise, sets: updatedSets };
//       }
//       return exercise;
//     });
//     setFitness(updatedFitness);
//     console.log('Updated fitness:', updatedFitness); // Debug log
//   };

//   const handleSaveRoutine = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     console.log(today);
//     if (date === '') {
//       alert('제목과 날짜를 선택해주세요.');
//     } else {
//       const param: axiosCreateRoutine = {
//         title: title,
//         dueDate: date,
//         details: fitness,
//       };
//       await putNewRoutine(
//         param,
//         (resp) => {
//           alert('저장완료');
//         },
//         (error) => {
//           alert('저장 중 오류');
//           console.log(error);
//         },
//       );
//     }
//   };

//   const handlePlay = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     console.log(today);
//     if (date === '') {
//       alert('제목과 날짜를 선택해주세요.');
//     } else if (date !== today) {
//       alert('운동시작은 당일만 가능합니다.');
//     } else {
//       console.log('Current Fitness Data:', fitness); // Log current data

//       const param: axiosCreateRoutine = {
//         id: historyData?.id,
//         title: title,
//         dueDate: date,
//         details: fitness,
//       };

//       console.log(param);

//       await putNewRoutine(
//         param,
//         (resp) => {
//           dispatch(pageActions.toogleIsPlay(true));
//           param.id = resp.data.routineId;
//           navigate('../../play', { state: { data: param } });
//         },
//         (error) => {
//           alert('저장 중 오류');
//           console.log(error);
//         },
//       );
//     }
//   };

//   useModalExitHook();

//   return (
//     <s.Container>
//       <Header text="새루틴" onBack={() => navigate('../list')}>
//         <Button
//           width="80px"
//           height="40px"
//           children="불러오기"
//           onClick={() => handleClickMove('../history')}
//           size="14px"
//           margin="0 20px 0 0"
//         />
//       </Header>
//       <s.ContentArea>
//         <s.DateArea onClick={handleChangeOpen}>
//           {title}
//           <Text
//             children={date}
//             margin="0 auto"
//             size="16px"
//             bold="500"
//             textalian="center"
//             display="block"
//             color="textColor2"
//             cursor="pointer"
//           />
//         </s.DateArea>

//         <s.FitnessArea>
//           {fitness.map((exercise, index) => (
//             <div key={index}>
//               <TestPlan
//                 exercise={exercise}
//                 index={index}
//                 onChangeSet={handleSetChange}
//                 onDelete={() => handleDeleteExercise(index)}
//               />
//             </div>
//           ))}
//         </s.FitnessArea>
//         <s.FitnessAdd onClick={handleChangeAddListOpen}>
//           운동 추가
//           <IconSvg width="24" height="24" Ico={add} />
//         </s.FitnessAdd>
//         <s.BtnArea>
//           <Button
//             width="170px"
//             height="40px"
//             children="루틴 저장"
//             onClick={handleSaveRoutine}
//             bold="500"
//             size="14px"
//             margin="10px"
//           />
//           <Button
//             width="170px"
//             height="40px"
//             children="운동시작"
//             onClick={handlePlay}
//             bold="500"
//             size="14px"
//             type="main"
//             margin="10px"
//           />
//         </s.BtnArea>
//       </s.ContentArea>
//       <BottomNav />
//       <FitnessPlanSetModal open={isModal} onModal={handleChangeOpen} onTitle={setTitle} onDate={setDate} />
//       <FitnessAddListModal open={isAddList} onModal={handleChangeAddListOpen} />
//     </s.Container>
//   );
// };

// export default TestPlanSetPage;

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Header from '../../components/Common/Header';
// import { ReactComponent as add } from '../../asset/img/svg/add.svg';
// import IconSvg from '../../components/Common/IconSvg';
// import Button from '../../components/Common/Button';
// import BottomNav from '../../components/Common/BottomNav';
// import FitnessPlanSetModal from '../../components/Modal/FitnessPlanSetModal';
// import { useLocation, useNavigate } from 'react-router';
// import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
// import { modalActions, selectModalAddList, selectModalCalendar } from '../../store/modal';
// import { useModalExitHook } from '../../lib/hook/useModalExitHook';
// import { axiosCreateRoutine, ExerciseDetailType } from '../../util/types/axios-fitness';
// import Text from '../../components/Common/Text';
// import { putNewRoutine } from '../../lib/api/fitness-api';
// import { RoutineListDetail, RoutineDetails } from '../../util/types/axios-fitness';
// import TestPlan from '../../components/Fitness/Detail/TestPlan';
// import { pageActions } from '../../store/page';
// import { selectAddList, selectPlan } from '../../store/fitness';
// import FitnessAddListModal from '../../components/Modal/FitnessAddListModal';

// const s = {
//   Container: styled.section`
//     height: 100%;
//     background-color: ${(props) => props.theme.bgColor};
//   `,
//   ContentArea: styled.div`
//     width: 100%;
//     height: 100%;
//     overflow: auto;
//     padding: 57px 0 80px;
//   `,
//   DateArea: styled.div`
//     color: ${(props) => props.theme.textColor2};
//     font-size: 16px;
//     width: 200px;
//     height: 50px;
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     margin: 15px auto;
//     cursor: pointer;
//   `,
//   FitnessArea: styled.div`
//     width: 90%;
//     margin: 0 auto;
//   `,
//   FitnessAdd: styled.div`
//     width: 100px;
//     height: 60px;
//     margin: 20px auto;
//     color: ${(props) => props.theme.mainColor};
//     font-size: 16px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     align-items: center;
//     cursor: pointer;
//   `,
//   BtnArea: styled.div`
//     width: 100%;
//     max-width: 500px;
//     height: 70px;
//     margin: 0 auto;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   `,
// };

// const TestPlanSetPage = (): JSX.Element => {
//   const navigate = useNavigate();
//   const addListData = useAppSelector(selectAddList);
//   const locationState = useLocation().state;
//   const historyData = locationState?.data as RoutineListDetail;

//   const [title, setTitle] = useState(historyData?.title || '이름과 날짜를 지정해주세요.');
//   const [date, setDate] = useState(historyData?.dueDate || '');

//   // Initialize fitness state with historyData or an empty array
//   const [fitness, setFitness] = useState<RoutineDetails[]>(historyData?.details || []);

//   const dispatch = useAppDispatch();
//   const isModal = useAppSelector(selectModalCalendar);
//   const isAddList = useAppSelector(selectModalAddList);

//   // Effect to update fitness state when addListData changes
//   useEffect(() => {
//     // Append new exercises to the current fitness list
//     if (addListData.length > 0) {
//       setFitness((prevFitness) => [
//         ...prevFitness,
//         ...addListData.map((exercise) => ({ ...exercise, sequence: prevFitness.length, sets: [] })),
//       ]);
//     }
//   }, [addListData]);

//   // Effect to handle loading a new routine
//   useEffect(() => {
//     if (historyData?.details) {
//       setFitness(historyData.details);
//     }
//   }, [historyData]);

//   const handleChangeOpen = (): void => {
//     dispatch(modalActions.toggleCalendar());
//   };

//   const handleChangeAddListOpen = (): void => {
//     dispatch(modalActions.toggleAddList());
//   };

//   const handleClickMove = (path: string): void => {
//     if (window.confirm('작성중인 루틴이 삭제됩니다. 그래도 진행하시겠습니까?')) {
//       navigate(path);
//     }
//   };

//   const handleDeleteExercise = (index: number): void => {
//     const updatedFitness = fitness.filter((_, idx) => idx !== index);
//     setFitness(updatedFitness);
//   };

//   const handleSetChange = (exerciseIndex: number, updatedSets: ExerciseDetailType[]) => {
//     const updatedFitness = fitness.map((exercise, idx) => {
//       if (idx === exerciseIndex) {
//         return { ...exercise, sets: updatedSets };
//       }
//       return exercise;
//     });
//     setFitness(updatedFitness);
//   };

//   const handleSaveRoutine = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     if (date === '') {
//       alert('제목과 날짜를 선택해주세요.');
//     } else {
//       const param: axiosCreateRoutine = {
//         title: title,
//         dueDate: date,
//         details: fitness,
//       };
//       await putNewRoutine(
//         param,
//         (resp) => {
//           alert('저장완료');
//         },
//         (error) => {
//           alert('저장 중 오류');
//           console.log(error);
//         },
//       );
//     }
//   };

//   const handlePlay = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     if (date === '') {
//       alert('제목과 날짜를 선택해주세요.');
//     } else if (date !== today) {
//       alert('운동시작은 당일만 가능합니다.');
//     } else {
//       const param: axiosCreateRoutine = {
//         id: historyData?.id,
//         title: title,
//         dueDate: date,
//         details: fitness,
//       };

//       await putNewRoutine(
//         param,
//         (resp) => {
//           dispatch(pageActions.toogleIsPlay(true));
//           param.id = resp.data.routineId;
//           navigate('../../play', { state: { data: param } });
//         },
//         (error) => {
//           alert('저장 중 오류');
//           console.log(error);
//         },
//       );
//     }
//   };

//   useModalExitHook();

//   return (
//     <s.Container>
//       <Header text="새루틴" onBack={() => navigate('../list')}>
//         <Button
//           width="80px"
//           height="40px"
//           children="불러오기"
//           onClick={() => handleClickMove('../history')}
//           size="14px"
//           margin="0 20px 0 0"
//         />
//       </Header>
//       <s.ContentArea>
//         <s.DateArea onClick={handleChangeOpen}>
//           {title}
//           <Text
//             children={date}
//             margin="0 auto"
//             size="16px"
//             bold="500"
//             textalian="center"
//             display="block"
//             color="textColor2"
//             cursor="pointer"
//           />
//         </s.DateArea>

//         <s.FitnessArea>
//           {fitness.map((exercise, index) => (
//             <div key={index}>
//               <TestPlan
//                 exercise={exercise}
//                 index={index}
//                 onChangeSet={handleSetChange}
//                 onDelete={() => handleDeleteExercise(index)}
//               />
//             </div>
//           ))}
//         </s.FitnessArea>
//         <s.FitnessAdd onClick={handleChangeAddListOpen}>
//           운동 추가
//           <IconSvg width="24" height="24" Ico={add} />
//         </s.FitnessAdd>
//         <s.BtnArea>
//           <Button
//             width="170px"
//             height="40px"
//             children="루틴 저장"
//             onClick={handleSaveRoutine}
//             bold="500"
//             size="14px"
//             margin="10px"
//           />
//           <Button
//             width="170px"
//             height="40px"
//             children="운동시작"
//             onClick={handlePlay}
//             bold="500"
//             size="14px"
//             type="main"
//             margin="10px"
//           />
//         </s.BtnArea>
//       </s.ContentArea>
//       <BottomNav />
//       <FitnessPlanSetModal open={isModal} onModal={handleChangeOpen} onTitle={setTitle} onDate={setDate} />
//       <FitnessAddListModal open={isAddList} onModal={handleChangeAddListOpen} />
//     </s.Container>
//   );
// };

// export default TestPlanSetPage;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import { ReactComponent as add } from '../../asset/img/svg/add.svg';
import IconSvg from '../../components/Common/IconSvg';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import FitnessPlanSetModal from '../../components/Modal/FitnessPlanSetModal';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { modalActions, selectModalAddList, selectModalCalendar } from '../../store/modal';
import { useModalExitHook } from '../../lib/hook/useModalExitHook';
import { axiosCreateRoutine, ExerciseDetailType } from '../../util/types/axios-fitness';
import Text from '../../components/Common/Text';
import { putNewRoutine } from '../../lib/api/fitness-api';
import { RoutineListDetail, RoutineDetails } from '../../util/types/axios-fitness';
import TestPlan from '../../components/Fitness/Detail/TestPlan';
import { pageActions } from '../../store/page';
import { selectAddList } from '../../store/fitness';
import FitnessAddListModal from '../../components/Modal/FitnessAddListModal';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  ContentArea: styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 57px 0 80px;
  `,
  DateArea: styled.div`
    color: ${(props) => props.theme.textColor2};
    font-size: 16px;
    width: 200px;
    height: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px auto;
    cursor: pointer;
  `,
  FitnessArea: styled.div`
    width: 90%;
    margin: 0 auto;
  `,
  FitnessAdd: styled.div`
    width: 100px;
    height: 60px;
    margin: 20px auto;
    color: ${(props) => props.theme.mainColor};
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  `,
  BtnArea: styled.div`
    width: 100%;
    max-width: 500px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const TestPlanSetPage = (): JSX.Element => {
  const navigate = useNavigate();
  const addListData = useAppSelector(selectAddList);
  const locationState = useLocation().state;
  const historyData = locationState?.data as RoutineListDetail;

  const [title, setTitle] = useState(historyData?.title || '이름과 날짜를 지정해주세요.');
  const [date, setDate] = useState(historyData?.dueDate || '');

  // Initialize fitness state with historyData or an empty array
  const [fitness, setFitness] = useState<RoutineDetails[]>(historyData?.details || []);

  const dispatch = useAppDispatch();
  const isModal = useAppSelector(selectModalCalendar);
  const isAddList = useAppSelector(selectModalAddList);

  // Effect to handle adding new exercises
  useEffect(() => {
    if (addListData.length > 0) {
      // Filter out exercises that are already in the fitness state
      const newExercises = addListData.filter(
        (exercise) => !fitness.some((fit) => fit.exerciseId === exercise.exerciseId),
      );

      // Only update state if there are new exercises
      if (newExercises.length > 0) {
        setFitness((prevFitness) => [
          ...prevFitness,
          ...newExercises.map((exercise) => ({ ...exercise, sequence: prevFitness.length, sets: [] })),
        ]);
      }
    }
  }, [addListData]);

  // Effect to handle loading a new routine
  useEffect(() => {
    if (historyData?.details) {
      setFitness(historyData.details);
    }
  }, [historyData]);

  const handleChangeOpen = (): void => {
    dispatch(modalActions.toggleCalendar());
  };

  const handleChangeAddListOpen = (): void => {
    dispatch(modalActions.toggleAddList());
  };

  const handleClickMove = (path: string): void => {
    if (window.confirm('작성중인 루틴이 삭제됩니다. 그래도 진행하시겠습니까?')) {
      navigate(path);
    }
  };

  const handleDeleteExercise = (index: number): void => {
    const updatedFitness = fitness.filter((_, idx) => idx !== index);
    setFitness(updatedFitness);
  };

  const handleSetChange = (exerciseIndex: number, updatedSets: ExerciseDetailType[]) => {
    const updatedFitness = fitness.map((exercise, idx) => {
      if (idx === exerciseIndex) {
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setFitness(updatedFitness);
  };

  const handleSaveRoutine = async () => {
    const day = new Date();
    const today =
      day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
    if (date === '') {
      alert('제목과 날짜를 선택해주세요.');
    } else {
      const param: axiosCreateRoutine = {
        title: title,
        dueDate: date,
        details: fitness,
      };
      await putNewRoutine(
        param,
        (resp) => {
          alert('저장완료');
        },
        (error) => {
          alert('저장 중 오류');
          console.log(error);
        },
      );
    }
  };

  const handlePlay = async () => {
    const day = new Date();
    const today =
      day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
    if (date === '') {
      alert('제목과 날짜를 선택해주세요.');
    } else if (date !== today) {
      alert('운동시작은 당일만 가능합니다.');
    } else {
      const param: axiosCreateRoutine = {
        id: historyData?.id,
        title: title,
        dueDate: date,
        details: fitness,
      };

      await putNewRoutine(
        param,
        (resp) => {
          dispatch(pageActions.toogleIsPlay(true));
          param.id = resp.data.routineId;
          navigate('../../play', { state: { data: param } });
        },
        (error) => {
          alert('저장 중 오류');
          console.log(error);
        },
      );
    }
  };

  const handleExitModal = (): void => {
    dispatch(modalActions.toggleAddList());
  };

  useModalExitHook();

  return (
    <s.Container>
      <Header text="새루틴" onBack={() => navigate('../list')}>
        <Button
          width="80px"
          height="40px"
          children="불러오기"
          onClick={() => handleClickMove('../history')}
          size="14px"
          margin="0 20px 0 0"
        />
      </Header>
      <s.ContentArea>
        <s.DateArea onClick={handleChangeOpen}>
          {title}
          <Text
            children={date}
            margin="0 auto"
            size="16px"
            bold="500"
            textalian="center"
            display="block"
            color="textColor2"
            cursor="pointer"
          />
        </s.DateArea>

        <s.FitnessArea>
          {fitness.map((exercise, index) => (
            <div key={index}>
              <TestPlan
                exercise={exercise}
                index={index}
                onChangeSet={handleSetChange}
                onDelete={() => handleDeleteExercise(index)}
              />
            </div>
          ))}
        </s.FitnessArea>
        <s.FitnessAdd onClick={handleChangeAddListOpen}>
          운동 추가
          <IconSvg width="24" height="24" Ico={add} />
        </s.FitnessAdd>
        <s.BtnArea>
          <Button
            width="170px"
            height="40px"
            children="루틴 저장"
            onClick={handleSaveRoutine}
            bold="500"
            size="14px"
            margin="10px"
          />
          <Button
            width="170px"
            height="40px"
            children="운동시작"
            onClick={handlePlay}
            bold="500"
            size="14px"
            type="main"
            margin="10px"
          />
        </s.BtnArea>
      </s.ContentArea>
      <BottomNav />
      <FitnessPlanSetModal open={isModal} onModal={handleChangeOpen} onTitle={setTitle} onDate={setDate} />
      <FitnessAddListModal open={isAddList} onModal={handleExitModal} />
    </s.Container>
  );
};

export default TestPlanSetPage;
