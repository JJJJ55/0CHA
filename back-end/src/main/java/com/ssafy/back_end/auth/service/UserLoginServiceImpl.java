package com.ssafy.back_end.auth.service;

import com.ssafy.back_end.auth.mapper.UserLoginMapper;
import com.ssafy.back_end.auth.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLoginServiceImpl implements UserLoginService {
    private final UserLoginMapper userLoginMapper;

    @Autowired
    public UserLoginServiceImpl(UserLoginMapper userLoginMapper) {
        this.userLoginMapper = userLoginMapper;
    }

    @Override
    public UserDto login(UserDto userDto) {
        UserDto user = UserDto.builder()
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .build();
        return userLoginMapper.login(user);
    }

//    @Override
//    public String loginRefresh(UserDto userDto) {
//
//    }
//
//    @Override
//    public String social(UserDto userDto) {
//
//    }
//
//    @Override
//    public String socalToken(UserDto userDto) {
//
//    }

}



