package com.ssafy.back_end.util;

import com.ssafy.back_end.auth.service.UserLoginService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtUtil jwtUtil;
    private final UserLoginService userLoginService; // 기존 인터셉터에서 사용하던 UserLoginService 주입

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserLoginService userLoginService) {
        this.jwtUtil = jwtUtil;
        this.userLoginService = userLoginService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();

        // 특정 경로에 대한 요청을 멈추기 위한 추가 로직
        if ("/api/ws".equals(uri)) {
            logger.debug("요청이 /api/ws에서 멈췄습니다.");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("Request stopped at /api/ws");
            // 다음 필터로 요청 전달
            chain.doFilter(request, response);
            return;
        }

        // Swagger 경로에 대한 요청은 필터링에서 제외
        if (uri.startsWith("/swagger-ui/") || uri.startsWith("/v3/api-docs/")) {
            chain.doFilter(request, response);
            return;
        }

        String accessToken = jwtUtil.getAccessToken(request); // 헤더에서 액세스 토큰을 가져옴
        String refreshToken = jwtUtil.getRefreshToken(request); // 추가된 부분

        if (accessToken == null) {
            logger.debug("비회원 유저입니다 URI : {}", request.getRequestURI());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;   // 비회원이면 요청 중단
        } else {
            try {
                if (jwtUtil.validateToken(accessToken, false)) {
                    int userId = jwtUtil.getUserIdFromAccessToken(accessToken);

                    String currentRefreshToken = userLoginService.getRefreshTokenByUserId(userId);
                    // 액세스 토큰이 유효한지 확인하고, 리프레시 토큰과 일치하는지 확인
                    if (refreshToken.equals(currentRefreshToken)) {
                        JwtAuthenticationToken authentication = new JwtAuthenticationToken(userId, null, null);
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        request.setAttribute("userId", userId);
                    }
                    else {
                        throw new ExpiredJwtException(null, null, "토큰이 만료되었거나 유효하지 않습니다.");
                    }
                } else {
                    //액세스 토큰이 유효하지않음
                    throw new ExpiredJwtException(null, null, "토큰이 만료되었거나 유효하지 않습니다.");
                }
            } catch (ExpiredJwtException e) {
                if (refreshToken != null && jwtUtil.isRefreshTokenExpired(refreshToken)) {
                    int userId = userLoginService.getUserIdByRefreshToken(refreshToken);
                    userLoginService.invalidateRefreshToken(userId);
//                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Refresh token is expired, logged out");
                    return;
                }
                if((Integer)request.getAttribute("userId") != jwtUtil.getUserIdFromAccessToken(accessToken)){
                    //동시로그인
                    logger.debug("동시접속된 jwt 토큰입니다. uri : {}", request.getRequestURI());
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Multi Login");
                    return;
                }
                logger.debug("만료된 jwt 토큰입니다. uri : {}", request.getRequestURI());
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Access token is expired");
                return;
            } catch (Exception e) {
                logger.debug("유효하지 않은 jwt 토큰입니다. uri : {}", request.getRequestURI());
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("제발토큰아");
                return;
            }
        }

        // 다음 필터로 요청 전달
        chain.doFilter(request, response);
    }
}
