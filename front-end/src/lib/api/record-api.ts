import { AxiosError } from 'axios';
import { localAxios, publicAxios } from '../../util/axios-setting';
import { Inbody } from '../../util/types/axios-record';

const local = publicAxios();
const jwt = localAxios();

// 1rm
export const getRm = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/rm`).then(success).catch(fail);
};

// 최근 5개 운동량과 운동시간 가져오기
export const getFitnessData = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/exercise-records`).then(success).catch(fail);
};

// 운동이력조회
export const getFitnessCalendar = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/routines`).then(success).catch(fail);
};

// 인바디 결과 관리
export const getInbody = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/record/inbody`).then(success).catch(fail);
};

// 인바디 결과 등록
export const postInbody = async (
  param: Inbody,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/record/inbody`, param).then(success).catch(fail);
};
