package com.ssafy.back_end.redis.service;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * RedisMessageSubscriber 클래스는 Redis에서 퍼블리시된 메시지를 구독하고,
 * 이를 WebSocket을 통해 연결된 클라이언트에게 전달하는 역할을 담당합니다.
 *
 * 이 클래스는 Redis의 Pub/Sub 메커니즘에서 구독자 역할을 수행하며,
 * 특정 채널로 전달된 메시지를 수신하여 처리합니다.
 */
@Service
public class RedisMessageSubscriber implements MessageListener {

    // SimpMessagingTemplate은 Spring WebSocket에서 메시지를 전송하는 데 사용됩니다.
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * RedisMessageSubscriber 생성자.
     * SimpMessagingTemplate 객체를 주입받아 필드를 초기화합니다.
     *
     * @param messagingTemplate WebSocket을 통해 메시지를 전송하기 위한 SimpMessagingTemplate 객체.
     */
    public RedisMessageSubscriber(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Redis 채널에서 메시지를 수신할 때 호출되는 메서드입니다.
     *
     * @param message Redis에서 수신한 메시지.
     * @param pattern 메시지가 수신된 채널의 패턴 (채널 이름).
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        // 수신한 채널 이름을 문자열로 변환합니다.
        String channel = new String(pattern);
        // 수신한 메시지를 문자열로 변환합니다.
        String receivedMessage = message.toString();

        // WebSocket의 특정 구독 채널로 메시지를 전달합니다.
        messagingTemplate.convertAndSend(channel, receivedMessage);
    }
}
