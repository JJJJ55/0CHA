import { AxiosError } from 'axios';
import { localAxios, publicAxios } from '../../util/axios-setting';
import { Inbody } from '../../util/types/axios-record';

const local = publicAxios();
const jwt = localAxios();

// 1rm
export const getFitnessList = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/rm`).then(success).catch(fail);
};

// 운동량
export const getFitnessListCategory = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/exercise/volume`).then(success).catch(fail);
};

// 운동시간
export const postFitnessJjim = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/exercise/time`).then(success).catch(fail);
};

// 운동이력조회 달마다
export const putFitnessJjimCancel = async (
  param: any,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/record/routines/month?year=${param.year}&month=${param.month}`, param).then(success).catch(fail);
};

// 인바디 결과 관리
export const FitnessJjimCheck = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/inbody`).then(success).catch(fail);
};

// 인바디 결과 등록
export const RoutineList = async (
  param: Inbody,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/record/inbody`, param).then(success).catch(fail);
};
