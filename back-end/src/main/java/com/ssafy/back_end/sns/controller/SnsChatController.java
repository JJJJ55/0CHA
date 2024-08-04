package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.model.MessageDto;
import com.ssafy.back_end.sns.service.SnsChatService;
import com.ssafy.back_end.redis.service.RedisMessagePublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CopyOnWriteArrayList;

@Controller
@RequestMapping("/api/sns/chat")
public class SnsChatController {

    @Autowired
    private SnsChatService snsChatService;

    @Autowired
    private RedisMessagePublisher redisMessagePublisher;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final List<Integer> dummyUserIds = Arrays.asList(1, 2, 3); // 더미 유저 ID 목록
    private final Random random = new Random();

    @MessageMapping("/message")
    public void sendMessage(MessageDto message) {
        MessageDto savedMessage =
                snsChatService.saveMessage(message.getSenderId(), message.getRoomId(), message.getMessage());

        redisMessagePublisher.publish(savedMessage.getMessage());

        // 수신자의 채널로 메시지 발송
        messagingTemplate.convertAndSend("/queue/messages/" + message.getRoomId(), savedMessage);
        // 발신자의 채널로도 메시지 발송 (보낸 사람이 자신의 메시지를 볼 수 있도록)
        messagingTemplate.convertAndSend("/queue/messages/" + message.getSenderId(), savedMessage);
    }

    @GetMapping("/history")
    public List<MessageDto> getMessageHistory(@RequestParam int roomId) {
        return snsChatService.getMessageHistory(roomId);
    }

    @GetMapping("/subscribe")
    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter();
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        return emitter;
    }

    @MessageMapping("/connect")
    @SendTo("/topic/connect")
    public int connect() {
        // 더미 유저 ID 목록에서 랜덤으로 하나 선택
        return dummyUserIds.get(random.nextInt(dummyUserIds.size()));
    }
}
