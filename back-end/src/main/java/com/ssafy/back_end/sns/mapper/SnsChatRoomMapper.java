package com.ssafy.back_end.sns.mapper;

import com.ssafy.back_end.sns.model.RoomDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface SnsChatRoomMapper {

    @Insert("INSERT INTO rooms (user1_id, user2_id) VALUES (#{user1Id}, #{user2Id})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(RoomDto roomDto);

    @Select("SELECT * FROM rooms WHERE (user1_id = #{user1Id} AND user2_id = #{user2Id}) OR (user1_id = #{user2Id} AND user2_id = #{user1Id})")
    RoomDto findByUsers(int user1Id, int user2Id);

    @Select("SELECT * FROM rooms WHERE id = #{id}")
    RoomDto findById(int id);
}
