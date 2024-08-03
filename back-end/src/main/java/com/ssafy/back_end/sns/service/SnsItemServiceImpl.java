package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.mapper.SnsItemMapper;
import com.ssafy.back_end.sns.model.ItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SnsItemServiceImpl implements SnsItemService {

    private final SnsItemMapper snsItemMapper;

    @Autowired
    public SnsItemServiceImpl(SnsItemMapper snsItemMapper) {
        this.snsItemMapper = snsItemMapper;
    }

    @Override
    @Transactional
    public int writeItem(ItemDto item, List<String> images) {
        snsItemMapper.insertItem(item);

        if (!images.isEmpty()) {
            snsItemMapper.insertItemImages(item.getId(), images);
        }

        return item.getId();
    }

    @Override
    @Transactional
    public int updateItem(ItemDto item, List<String> images) {

//        SET title = #{title}, price = #{price}, content = #{content}, updated_at = NOW()
//        WHERE id = #{id};
//
//        FeedInteractionDto comment = FeedInteractionDto.builder()
//                .feedId(feedInteractionDto.getFeedId())
//                .userId(feedInteractionDto.getUserId())
//                .comment(feedInteractionDto.getComment())
//                .build();
        snsItemMapper.updateItem(item);
        snsItemMapper.deleteItemImages(item.getId());

        if (!images.isEmpty()) {
            snsItemMapper.insertItemImages(item.getId(), images);
        }

        return item.getId();
    }

    @Override
    public int deleteItem(int itemId) {
        return snsItemMapper.deleteItem(itemId);
    }

    @Override
    public int isLike(int itemId, int userId) {
        return snsItemMapper.isLike(itemId, userId);
    }

    @Override
    public int likeItem(int itemId, int userId) {
        return snsItemMapper.likeItem(itemId, userId);
    }

    @Override
    public int dislikeItem(int itemId, int userId) {
        return snsItemMapper.dislikeItem(itemId, userId);
    }
}
