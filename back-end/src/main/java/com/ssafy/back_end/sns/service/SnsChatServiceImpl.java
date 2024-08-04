package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.sns.mapper.SnsChatMessageMapper;
import com.ssafy.back_end.sns.mapper.SnsChatRoomMapper;
import com.ssafy.back_end.sns.model.MessageDto;
import com.ssafy.back_end.sns.model.RoomDto;
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
    public MessageDto saveMessage(int senderId, int receiverId, String message) {
        int roomId = getOrCreateRoom(senderId, receiverId);

        MessageDto messageDto = new MessageDto();
        messageDto.setSenderId(senderId);
        messageDto.setRoomId(roomId);
        messageDto.setMessage(message);

        snsChatMessageMapper.insert(messageDto);
        return messageDto;
    }

    @Override
    public int getOrCreateRoom(int senderId, int receiverId) {
        RoomDto room = snsChatRoomMapper.findByUsers(senderId, receiverId);

        if (room == null) {
            RoomDto newRoom = new RoomDto();
            newRoom.setUser1Id(senderId);
            newRoom.setUser2Id(receiverId);
            snsChatRoomMapper.insert(newRoom);
            return newRoom.getId();
        }

        return room.getId();
    }
}
