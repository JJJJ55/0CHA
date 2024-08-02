package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.model.MessageDto;
import com.ssafy.back_end.sns.service.SnsChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.HtmlUtils;

import java.util.List;

@Controller
@RequestMapping("/api/sns/chat")
public class SnsChatController {

    @Autowired
    private SnsChatService snsChatService;

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public MessageDto sendMessage(MessageDto message) {
        MessageDto savedMessage =
                snsChatService.saveMessage(message.getSenderId(), message.getRoomId(), message.getMessage());
        return savedMessage;
    }

    @GetMapping("/history")
    public List<MessageDto> getMessageHistory(@RequestParam int roomId) {
        return snsChatService.getMessageHistory(roomId);
    }
}
