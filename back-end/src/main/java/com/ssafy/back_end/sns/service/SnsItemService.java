package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.model.ItemDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SnsItemService {
    List<ItemDto> getItems(int myId, int userId,String district, String siGunGu, String title, int offset, int limit);   //특정 유저 중고장터 모두 보기

    ItemDto getItemDetail(int myId, int itemId);   //중고장터 자세히 보기

    int writeItem(ItemDto item);   //중고장터 작성

    int updateItem(ItemDto item);   //중고장터 수정

    int deleteItem(int itemId);   //중고장터 삭제

    int isLike(int itemId, int userId);   //내가 좋아요 눌렀는지 확 인

    int likeItem(int itemId, int userId);   //중고장터 좋아요

    int dislikeItem(int itemId, int userId);   //중고장터 좋아요 취소

    int soldOut(int itemId);   //판매완료

    void validateImages(List<MultipartFile> images);   //이미지 유효성 검사

    List<String> uploadImages(int id, List<MultipartFile> files, String remoteDir);
}
