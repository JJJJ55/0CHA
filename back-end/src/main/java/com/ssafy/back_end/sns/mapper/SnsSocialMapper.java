package com.ssafy.back_end.sns.mapper;

import com.ssafy.back_end.sns.model.UserPageDto;
import com.ssafy.back_end.sns.model.UserPageListDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SnsSocialMapper {
    List<UserPageDto> getAllUsers();   //유저정보 전체조회

    UserPageDto getUserPageInfo(@Param ("userId") int userId);   //유저페이지 기본정보

    List<UserPageListDto> getUserPageFeeds(@Param ("userId") int userId);   //유저페이지 피드 썸네일

    List<UserPageListDto> getUserPageItems(@Param ("userId") int userId);   //유저페이지 중고장터 썸네일

    List<UserPageDto> getUserPageFollowers(@Param ("userId") int userId);   //유저페이지 팔로워 목록

    List<UserPageDto> getUserPageFollowings(@Param ("userId") int userId);   //유저페이지 팔로잉 목록

    int isFollowing(@Param ("followerId") int followerId, @Param ("followedId") int followedId);   //나와의 팔로우 여부 확인

    int follow(@Param ("followerId") int followerId, @Param ("followedId") int followedId);   //팔로우 신청

    int unfollow(@Param ("followerId") int followerId, @Param ("followedId") int followedId);   //팔로우 삭제
}
