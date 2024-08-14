package com.ssafy.back_end.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.messaging.support.ChannelInterceptor;

import java.util.Objects;

@Slf4j
@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class FilterChannelInterceptor implements ChannelInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        log.info(">>>>>> headerAccessor : {}", headerAccessor);
        assert headerAccessor != null;
        log.info(">>>>> headAccessorHeaders : {}", headerAccessor.getCommand());

        if (Objects.equals(headerAccessor.getCommand(), StompCommand.CONNECT)
                || Objects.equals(headerAccessor.getCommand(), StompCommand.SEND)) {

            // 헤더에서 토큰 추출
            String token = headerAccessor.getFirstNativeHeader("Authorization");
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);  // "Bearer " 제거
            }
            String refreshToken = headerAccessor.getNativeHeader("RefreshToken").get(0);

            log.info(">>>>>> Token resolved : {}", token);
            log.info(">>>>>> RefreshToken resolved : {}", refreshToken);
            // 여기까지 오케이
            try {
                if (token != null) {
                    int accountId = jwtUtil.getUserIdFromAccessToken(token);
                    headerAccessor.addNativeHeader("AccountId", String.valueOf(accountId));
                    log.info(">>>>>> AccountId is set to header : {}", accountId);
                } else {
                    log.warn(">>>>> No Token provided");
                }
            } catch (Exception e) {
                log.warn(">>>>> Authentication Failed in FilterChannelInterceptor : ", e);
            }
        }

        log.info(">>>>> Message : {}", message);
        log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        return message;
    }
}
