package com.ssafy.back_end.sns.mapper;

import com.ssafy.back_end.sns.model.FeedDto;
import com.ssafy.back_end.sns.model.FeedInteractionDto;
import com.ssafy.back_end.sns.model.UserPageListDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SnsFeedMapper {

    List<FeedDto> getFeeds(@Param("userId") int userId);

    int writeFeed(FeedDto feedDto);

    int updateFeed(FeedDto feedDto);

    int deleteFeed(@Param("id") int feedId);

    List<UserPageListDto> getListLikes(@Param("id") int feedId);

    int isLike(@Param("id") int feedId, @Param("userId") int userId);

    int likeFeed(@Param("id") int feedId, @Param("userId") int userId);

    int dislikeFeed(@Param("id") int feedId, @Param("userId") int userId);

    List<FeedInteractionDto> getListComments(@Param("id") int feedId);

    int writeComment(FeedInteractionDto feedInteractionDto);

    int updateComment(FeedInteractionDto feedInteractionDto);

    int deleteComment(@Param("id") int feedId);
}
