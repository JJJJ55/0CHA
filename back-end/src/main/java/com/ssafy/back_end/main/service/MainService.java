package com.ssafy.back_end.main.service;

import com.ssafy.back_end.main.model.UserInfoDto;

public interface MainService {
    UserInfoDto getUserInfo(int userId);   //유저 정보 조회

    int modifyProfile(String nickname, String profileImage, int userId);   //유저 프로필 수정

    int checkNickname(String nickname);   //닉네임 중복체크

    int modifyUserInfo(UserInfoDto userInfoDto);   //회원정보 수정

    int modifyPassword(int id, String curPassword, String newPassword);   //패스워드 변경

    int deleteUser(int id, String password);   //비밀번호 변경
}
