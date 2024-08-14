package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.sns.mapper.SnsChatMessageMapper;
import com.ssafy.back_end.sns.mapper.SnsChatRoomMapper;
import com.ssafy.back_end.sns.model.MessageDto;
import com.ssafy.back_end.sns.model.RoomDto;
import com.ssafy.back_end.sns.model.UserJoinRoomDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnsChatServiceImpl implements SnsChatService{

    @Autowired
    private SnsChatRoomMapper snsChatRoomMapper;

    @Autowired
    private SnsChatMessageMapper snsChatMessageMapper;

    @Override
    public List<MessageDto> getMessageHistory(int roomId) {
        return snsChatMessageMapper.findByRoomId(roomId);
    }

    @Override
    public MessageDto saveMessage(int senderId, int roomId, String message) {

        MessageDto messageDto = new MessageDto();
        messageDto.setSenderId(senderId);
        messageDto.setRoomId(roomId);
        messageDto.setMessage(message);

        snsChatMessageMapper.saveMessage(messageDto);
        return messageDto;
    }

    @Override
    public int getOrCreateRoom(int senderId, int receiverId) {
        RoomDto room = snsChatRoomMapper.findByUsers(senderId, receiverId);

        System.out.println(room);

        if (room == null) {
            RoomDto newRoom = new RoomDto();
            newRoom.setUser1Id(senderId);
            newRoom.setUser2Id(receiverId);
            snsChatRoomMapper.insertRoom(newRoom);
            return newRoom.getId();
        }

        return room.getId();
    }

    @Override
    public List<UserDto> getUsersExcludeMe(int excludeUserId) {
        return snsChatRoomMapper.findAllUsers().stream()
                .filter(user -> user.getId() != excludeUserId)
                .toList();
    }

    @Override
    public List<UserJoinRoomDto> getLastMessageList(int myId) {
        return snsChatMessageMapper.getLastMessageList(myId);
    }
}
