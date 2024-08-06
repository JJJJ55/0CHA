import { localAxios, publicAxios } from '../../util/axios-setting';

const local = publicAxios();
const jwt = localAxios();

export const getFitnessList = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/exercise`, param).then(success).catch(fail);
};

// 카테고리별 검색인가?
export const getFitnessListCategory = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/exercise/${param}`).then(success).catch(fail);
};

// 운동찜
export const postFitnessJjim = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/exercise/${param}/favorite`, param).then(success).catch(fail);
};

// 운동찜 취소
export const putFitnessJjimCancel = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/exercise/${param}/favorite`, param).then(success).catch(fail);
};

// 운동찜 여부
export const FitnessJjimCheck = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/exercise/${param}/is-favorite`, param).then(success).catch(fail);
};

// 내 기존에 있는 루틴 리스트같음
export const RoutineList = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines`, param).then(success).catch(fail);
};

// 과거루틴 상세조회
export const RoutineDetail = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines/${param}`, param).then(success).catch(fail);
};

// 빈 루틴생성
export const NewRoutine = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines`, param).then(success).catch(fail);
};

// 루틴저장
export const SaveRoutine = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines/${param}`, param).then(success).catch(fail);
};

// 루틴삭제
export const DelRoutine = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines/${param}`, param).then(success).catch(fail);
};

// 루틴에 운동추가
export const RoutineAddFitness = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines/${param}/exercise/${param}`, param).then(success).catch(fail);
};

// 루틴에 운동삭제
export const RoutineDelFitness = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines/${param}/exercise/${param}`, param).then(success).catch(fail);
};

// 세트추가

// 세트삭제

// 운동완료
export const FinishRoutine = async (
  routineId: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines/${routineId}/complete`, param).then(success).catch(fail);
};
