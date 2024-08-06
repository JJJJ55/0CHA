import { localAxios, publicAxios } from '../../util/axios-setting';

const local = publicAxios();
const jwt = localAxios();

// 1rm 
export const getFitnessList = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/record/rm`, param).then(success).catch(fail);
};

// 운동량
export const getFitnessListCategory = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/record/exercise/volume`).then(success).catch(fail);
};

// 운동시간
export const postFitnessJjim = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/record/exercise/time`, param).then(success).catch(fail);
};

// 운동이력조회 달마다
export const putFitnessJjimCancel = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/record/routines/month?year=${}&month=${}`, param).then(success).catch(fail);
};

// 인바디 결과 관리
export const FitnessJjimCheck = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/record/inbody`, param).then(success).catch(fail);
};

// 인바디 결과 등록
export const RoutineList = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/record/inbody`, param).then(success).catch(fail);
};