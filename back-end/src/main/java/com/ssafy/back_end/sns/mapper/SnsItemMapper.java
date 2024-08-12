package com.ssafy.back_end.sns.mapper;

import com.ssafy.back_end.sns.model.ItemDetailDto;
import com.ssafy.back_end.sns.model.ItemDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SnsItemMapper {
    List<ItemDto> getItems(@Param ("myId") int myId, @Param ("userId") int userId,
                           @Param("district") String district, @Param("siGunGu") String siGunGu, @Param("title") String title,
                           @Param ("offset") int offset, @Param ("limit") int limit);   //특정 유저 중고장터 모두 보기

    ItemDto getItemDetail(@Param ("myId") int myId, @Param ("itemId") int itemId);   //중고장터 자세히 보기

    @Options (useGeneratedKeys = true, keyProperty = "id")
    int insertItem(ItemDto item);   // 중고장터 글 작성

    int insertItemImage(ItemDetailDto itemDetailDto);   // 중고장터 이미지 등록

    int deleteItemImage(@Param ("imageUrl") String imageUrl);   // 중고장터 이미지 삭제

    int updateItem(ItemDto item);   // 중고장터 글 수정

    int deleteItem(@Param ("id") int itemId);   //중고장터 삭제

    List<String> getImagePathsByItemId(@Param("itemId") int itemId);   // 삭제할 게시물의 이미지 경로 가져옴

    int deleteItemDetail(@Param("itemId") int itemId); // 해당 게시물 좋아요 및 이미지 정보 삭제

    int isLike(@Param ("itemId") int itemId, @Param ("userId") int userId);   //내가 좋아요 눌렀는지 확 인

    int likeItem(@Param ("itemId") int itemId, @Param ("userId") int userId);   //중고장터 좋아요

    int dislikeItem(@Param ("itemId") int itemId, @Param ("userId") int userId);   //중고장터 좋아요 취소

    int soldOut(@Param ("id") int itemId);   //판매완료
}
