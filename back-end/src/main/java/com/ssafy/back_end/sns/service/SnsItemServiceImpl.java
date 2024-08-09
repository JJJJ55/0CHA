package com.ssafy.back_end.sns.service;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.ssafy.back_end.sns.mapper.SnsItemMapper;
import com.ssafy.back_end.sns.model.ItemDetailDto;
import com.ssafy.back_end.sns.model.ItemDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SnsItemServiceImpl implements SnsItemService {

    private static final Logger log = LoggerFactory.getLogger(SnsItemServiceImpl.class);
    private final SnsItemMapper snsItemMapper;

    @Autowired
    public SnsItemServiceImpl(SnsItemMapper snsItemMapper) {
        this.snsItemMapper = snsItemMapper;
    }

    @Override
    public List<ItemDto> getItems(int myId, int userId, String district, String siGunGu, String title, int offset, int limit) {
        return snsItemMapper.getItems(myId, userId, district,siGunGu, title, offset, limit);
    }

    @Override
    public ItemDto getItemDetail(int myId, int itemId) {
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

        log.debug(String.valueOf(item));

        snsItemMapper.insertItem(itemBuilder);
//        if (item.getImages() != null && !item.getImages().isEmpty()) {
//            snsItemMapper.insertItemImages(itemBuilder.getId(), item.getUserId(), item.getImages());
//        }

        return itemBuilder.getId();
    }

    @Override
    public void saveImageDetail(int itemId, int userId, String imageUrl, String originName, String saveName) {
        ItemDetailDto itemDetailDto = ItemDetailDto.builder()
                .itemId(itemId)
                .userId(userId)
                .detailType("image")
                .imageUrl(imageUrl)
                .originName(originName)
                .saveName(saveName)
                .build();

        snsItemMapper.insertItemImage(itemDetailDto);
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

//        if (item.getImages() != null && !item.getImages().isEmpty()) {
//            snsItemMapper.deleteItemImages(item.getId());
//            snsItemMapper.insertItemImages(item.getId(), item.getUserId(), item.getImages());
//        }

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
    public void validateImages(List<MultipartFile> images) {
        if (images == null || images.isEmpty()) {
            throw new IllegalArgumentException("At least one image is required.");
        }
        if (images.size() >= 5) {
            throw new IllegalArgumentException("A maximum of 5 images are allowed.");
        }
    }

}
