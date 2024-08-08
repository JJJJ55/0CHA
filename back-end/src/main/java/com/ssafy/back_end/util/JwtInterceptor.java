package com.ssafy.back_end.util;

import com.ssafy.back_end.auth.service.UserLoginService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

// JWT를 이용한 인터셉터 구현
@Component
public class JwtInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(JwtInterceptor.class);

    private final JwtUtil jwtUtil; //JWT 유틸리티 객체 주입
    private UserLoginService userLoginService;

    @Autowired
    public JwtInterceptor(JwtUtil jwtUtil, UserLoginService userLoginService) {
        this.jwtUtil = jwtUtil;
        this.userLoginService = userLoginService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        // 요청이 들어오면 실행되는 메서드
        String accessToken = jwtUtil.getAccessToken(request); //헤더에서 액세스 토큰을 가져옴
        String refreshToken = jwtUtil.getRefreshToken(request); // 추가된 부분

        // 비회원일 때(액세스 토큰이 없을 때)
        if (accessToken == null) {
            logger.debug("비회원 유저입니다 URI : {}", requestURI);
            System.out.println("비회원" + requestURI);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;   //비회원이어도 false
        } else {
            logger.debug("access 존재합니다.");
            try {
                // 액세스 토큰이 유효 시
                if (jwtUtil.validateToken(accessToken, false)) {
                    logger.debug("유효한 토큰 정보입니다. URI : {}", requestURI);
                    System.out.println("유효" + requestURI);

                    int userId = jwtUtil.getUserIdFromAccessToken(accessToken);
                    response.setHeader("ID", String.valueOf(userId)); // 사용자 ID를 헤더에 추가
                    request.setAttribute("userId", userId); // 요청 속성에 userId 추가
                    return true;
                }
            } catch (ExpiredJwtException e) {

                if (refreshToken != null && jwtUtil.isRefreshTokenExpired(refreshToken)) {
                    int userId = jwtUtil.getUserIdFromRefreshToken(refreshToken);
                    userLoginService.invalidateRefreshToken(userId);
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Refresh token is expired, logged out");
                    return false;
                }

                logger.debug("만료된 jwt 토큰입니다. uri : {}", requestURI);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Access token is expired");
                return false;
            } catch (Exception e) {
                logger.debug("유효하지 않은 jwt 토큰입니다. uri : {}", requestURI);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return false;
            }
        }
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return false;
    }
}