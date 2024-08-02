package com.ssafy.back_end.auth.mapper;

import com.ssafy.back_end.auth.model.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserLoginMapper {
    UserDto login(UserDto userDto);   //로그인

    void storeRefreshToken(@Param("id") int userId, @Param("refreshToken") String token);   //리프레쉬 토큰 저장

    void invalidateRefreshToken(@Param("id") int userId);   ////리프레시 토큰 삭제

    String social(UserDto userDto);   //소셜 로그인

    String socalToken(UserDto userDto);   //소셜 로그인 회원인증
}
