package com.ssafy.back_end.sns.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SnsItemMapper {
//    List<ItemDto> getItems(@Param ("userId") int userId);   //특정 유저 중고장터 모두 보기
//
//    ItemDto getItem(@Param ("userId") int userId);   //중고장터 자세히
//
//    int writeItem(ItemDto itemDto);   //중고장터 작성
//
//    int writeItemImages(ItemDto itemDto);   //중고장터 작성
//
//    int updateItem(ItemDto itemDto);   //중고장터 수정

    int deleteItem(@Param ("id") int itemId);   //중고장터 삭제

    int isLike(@Param ("itemId") int itemId, @Param ("userId") int userId);   //내가 좋아요 눌렀는지 확 인

    int likeItem(@Param ("itemId") int itemId, @Param ("userId") int userId);   //중고장터 좋아요

    int dislikeItem(@Param ("itemId") int itemId, @Param ("userId") int userId);   //중고장터 좋아요 취소
}
