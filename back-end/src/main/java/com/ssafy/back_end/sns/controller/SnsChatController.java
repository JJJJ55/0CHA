package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.sns.model.MessageDto;
import com.ssafy.back_end.sns.service.SnsChatService;
import com.ssafy.back_end.redis.service.RedisMessagePublisher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CopyOnWriteArrayList;

@Controller
@RequestMapping("/api/sns/chat")
public class SnsChatController {

    private final Logger logger = LoggerFactory.getLogger(SnsChatController.class);

    @Autowired
    private SnsChatService snsChatService;

    @Autowired
    private RedisMessagePublisher redisMessagePublisher;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final List<Integer> dummyUserIds = Arrays.asList(1, 2, 3); // 더미 유저 ID 목록
    private final Random random = new Random();

    // 메시지 수신 및 발송
    @MessageMapping("/message")
    public void sendMessage(MessageDto message) {
        logger.info("Received message: {}", message);
        // 메시지 저장
        MessageDto savedMessage = snsChatService.saveMessage(
                message.getSenderId(),
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

    // 특정 채팅방의 메시지 히스토리 가져옴
    @GetMapping("/history")
    @ResponseBody
    public List<MessageDto> getMessageHistory(@RequestParam int roomId) {
        logger.info("Fetching message history for roomId: {}", roomId);
        List<MessageDto> history = snsChatService.getMessageHistory(roomId);
        logger.info("Retrieved message history for roomId {}: {}", roomId, history);
        return history;
    }

    // SSE 구독
    @GetMapping("/subscribe")
    public SseEmitter subscribe() {
        logger.info("New SSE subscription");
        SseEmitter emitter = new SseEmitter();
        emitters.add(emitter);
        emitter.onCompletion(() -> {
            emitters.remove(emitter);
            logger.info("SSE subscription completed and removed");
        });
        emitter.onTimeout(() -> {
            emitters.remove(emitter);
            logger.warn("SSE subscription timed out and removed");
        });
        return emitter;
    }

    // 연결 요청 시 더미 유저 ID 반환
    @MessageMapping("/connect")
    @SendTo("/topic/connect")
    public int connect() {
        int userId = dummyUserIds.get(random.nextInt(dummyUserIds.size()));
        logger.info("User connected with dummy ID: {}", userId);
        return userId;
    }

    // 특정 유저를 제외한 모든 유저 리스트 반환
    // 자신을 제외한 채팅 가능한 유저 목록 표시를 위해 사용
    @GetMapping("/users")
    @ResponseBody
    public List<UserDto> getUsers(@RequestParam int excludeUserId) {
        logger.info("Fetching users excluding userId: {}", excludeUserId);
        List<UserDto> users = snsChatService.getUsersExcludeMe(excludeUserId);
        logger.info("Retrieved users excluding userId {}: {}", excludeUserId, users);
        return users;
    }

    // 채팅방 생성
    // 채팅방이 없으면 채팅방 생성 or 이미 존재하면 해당 채팅방 식별 ID 리턴
    @GetMapping("/createRoom")
    @ResponseBody
    public int createRoom(@RequestParam int senderId, @RequestParam int receiverId) {
        logger.info("Creating room with senderId: {} and receiverId: {}", senderId, receiverId);
        int roomId = snsChatService.getOrCreateRoom(senderId, receiverId);
        logger.info("Room created or retrieved with ID: {}", roomId);
        return roomId;
    }
}
