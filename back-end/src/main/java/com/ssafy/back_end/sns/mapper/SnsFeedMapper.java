package com.ssafy.back_end.sns.mapper;

import com.ssafy.back_end.sns.model.FeedDto;
import com.ssafy.back_end.sns.model.FeedInteractionDto;
import com.ssafy.back_end.sns.model.UserPageDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SnsFeedMapper {

    List<FeedDto> getFeeds(@Param ("userId") int userId);   //특정 유저 피드 모두 보기

    int writeFeed(FeedDto feedDto);   //피드 작성

    int updateFeed(FeedDto feedDto);   //피드 수정

    int deleteFeed(@Param ("id") int feedId);   //피드 삭제

    List<UserPageDto> getListLikes(@Param ("feedId") int feedId);   //피드 좋아요 목록 조회

    int isLike(@Param ("feedId") int feedId, @Param ("userId") int userId);   //내가 좋아요 눌렀는지 확인

    int likeFeed(@Param ("feedId") int feedId, @Param ("userId") int userId);   //피드 좋아요

    int dislikeFeed(@Param ("feedId") int feedId, @Param ("userId") int userId);   //피드 좋아요 취소

    List<FeedInteractionDto> getListComments(@Param ("feedId") int feedId);   //피드 댓글 모두 보기

    int writeComment(FeedInteractionDto feedInteractionDto);   //댓글 작성

    int updateComment(FeedInteractionDto feedInteractionDto);   //댓굴 수정

    int deleteComment(@Param ("id") int id);   //댓글 삭제
}
