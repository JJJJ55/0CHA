package com.ssafy.back_end.main.service;

import com.ssafy.back_end.main.mapper.MainMapper;
import com.ssafy.back_end.main.model.UserInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainServiceImpl implements MainService {

    private final MainMapper mainMapper;

    @Autowired
    public MainServiceImpl(MainMapper mainMapper) {
        this.mainMapper = mainMapper;
    }

    @Override
    public UserInfoDto getUserInfo(int userId) {
        return mainMapper.getUserInfo(userId);
    }

    @Override
    public int modifyProfile(String nickname, String profileImage, int userId) {
        return mainMapper.modifyProfile(nickname, profileImage, userId);
    }

    @Override
    public int checkNickname(String nickname) {
        return mainMapper.checkNickname(nickname);
    }

    @Override
    public int modifyUserInfo(UserInfoDto userInfoDto) {
        UserInfoDto user = UserInfoDto.builder()
                .height(userInfoDto.getHeight())
                .weight(userInfoDto.getWeight())
                .district(userInfoDto.getDistrict())
                .siGunGu(userInfoDto.getSiGunGu())
                .id(userInfoDto.getId())
                .build();

        return mainMapper.modifyUserInfo(user);
    }

    @Override
    public int modifyPassword(int id, String curPassword, String newPassword) {
        return mainMapper.modifyPassword(id, curPassword, newPassword);
    }

    @Override
    public int deleteUser(int id) {
        return mainMapper.deleteUser(id);
    }
}
