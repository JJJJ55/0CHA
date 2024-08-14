package com.ssafy.back_end.config;

import com.ssafy.back_end.redis.service.RedisMessagePublisher;
import com.ssafy.back_end.redis.service.RedisMessageSubscriber;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * RedisConfig 클래스는 Redis의 Pub/Sub 메커니즘을 이용하기 위한 설정을 담당합니다.
 * Redis 메시지 리스너 컨테이너와 구독자(MessageListenerAdapter)를 설정하여
 * 특정 채널의 메시지를 수신하고 처리할 수 있도록 합니다.
 */
@Configuration
public class RedisConfig {

    /**
     * RedisMessageListenerContainer를 설정합니다.
     * 이 컨테이너는 Redis에서 발생하는 메시지를 구독하고,
     * 이를 처리할 리스너를 등록합니다.
     *
     * @param connectionFactory Redis와의 연결을 관리하는 RedisConnectionFactory.
     * @param listenerAdapter 메시지를 수신하여 처리하는 리스너 어댑터.
     * @return RedisMessageListenerContainer Redis 메시지 리스너 컨테이너.
     */
    @Bean
    RedisMessageListenerContainer redisContainer(RedisConnectionFactory connectionFactory,
                                                 MessageListenerAdapter listenerAdapter) {
        // Redis 메시지 리스너 컨테이너를 생성합니다.
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        // Redis 연결 팩토리를 설정하여 Redis 서버와의 연결을 관리합니다.
        container.setConnectionFactory(connectionFactory);
        // 특정 채널("chat")의 메시지를 처리하기 위해 리스너를 등록합니다.
        container.addMessageListener(listenerAdapter, new ChannelTopic("chat"));

        return container;
    }

    /**
     * MessageListenerAdapter를 설정합니다.
     * 이 어댑터는 Redis에서 수신된 메시지를 지정된 메서드로 전달하여 처리합니다.
     *
     * @param subscriber Redis에서 수신된 메시지를 처리할 구독자(리스너).
     * @return MessageListenerAdapter Redis 메시지를 처리하는 어댑터.
     */
    @Bean
    MessageListenerAdapter listenerAdapter(RedisMessageSubscriber subscriber) {
        // 구독자(subscriber)의 "onMessage" 메서드를 메시지 처리 메서드로 지정합니다.
        return new MessageListenerAdapter(subscriber, "onMessage");
    }

    /**
     * ChannelTopic을 설정합니다.
     * 이 빈은 Redis에서 사용할 채널 이름을 정의합니다.
     *
     * @return ChannelTopic Redis 채널 주제(topic).
     */
    @Bean
    ChannelTopic topic() {
        // "chat"이라는 이름의 Redis 채널 주제를 생성합니다.
        return new ChannelTopic("chat");
    }
}
