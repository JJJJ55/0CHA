package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.model.ItemDto;

import java.util.List;

public interface SnsItemService {

    int writeItem(ItemDto item, List<String> images);   //중고장터 작성

    int updateItem(ItemDto item, List<String> images);   //중고장터 수정

    int deleteItem(int itemId);   //중고장터 삭제

    int isLike(int itemId, int userId);   //내가 좋아요 눌렀는지 확 인

    int likeItem(int itemId, int userId);   //중고장터 좋아요

    int dislikeItem(int itemId, int userId);   //중고장터 좋아요 취소
}
