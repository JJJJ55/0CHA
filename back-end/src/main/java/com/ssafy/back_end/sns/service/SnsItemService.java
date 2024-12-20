package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.model.ItemDto;

import java.util.List;

public interface SnsItemService {
    List<ItemDto> getItems(int myId, int userId, String district, String siGunGu, String title, int offset, int limit);   //특정 유저 중고장터 모두 보기

    ItemDto getItemDetail(int myId, int itemId);   //중고장터 자세히 보기

    int writeItem(ItemDto item);   //중고장터 작성

    void saveImageDetail(int itemId, int userId, String imageUrl, String originalName, String saveName);  //게시글 이미지 등록

    int deleteImagesByImageUrl(List<String> imageUrls);

    List<String> getRemainingImageUrls(int itemId);  // 해당 게시물 남은 이미지 url 가져옴

    int updateItem(ItemDto item);   //중고장터 수정

    int deleteItem(int itemId);   //중고장터 삭제

    int isLike(int itemId, int userId);   //내가 좋아요 눌렀는지 확 인

    int likeItem(int itemId, int userId);   //중고장터 좋아요

    int dislikeItem(int itemId, int userId);   //중고장터 좋아요 취소

    int soldOut(int itemId);   //판매완료

    void validateImages(int imageN);   //이미지 유효성 검사

    int getUserIdByItemId(int itemId);   //중고장터 아이디로 유저 아이디 얻기
}
