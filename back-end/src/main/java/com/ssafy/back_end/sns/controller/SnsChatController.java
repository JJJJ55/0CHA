package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.sns.model.MessageDto;
import com.ssafy.back_end.sns.model.UserJoinRoomDto;
import com.ssafy.back_end.sns.service.SnsChatService;
import com.ssafy.back_end.redis.service.RedisMessagePublisher;
import com.ssafy.back_end.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/sns/chat")
public class SnsChatController {

    private final Logger logger = LoggerFactory.getLogger(SnsChatController.class);

    private final JwtUtil jwtUtil = new JwtUtil();

    @Autowired
    private SnsChatService snsChatService;

    @Autowired
    private RedisMessagePublisher redisMessagePublisher;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @Operation(summary = "채팅한 목록 가져오기")
    @GetMapping("/last-message-list")
    @ResponseBody
    public List<UserJoinRoomDto> getLastMessageList(HttpServletRequest request) {
        int myId = (Integer)request.getAttribute("userId");
        logger.info("Fetching myId: {}", myId);

        List<UserJoinRoomDto> lastMessageList = snsChatService.getLastMessageList(myId);
        logger.info("Retrieved myId {}: {}", myId, lastMessageList);

        return lastMessageList;
    }

    // 채팅방 생성
    // 채팅방이 없으면 채팅방 생성 or 이미 존재하면 해당 채팅방 식별 ID 리턴
    @Operation(summary = "채팅방이 없으면 채팅방 생성 or 이미 존재하면 해당 채팅방 식별 ID 리턴 - 완")
    @GetMapping("/createRoom")
    @ResponseBody
    public int createRoom(HttpServletRequest request, @RequestParam int receiverId) {
        int senderId = (Integer)request.getAttribute("userId");
        logger.info("Creating room with senderId: {} and receiverId: {}", senderId, receiverId);

        int roomId = snsChatService.getOrCreateRoom(senderId, receiverId);
        logger.info("Room created or retrieved with ID: {}", roomId);

        return roomId;
    }

    // 특정 채팅방의 메시지 히스토리 가져옴
    @Operation(summary = "특정 채팅방의 메시지 히스토리 가져오기 - 완")
    @GetMapping("/history")
    @ResponseBody
    public List<MessageDto> getMessageHistory(@RequestParam int roomId) {
        logger.info("Fetching message history for roomId: {}", roomId);

        List<MessageDto> history = snsChatService.getMessageHistory(roomId);
        logger.info("Retrieved message history for roomId {}: {}", roomId, history);

        return history;
    }

    // 메시지 수신 및 발송
    @MessageMapping("/chat/{joinRoomId}")
//    @SendTo("/topic/chat/{joinRoomId}")
    public void sendMessage(HttpServletRequest request, @DestinationVariable String joinRoomId, MessageDto message) {
        int senderId = (Integer)request.getAttribute("userId");
        logger.debug("senderId : {}", senderId);
        logger.debug("joinRoomId : {}", joinRoomId);
        logger.debug("Received message: {}", message);

        // 메시지 저장
        MessageDto savedMessage = snsChatService.saveMessage(
                senderId,
                message.getRoomId(),
                message.getMessage()
        );

        logger.info("Saved message: {}", savedMessage);


        // Redis로 메시지 퍼블리시
        redisMessagePublisher.publish("/topic/chat/" + joinRoomId, savedMessage);
        logger.info("Published message to Redis: {}", savedMessage);
    }
}