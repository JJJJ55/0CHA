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
    public List<ItemDto> getItems(int myId, int userId) {
        return snsItemMapper.getItems(myId,userId);
    }

    @Override
    public ItemDto getItemDetail(int myId,int itemId) {
        return snsItemMapper.getItemDetail(myId, itemId);
    }

    @Override
    @Transactional
    public int writeItem(ItemDto item) {
        validateImages(item.getImages());

        ItemDto itemBuilder = ItemDto.builder()
                .title(item.getTitle())
                .price(item.getPrice())
                .content(item.getContent())
                .userId(item.getUserId())
                .build();

        snsItemMapper.insertItem(itemBuilder);
        if (item.getImages() != null && !item.getImages().isEmpty()) {
            snsItemMapper.insertItemImages(itemBuilder.getId(), item.getUserId(), item.getImages());
        }

        return itemBuilder.getId();
    }

    @Override
    @Transactional
    public int updateItem(ItemDto item) {
        validateImages(item.getImages());

        ItemDto itemBuilder = ItemDto.builder()
                .title(item.getTitle())
                .price(item.getPrice())
                .content(item.getContent())
                .updatedAt(item.getUpdatedAt())
                .id(item.getId())
                .build();

        snsItemMapper.updateItem(itemBuilder);

        if (item.getImages() != null && !item.getImages().isEmpty()) {
            snsItemMapper.deleteItemImages(item.getId());
            snsItemMapper.insertItemImages(item.getId(), item.getUserId(), item.getImages());
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

    @Override
    public int soldOut(int itemId) {
        return snsItemMapper.soldOut(itemId);
    }

    @Override
    public void validateImages(List<String> images) {
        if (images == null || images.isEmpty()) {
            throw new IllegalArgumentException("At least one image is required.");
        }
        if (images.size() >= 5) {
            throw new IllegalArgumentException("A maximum of 5 images are allowed.");
        }
    }

}
