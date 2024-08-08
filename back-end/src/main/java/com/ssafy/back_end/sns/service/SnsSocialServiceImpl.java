package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.mapper.SnsSocialMapper;
import com.ssafy.back_end.sns.model.UserPageDto;
import com.ssafy.back_end.sns.model.UserPageListDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnsSocialServiceImpl implements SnsSocialService {

    private final SnsSocialMapper snsSocialMapper;

    @Autowired
    public SnsSocialServiceImpl(SnsSocialMapper snsSocialMapper) {
        this.snsSocialMapper = snsSocialMapper;
    }

    @Override
    public List<UserPageDto> getAllUsers() {
        return snsSocialMapper.getAllUsers();
    }

    @Override
    public UserPageDto getUserPageInfo(int userId) {
        return snsSocialMapper.getUserPageInfo(userId);
    }

    @Override
    public List<UserPageListDto> getUserPageFeeds(int userId) {
        return snsSocialMapper.getUserPageFeeds(userId);
    }

    @Override
    public List<UserPageListDto> getUserPageItems(int userId) {
        return snsSocialMapper.getUserPageItems(userId);
    }

    @Override
    public List<UserPageDto> getUserPageFollowers(int userId) {
        return snsSocialMapper.getUserPageFollowers(userId);
    }

    @Override
    public List<UserPageDto> getUserPageFollowings(int userId) {
        return snsSocialMapper.getUserPageFollowings(userId);
    }

    @Override
    public int isFollowing(int userId, int targetId) {
        return snsSocialMapper.isFollowing(userId, targetId);
    }

    @Override
    public int follow(int userId, int targetId) {
        return snsSocialMapper.follow(userId, targetId);
    }

    @Override
    public int unfollow(int userId, int targetId) {
        return snsSocialMapper.unfollow(userId, targetId);
    }
}
