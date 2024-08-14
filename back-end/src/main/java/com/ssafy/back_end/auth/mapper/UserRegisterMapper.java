package com.ssafy.back_end.auth.mapper;

import com.ssafy.back_end.auth.model.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface UserRegisterMapper {
    @Options (useGeneratedKeys = true, keyProperty = "id")
    int register(UserDto userDto);   //회원가입

    int userInfo(UserDto userDto);   //추가정보 입력

    int checkEmail(String email);   //이메일 인증번호 발송

    int checkNickname(String nickname);   //닉네임 중복체크

    UserDto findByEmail(String email);   //이메일로 UserDto 조회
}
