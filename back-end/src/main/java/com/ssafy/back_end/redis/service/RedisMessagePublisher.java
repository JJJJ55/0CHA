package com.ssafy.back_end.redis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

/**
 * RedisMessagePublisher 클래스는 Redis의 Pub/Sub(퍼블리시/구독) 메커니즘을 이용하여
 * 메시지를 특정 채널로 퍼블리시하는 역할을 담당합니다.
 */
@Service
public class RedisMessagePublisher {

    // RedisTemplate은 Redis 서버와의 상호작용을 담당하며, 여기서는 메시지 퍼블리시를 위해 사용됩니다.
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * RedisMessagePublisher 생성자.
     * RedisTemplate 객체를 주입받아 필드를 초기화합니다.
     *
     * @param redisTemplate Redis와 상호작용하기 위한 RedisTemplate 객체.
     */
    @Autowired
    public RedisMessagePublisher(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * 지정된 채널로 메시지를 퍼블리시합니다.
     *
     * @param channel 메시지를 퍼블리시할 Redis 채널 이름.
     * @param message 퍼블리시할 메시지 객체. 이 객체는 Redis에 의해 직렬화되어 전송됩니다.
     */
    public void publish(String channel, Object message) {
        // RedisTemplate의 convertAndSend 메서드를 사용하여 메시지를 퍼블리시합니다.
        redisTemplate.convertAndSend(channel, message);
    }
}