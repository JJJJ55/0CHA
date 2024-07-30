package com.ssafy.back_end.auth.service;

import com.ssafy.back_end.auth.mapper.UserRegisterMapper;
import com.ssafy.back_end.auth.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRegisterServiceImpl implements UserRegisterService {
    private final UserRegisterMapper userRegisterMapper;

    @Autowired
    public UserRegisterServiceImpl(UserRegisterMapper userRegisterMapper) {
        this.userRegisterMapper = userRegisterMapper;
    }

    @Override
    public int register(UserDto userDto) {
        UserDto user = UserDto.builder()
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .name(userDto.getName())
                .nickname(userDto.getNickname())
                .phone(userDto.getPhone())
                .birth(userDto.getBirth())
                .build();
        return userRegisterMapper.register(user);
    }

    @Override
    public int checkEmail(String email) {
        return userRegisterMapper.checkEmail(email);
    }

    @Override
    public int checkNickname(String nickname) {
        return userRegisterMapper.checkNickname(nickname);
    }
}
