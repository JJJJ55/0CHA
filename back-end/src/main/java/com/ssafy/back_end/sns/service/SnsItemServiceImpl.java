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

        log.info("Item details: {}", itemBuilder);

        // 데이터베이스에 삽입 후 ID 반환
        snsItemMapper.insertItem(itemBuilder);

        // insertItem 메서드가 실행된 후, itemBuilder 객체의 ID가 제대로 설정되었는지 확인
        int itemId = itemBuilder.getId();
        if (itemId == 0) {
            throw new IllegalStateException("Item ID 생성 실패");
        }

        // 이미지가 있으면 이미지 삽입 로직 처리
//        if (item.getImages() != null && !item.getImages().isEmpty()) {
//            snsItemMapper.insertItemImages(itemId, item.getUserId(), item.getImages());
//        }

        return itemBuilder.getId();
    }

    @Override
    @Transactional
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
    @Transactional
    public int deleteItem(int itemId) {
        // 1. DB에서 해당 게시물 이미지 경로를 가져옴
        List<String> imagePaths = snsItemMapper.getImagePathsByItemId(itemId);

        // 2. 각 이미지 파일을 호스트 디렉토리에서 삭제
        try {
            for (String imagePath : imagePaths) {
                File file = new File(imagePath);
                if (file.exists()) {
                    if (file.delete()) {
                        log.debug("이미지 파일 삭제 성공, {}", imagePath);
                    } else {
                        log.warn("이미지 파일 삭제 실패, {}", imagePath);
                        throw new RuntimeException("이미지 파일 삭제 실패: " + imagePath);
                    }
                } else {
                    log.warn("이미지 파일이 존재하지 않습니다, {}", imagePath);
                    throw new RuntimeException("이미지 파일이 존재하지 않음: " + imagePath);
                }
            }

            // 3. 데이터베이스에서 이미지 및 좋아요 정보 삭제
            if (snsItemMapper.deleteItemDetail(itemId) > 0) {
                log.debug("게시물 이미지 및 좋아요 정보 삭제 성공, {}", itemId);
            } else {
                log.error("게시물 이미지 및 좋아요 정보 삭제 실패, {}", itemId);
                throw new RuntimeException("게시물 상세 정보 삭제 실패: " + itemId);
            }

            return snsItemMapper.deleteItem(itemId);

        } catch (Exception e) {
            log.error("게시물 삭제 중 오류 발생: {}", e.getMessage());
            throw e;  // 트랜잭션 롤백을 위해 예외를 다시 던짐
        }
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
