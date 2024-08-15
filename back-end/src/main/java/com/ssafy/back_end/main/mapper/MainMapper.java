package com.ssafy.back_end.main.mapper;

import com.ssafy.back_end.main.model.UserInfoDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MainMapper {
    UserInfoDto getUserInfo(@Param("id") int userId);   //유저 정보 조회

    int modifyProfile(@Param("nickname") String nickname, @Param("profileImage") String profileImage,
                      @Param("id") int userId);   //유저 프로필 수정

    String getImagePathsByUserId(@Param("userId") int userId);   //유저 아이디로 프사찾기

    int checkNickname(@Param("nickname") String nickname, @Param("userId") int userId);   //닉네임 중복체크

    int modifyUserInfo(UserInfoDto userInfoDto);   //회원정보 수정

    int modifyPassword(@Param("id") int id, @Param("curPassword") String curPassword,
                       @Param("newPassword") String newPassword);   //패스워드 변경

    int deleteUser(@Param("id") int id);   //회원탈퇴

    void updateFcmToken(@Param("id") int id, @Param("fcmToken") String fcmToken);   //fcm토큰 저장

    String getFcmTokenById(@Param("id") int id);   //유저 id로 fcm토큰 얻기
}
