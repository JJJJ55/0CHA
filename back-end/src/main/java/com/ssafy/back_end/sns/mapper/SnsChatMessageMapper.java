package com.ssafy.back_end.sns.mapper;

import com.ssafy.back_end.sns.model.MessageDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SnsChatMessageMapper {

    @Insert("INSERT INTO messages (sender_id, room_id, message) VALUES (#{senderId}, #{roomId}, #{message})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(MessageDto message);

    // 특정 채팅방 메시지 모두 가져오기
    @Select("SELECT * FROM messages WHERE room_id = #{roomId}")
    List<MessageDto> findByRoomId(int roomId);
}
