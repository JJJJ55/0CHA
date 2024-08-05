package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.model.MessageDto;
import com.ssafy.back_end.sns.service.SnsChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Controller
@RequestMapping("/api/sns/chat")
public class SnsChatController {

    @Autowired
    private SnsChatService snsChatService;

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public MessageDto sendMessage(MessageDto message) {
        MessageDto savedMessage =
                snsChatService.saveMessage(message.getSenderId(), message.getRoomId(), message.getMessage());

        emitters.forEach(emitter -> {
            try {
                emitter.send(savedMessage);
            } catch (Exception e) {
                emitter.completeWithError(e);
                emitters.remove(emitter);
            }
        });
        return savedMessage;
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
}
