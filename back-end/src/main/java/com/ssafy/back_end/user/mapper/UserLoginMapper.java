package com.ssafy.back_end.user.mapper;

import com.ssafy.back_end.user.model.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserLoginMapper {
    String login(UserDto userDto);   //로그인
    boolean logout(UserDto userDto);   //로그아웃
    String loginAuth(UserDto userDto);   //회원인증
    String loginRefresh(UserDto userDto);   //액세스 토큰 재발급
    String social(UserDto userDto);   //소셜 로그인
    String socalAuth(UserDto userDto);   //소셜 로그인 회원인증

    String findEamil(UserDto userDto);   //이메일 찾기
    boolean findPassword(UserDto userDto);   //비밀번호 찾기
    boolean findPasswordAuth(UserDto userDto);   //비밀번호 이메일 인증
    boolean resetPassword(UserDto userDto);   //비밀번호 초기화
}
