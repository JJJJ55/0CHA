package com.ssafy.back_end.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocket  // 웹소켓 서버 사용
@EnableWebSocketMessageBroker  // STOMP 사용
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub"); // /sub로 시작하는 주제를 구독자에게 전달
        registry.setApplicationDestinationPrefixes("/pub"); // /pub로 클라이언트가 메시지 전송
    }

    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.
                addEndpoint("/ws").   // websocket 연결시, 엔드포인트 : /ws
                setAllowedOrigins("*").
                withSockJS();
    }
}
