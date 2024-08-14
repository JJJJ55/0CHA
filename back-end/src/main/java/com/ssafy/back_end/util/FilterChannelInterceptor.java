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
                || Objects.equals(headerAccessor.getCommand(), StompCommand.SEND)) { // 문제 발생 예상 지/점
            String token = removeBrackets(String.valueOf(headerAccessor.getNativeHeader("Authorization")));
            String refreshToken = removeBrackets(String.valueOf(headerAccessor.getNativeHeader("RefreshToken")));

            log.info(">>>>>> Token resolved : {}", token);
            try {
//                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                int accountId = jwtUtil.getUserIdFromAccessToken(token);
                headerAccessor.addNativeHeader("AccountId", String.valueOf(accountId));
                log.info(">>>>>> AccountId is set to header : {}", accountId);
            } catch (Exception e) {
                log.warn(">>>>> Authentication Failed in FilterChannelInterceptor : ", e);
            }
        }
        return message;
    }

    private String removeBrackets(String token) {
        if (token.startsWith("[") && token.endsWith("]")) {
            return token.substring(1, token.length() - 1);
        }
        return token;
    }
}