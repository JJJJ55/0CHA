import { localAxios, publicAxios } from '../../util/axios-setting';

const local = publicAxios();
const jwt = localAxios();

// 유저페이지
export const UserPage = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/social/user-page/info?user-id=${}`, param).then(success).catch(fail);
};

// 유저페이지 내 피드 보기
export const UserPageFeed = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/social/user-page/feeds?user-id=${}`, param).then(success).catch(fail);
};

// 유저페이지 내 장터 보기
export const UserPageItem = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/social/user-page/items?user-id=${}`, param).then(success).catch(fail);
};

// 팔로워 목록조회
export const UserPageFollower = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/social/user-page/followers?user-id=${}`, param).then(success).catch(fail);
};

// 팔로잉 목록조회
export const UserPageFollowing = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/social/user-page/followings?user-id=${}`, param).then(success).catch(fail);
};

// 팔로우
export const UserFollow = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/social/follow`, param).then(success).catch(fail);
};

// 팔로우 삭제
export const UserFollowCancel = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/social/follow`, param).then(success).catch(fail);
};

// 피드 내역 가져오기
export const SnsFeedList = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/list?user-id=${}`, param).then(success).catch(fail);
};

// 피드 작성
export const SnsFeedWrite = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/write`, param).then(success).catch(fail);
};

// 피드 작성시 루틴가져오기
export const SnsFeedGetRoutine = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/my-routine`, param).then(success).catch(fail);
};

// 피드 수정
export const SnsFeedModify = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/${}`, param).then(success).catch(fail);
};

// 피드 삭제
export const SnsFeedDel = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/${}`, param).then(success).catch(fail);
};

// 피드 좋아요 리스트
export const SnsFeedLikeList = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/${}/like`, param).then(success).catch(fail);
};

// 피드 좋아요 추가
export const SnsFeedLike = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/${}/like`, param).then(success).catch(fail);
};

// 피드 좋아요 제거
export const SnsFeedLikeCancel = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/${}/like`, param).then(success).catch(fail);
};

// 피드의 루틴 불러오기
export const SnsFeedListRoutine = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/${}/routine`, param).then(success).catch(fail);
};

// 불러온 루틴 저장?

// 피드 댓글 목록
export const SnsCommentList = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/${}/comment`, param).then(success).catch(fail);
};

// 피드 댓글 작성
export const SnsCommentWrite = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/${}/comment`, param).then(success).catch(fail);
};

// 피드 댓글 목록
export const SnsCommentModify = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/comment/${}`, param).then(success).catch(fail);
};

// 피드 댓글 삭제
export const SnsCommentDel = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/feed/comment/${}`, param).then(success).catch(fail);
};

// 중고마켓 목록 조회
export const SnsItemList = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/item/list?user_id=${}`, param).then(success).catch(fail);
};

// 물건 상세
export const SnsItemDetail = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/item/${}`, param).then(success).catch(fail);
};

// 물건 좋아요
export const SnsItemLike = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/item/${}/like`, param).then(success).catch(fail);
};

// 물건 좋아요 삭제
export const SnsItemLikeCancel = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/item/${}/like`, param).then(success).catch(fail);
};

// 물건 판매 작성
export const SnsItemWrite = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/item/write`, param).then(success).catch(fail);
};

// 물건 판매 수정
export const SnsItemModify = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/item/${}`, param).then(success).catch(fail);
};

// 물건 판매 삭제
export const SnsItemDel = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/item/${}`, param).then(success).catch(fail);
};

// 물건 판매 완료 (상태변경)
export const SnsItemSell = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/item/${}/soldout`, param).then(success).catch(fail);
};

// 채팅방 목록
export const SnsChatList = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/chat`, param).then(success).catch(fail);
};

// 해당 채팅방 메세지 가져오기
export const SnsChat = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/chat/${}/message`, param).then(success).catch(fail);
};

// 메세지 보내기
export const SnsChatSend = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/chat/${}/message`, param).then(success).catch(fail);
};

// 웹소켓 연결
export const SnsChatOn = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/chat/connect`, param).then(success).catch(fail);
};

// 웹소켓 해제
export const SnsChatOff = async (param: UserLogin, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await local.post(`/sns/chat/connect/${}`, param).then(success).catch(fail);
};