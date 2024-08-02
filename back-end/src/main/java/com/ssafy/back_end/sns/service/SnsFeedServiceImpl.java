package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.mapper.SnsFeedMapper;
import com.ssafy.back_end.sns.model.FeedDto;
import com.ssafy.back_end.sns.model.FeedInteractionDto;
import com.ssafy.back_end.sns.model.UserPageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnsFeedServiceImpl implements SnsFeedService {

    private final SnsFeedMapper snsFeedMapper;

    @Autowired
    public SnsFeedServiceImpl(SnsFeedMapper snsFeedMapper) {
        this.snsFeedMapper = snsFeedMapper;
    }

    @Override
    public List<FeedDto> getFeeds(int userId) {
        return snsFeedMapper.getFeeds(userId);
    }

    @Override
    public int writeFeed(FeedDto feedDto) {
        FeedDto feed = FeedDto.builder()
                .content(feedDto.getContent())
                .image(feedDto.getImage())
                .routineId(feedDto.getRoutineId())
                .userId(feedDto.getUserId())
                .build();
        return snsFeedMapper.writeFeed(feed);
    }

    @Override
    public int updateFeed(FeedDto feedDto) {
        FeedDto feed = FeedDto.builder()
                .content(feedDto.getContent())
                .image(feedDto.getImage())
                .routineId(feedDto.getRoutineId())
                .id(feedDto.getId())
                .build();
        return snsFeedMapper.updateFeed(feed);
    }

    @Override
    public int deleteFeed(int feedId) {
        return snsFeedMapper.deleteFeed(feedId);
    }

    @Override
    public List<UserPageDto> getListLikes(int feedId) {
        return snsFeedMapper.getListLikes(feedId);
    }

    @Override
    public int isLike(int feedId, int userId) {
        return snsFeedMapper.isLike(feedId, userId);
    }

    @Override
    public int likeFeed(int feedId, int userId) {
        return snsFeedMapper.likeFeed(feedId, userId);
    }

    @Override
    public int dislikeFeed(int feedId, int userId) {
        return snsFeedMapper.dislikeFeed(feedId, userId);
    }

    @Override
    public List<FeedInteractionDto> getListComments(int feedId) {
        return snsFeedMapper.getListComments(feedId);
    }

    @Override
    public int writeComment(FeedInteractionDto feedInteractionDto) {
        FeedInteractionDto comment = FeedInteractionDto.builder()
                .feedId(feedInteractionDto.getFeedId())
                .userId(feedInteractionDto.getUserId())
                .comment(feedInteractionDto.getComment())
                .build();
        return snsFeedMapper.writeComment(comment);
    }

    @Override
    public int updateComment(FeedInteractionDto feedInteractionDto) {
        FeedInteractionDto comment = FeedInteractionDto.builder()
                .comment(feedInteractionDto.getComment())
                .id(feedInteractionDto.getId())
                .build();
        return snsFeedMapper.updateComment(comment);
    }

    @Override
    public int deleteComment(int commentId) {
        return snsFeedMapper.deleteComment(commentId);
    }
}
