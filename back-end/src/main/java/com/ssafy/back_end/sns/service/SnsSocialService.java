package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.model.UserPageDto;
import com.ssafy.back_end.sns.model.UserPageListDto;

import java.util.List;

public interface SnsSocialService {
    List<UserPageDto> getAllUsers();   //유저 전체 조회

    UserPageDto getUserPageInfo(int userId);   //유저페이지 기본정보

    List<UserPageListDto> getUserPageFeeds(int userId);   //유저페이지 피드 썸네일

    List<UserPageListDto> getUserPageItems(int userId);   //유저페이지 중고장터 썸네일

    List<UserPageDto> getUserPageFollowers(int userId);   //유저페이지 팔로워 목록

    List<UserPageDto> getUserPageFollowings(int userId);   //유저페이지 팔로잉 목록

    int isFollowing(int userId, int targetId);   //나와의 팔로우 여부 확인

    int follow(int userId, int targetId);   //팔로우 신청

    int unfollow(int userId, int targetId);   //팔로우 삭제
}