package com.ssafy.back_end.auth.service;

import com.ssafy.back_end.auth.mapper.UserModifyMapper;
import com.ssafy.back_end.auth.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserModifyServiceImpl implements UserModifyService {
    private final UserModifyMapper userModifyMapper;

    @Autowired
    public UserModifyServiceImpl(UserModifyMapper userModifyMapper) {
        this.userModifyMapper = userModifyMapper;
    }

    @Override
    public String findEmail(UserDto userDto) {
        UserDto user = UserDto.builder()
                .name(userDto.getName())
                .phone(userDto.getPhone())
                .build();
        return userModifyMapper.findEmail(user);
    }

    @Override
    public int findPassword(UserDto userDto) {
        UserDto user = UserDto.builder()
                .email(userDto.getEmail())
                .name(userDto.getName())
                .phone(userDto.getPhone())
                .build();
        return userModifyMapper.findPassword(user);
    }

    @Override
    public int resetPassword(UserDto userDto) {
        UserDto user = UserDto.builder()
                .password(userDto.getPassword())
                .email(userDto.getEmail())
                .build();
        return userModifyMapper.resetPassword(user);
    }
}
