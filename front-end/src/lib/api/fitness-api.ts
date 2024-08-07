import { AxiosError } from 'axios';
import { localAxios, publicAxios } from '../../util/axios-setting';
import { newRoutine, Routine } from '../../util/types/axios-fitness';

const local = publicAxios();
const jwt = localAxios();

export const getFitnessList = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/workout/exercise`).then(success).catch(fail);
};

// 카테고리별 검색인가?
export const getFitnessListCategory = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/exercise/${exerciseId}`).then(success).catch(fail);
};

// 운동찜
export const postFitnessJjim = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/workout/exercise/${exerciseId}/favorite`).then(success).catch(fail);
};

// 운동찜 취소
export const deleteFitnessJjimCancel = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/workout/exercise/${exerciseId}/favorite`).then(success).catch(fail);
};

// 운동찜 여부
export const getFitnessJjimCheck = async (
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/exercise/${exerciseId}/is-favorite`).then(success).catch(fail);
};

// 내 기존에 있는 루틴 리스트같음
export const getRoutineList = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/workout/routines`).then(success).catch(fail);
};

// 과거루틴 상세조회
export const getRoutineDetail = async (
  routineId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines/${routineId}`).then(success).catch(fail);
};

// 빈 루틴생성
export const postNewRoutine = async (
  param: newRoutine,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/workout/routines`, param).then(success).catch(fail);
};

// 루틴저장
export const putSaveRoutine = async (
  routineId: number,
  param: Routine,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/workout/routines/${routineId}`, param).then(success).catch(fail);
};

// 루틴삭제
export const delRoutine = async (
  routineId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/workout/routines/${routineId}`).then(success).catch(fail);
};

// 루틴에 운동추가
export const postRoutineAddFitness = async (
  routineId: number,
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/workout/routines/${routineId}/exercise/${exerciseId}`).then(success).catch(fail);
};

// 루틴에 운동삭제
export const delRoutineDelFitness = async (
  routineId: number,
  exerciseId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/workout/routines/${routineId}/exercise/${exerciseId}`).then(success).catch(fail);
};

// 세트추가

// 세트삭제

// 운동완료
export const putFinishRoutine = async (
  routineId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/workout/routines/${routineId}/complete`).then(success).catch(fail);
};
