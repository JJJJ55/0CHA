package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.model.FeedDto;
import com.ssafy.back_end.sns.model.FeedInteractionDto;
import com.ssafy.back_end.sns.model.SnsRoutineDto;
import com.ssafy.back_end.sns.model.UserPageDto;

import java.util.List;

public interface SnsFeedService {
    List<FeedDto> getFeeds(int myId, int userId, int offset, int limit);   //특정 유저 피드 모두 보기

    SnsRoutineDto getMyRoutine(int userId);   //오늘 내 완료한 루틴 가져오기

    SnsRoutineDto getRoutine(int feedId);   //피드에서 루틴 자세히 보기

    int setUpload( int routineId);   //루틴을 업로드 상태로 변경

    int saveRoutine(int userId, int routineId);   //피드에서 루틴 저장하기

    int writeFeed(FeedDto feedDto);   //피드 작성

    int updateImage(int feedId, String image);   //사진 수정(등록)

    int updateFeed(FeedDto feedDto);   //피드 수정

    int deleteFeed(int feedId);   //피드 삭제

    List<UserPageDto> getListLikes(int feedId);   //피드 좋아요 목록 조회

    int isLike(int feedId, int userId);   //내가 좋아요 눌렀는지 확인

    int likeFeed(int feedId, int userId);   //피드 좋아요

    int dislikeFeed(int feedId, int userId);   //피드 좋아요 취소

    List<FeedInteractionDto> getListComments(int feedId);   //피드 댓글 모두 보기

    int writeComment(FeedInteractionDto feedInteractionDto);   //댓글 작성

    int updateComment(FeedInteractionDto feedInteractionDto);   //댓글 수정

    int deleteComment(int feedId);   //댓글 삭제

    void validateImages(int imageN);   //이미지 유효성 검사

    int getUserIdByFeedId(int feedId);   //피드아이디로 유저아이디 조회
}
