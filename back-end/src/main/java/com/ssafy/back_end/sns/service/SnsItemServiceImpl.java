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
    public List<ItemDto> getItems(int userId) {
        return snsItemMapper.getItems(userId);
    }

    @Override
    public ItemDto getItemDetail(int itemId) {
        return snsItemMapper.getItemDetail(itemId);
    }

    @Override
    @Transactional
    public int writeItem(ItemDto item, List<String> images) {
        ItemDto itemBuilder = ItemDto.builder()
                .title(item.getTitle())
                .price(item.getPrice())
                .content(item.getContent())
                .userId(item.getUserId())
                .createdAt(item.getCreatedAt())
                .build();

        snsItemMapper.insertItem(item);

        if (!images.isEmpty()) {
            snsItemMapper.insertItemImages(item.getId(), images);
        }

        return item.getId();
    }

    @Override
    @Transactional
    public int updateItem(ItemDto item, List<String> images) {
        ItemDto itemBuilder = ItemDto.builder()
                .title(item.getTitle())
                .price(item.getPrice())
                .content(item.getContent())
                .updatedAt(item.getUpdatedAt())
                .id(item.getId())
                .build();

        snsItemMapper.updateItem(itemBuilder);
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
