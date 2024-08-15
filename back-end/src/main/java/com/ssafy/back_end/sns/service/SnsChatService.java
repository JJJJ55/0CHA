package com.ssafy.back_end.sns.service;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.sns.model.MessageDto;
import com.ssafy.back_end.sns.model.UserJoinRoomDto;

import java.util.List;

public interface SnsChatService {
    public List<MessageDto> getMessageHistory(int roomId);
    public MessageDto saveMessage(int senderId, int roomId, String message);
    public int getOrCreateRoom(int senderId, int receiverId);
    public List<UserDto> getUsersExcludeMe(int excludeUserId);
    List<UserJoinRoomDto> getLastMessageList(int myId); // 내가 참여한 채팅방의 가장 마지막 메시지 목록
}
