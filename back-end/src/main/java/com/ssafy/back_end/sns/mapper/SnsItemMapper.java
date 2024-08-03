package com.ssafy.back_end.sns.mapper;

import com.ssafy.back_end.sns.model.ItemDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SnsItemMapper {
//    List<ItemDto> getItems(@Param ("userId") int userId);   //특정 유저 중고장터 모두 보기
//
//    ItemDto getItem(@Param ("userId") int userId);   //중고장터 자세히

    int insertItem(ItemDto item);   // 중고장터 글 작성

    int insertItemImages(@Param("itemId") int itemId, @Param("images") List<String> images);   // 중고장터 이미지 등록

    int deleteItemImages(@Param("itemId") int itemId);   // 중고장터 이미지 삭제

    int updateItem(ItemDto item);   // 중고장터 글 수정

    int deleteItem(@Param("id") int itemId);   //중고장터 삭제

    int isLike(@Param("itemId") int itemId, @Param("userId") int userId);   //내가 좋아요 눌렀는지 확 인

    int likeItem(@Param("itemId") int itemId, @Param("userId") int userId);   //중고장터 좋아요

    int dislikeItem(@Param("itemId") int itemId, @Param("userId") int userId);   //중고장터 좋아요 취소
}
