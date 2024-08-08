package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.sns.model.MessageDto;
import com.ssafy.back_end.sns.service.SnsChatService;
import com.ssafy.back_end.redis.service.RedisMessagePublisher;
import com.ssafy.back_end.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    // 연결 요청 시 더미 유저 ID 반환
    // 나중에 토큰을 받고, 토큰이 맞으면 해당 토큰에서 유저 ID를 반환
    @MessageMapping("/connect")
    @SendTo("/topic/connect")
    public int connect(@Header("Authorization") String token, SimpMessageHeaderAccessor headerAccessor) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Authorization token is missing or empty");
        }
        logger.info("token: {}", token);

        // JWT 유틸리티 클래스를 사용하여 토큰에서 사용자 ID 추출
        int userId = jwtUtil.getUserIdFromAccessToken(token);

        logger.info("User connected with ID: {}", userId);

        // 세션에 토큰 저장
        headerAccessor.getSessionAttributes().put("Authorization", token);

        return userId;
    }

    // 특정 유저를 제외한 모든 유저 리스트 반환
    // 자신을 제외한 채팅 가능한 유저 목록 표시를 위해 사용
    @Operation(summary = "자신을 제외한 채팅 가능한 유저 목록")
    @GetMapping("/users")
    @ResponseBody
    public List<UserDto> getUsers(HttpServletRequest request) {
        int excludeUserId = (Integer)request.getAttribute("userId");
        logger.info("Fetching users excluding userId: {}", excludeUserId);

        List<UserDto> users = snsChatService.getUsersExcludeMe(excludeUserId);
        logger.info("Retrieved users excluding userId {}: {}", excludeUserId, users);

        return users;
    }

    // 채팅방 생성
    // 채팅방이 없으면 채팅방 생성 or 이미 존재하면 해당 채팅방 식별 ID 리턴
    @Operation(summary = "채팅방이 없으면 채팅방 생성 or 이미 존재하면 해당 채팅방 식별 ID 리턴")
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
    @Operation(summary = "특정 채팅방의 메시지 히스토리 가져오기")
    @GetMapping("/history")
    @ResponseBody
    public List<MessageDto> getMessageHistory(@RequestParam int roomId) {
        logger.info("Fetching message history for roomId: {}", roomId);

        List<MessageDto> history = snsChatService.getMessageHistory(roomId);
        logger.info("Retrieved message history for roomId {}: {}", roomId, history);

        return history;
    }

    // 메시지 수신 및 발송
    @MessageMapping("/message")
    public void sendMessage(HttpServletRequest request, MessageDto message) {
        int senderId = (Integer)request.getAttribute("userId");
        logger.info("senderId : {}", senderId);
        logger.info("Received message: {}", message);

        // 메시지 저장
        MessageDto savedMessage = snsChatService.saveMessage(
                senderId,
                message.getRoomId(),
                message.getMessage()
        );

        logger.info("Saved message: {}", savedMessage);

        // Redis로 메시지 퍼블리시
        redisMessagePublisher.publish(savedMessage.getMessage());
        logger.info("Published message to Redis: {}", savedMessage.getMessage());

        // 채팅방의 채널로 메시지 발송
        messagingTemplate.convertAndSend("/queue/messages/room/" + message.getRoomId(), savedMessage);
        logger.info("Sent message to room {}: {}", message.getRoomId(), savedMessage);
    }

}