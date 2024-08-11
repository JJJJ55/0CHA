package com.ssafy.back_end.sns.mapper;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.sns.model.RoomDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SnsChatRoomMapper {

    // 새로운 방 추가
    void insertRoom(RoomDto roomDto);

    // 유저1, 2의 ID로 채팅방 조회
    RoomDto findByUsers(int user1Id, int user2Id);

    // 방번호로 해당 방 조회
    RoomDto findById(int id);

    // 모든 유저 정보 반환
    List<UserDto> findAllUsers();
}
