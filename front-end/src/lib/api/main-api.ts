import { localAxios, publicAxios } from '../../util/axios-setting';

const local = publicAxios();
const jwt = localAxios();

// 상단 루틴가져오기

// 내 루틴가져오기
export const MyRoutine = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/main/routines`, param).then(success).catch(fail);
};

// 알림
export const Notification = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/main/notifications`, param).then(success).catch(fail);
};

// 내 정보
export const MyInfo = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/main/user-info`, param).then(success).catch(fail);
};

// 내 프로필 정보 수정
export const ProfileModify = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/main/profile`, param).then(success).catch(fail);
};

// 닉네임 중복검사
export const CheckNickname = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/main/profile/check-nickname`, param).then(success).catch(fail);
};

// 내 정보수정
export const MyInfoModify = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/main/profile/info`, param).then(success).catch(fail);
};

// 비밀번호 수정
export const ChangePw = async (
  param: UserLogin,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await local.post(`/main/profile/password`, param).then(success).catch(fail);
};

// 회원탈퇴
export const MyDel = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/main/profile`, param).then(success).catch(fail);
};
