package com.ssafy.back_end.sns.mapper;

import com.ssafy.back_end.sns.model.UserPageDto;
import com.ssafy.back_end.sns.model.UserPageListDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SnsSocialMapper {
    UserPageDto getUserPageInfo(@Param ("userId") int userId);

    List<UserPageListDto> getUserPageFeeds(@Param ("userId") int userId);

    List<UserPageListDto> getUserPageItems(@Param ("userId") int userId);

    List<UserPageDto> getUserPageFollowers(@Param ("userId") int userId);

    List<UserPageDto> getUserPageFollowings(@Param ("userId") int userId);

    int isFollowing(@Param("followerId") int followerId, @Param("followedId") int followedId);

    int follow(@Param("followerId") int followerId, @Param("followedId") int followedId);

    int unfollow(@Param("followerId") int followerId, @Param("followedId") int followedId);
}
