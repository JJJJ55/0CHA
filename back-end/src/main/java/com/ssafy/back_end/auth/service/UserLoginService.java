package com.ssafy.back_end.auth.service;

import com.ssafy.back_end.auth.model.UserDto;
import org.apache.ibatis.annotations.Param;

public interface UserLoginService {
    UserDto login(UserDto userDto);  // 로그인

    void storeRefreshToken(int userId, String token);  // 리프레시 토큰 저장

    void invalidateRefreshToken(int userId);  // 리프레시 토큰 삭제

    int getUserIdByRefreshToken(String refreshToken);  // 리프레시 토큰으로 사용자 조회

    String getRefreshTokenByUserId(@Param("id") int userId);  // 리프레시 토큰 조회
}
