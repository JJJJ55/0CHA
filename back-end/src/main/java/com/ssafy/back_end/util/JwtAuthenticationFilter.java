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
    private final UserLoginService userLoginService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserLoginService userLoginService) {
        this.jwtUtil = jwtUtil;
        this.userLoginService = userLoginService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();

        // Swagger 및 OAuth2 경로에 대한 요청은 필터링에서 제외
        if (uri.startsWith("/swagger-ui/") || uri.startsWith("/v3/api-docs/")) {
            chain.doFilter(request, response);
            return;
        }

        String accessToken = jwtUtil.getAccessToken(request);
        String refreshToken = jwtUtil.getRefreshToken(request);

        try {
            if (accessToken != null && jwtUtil.validateToken(accessToken, false)) {
                int userId = jwtUtil.getUserIdFromAccessToken(accessToken);

                String currentRefreshToken = userLoginService.getRefreshTokenByUserId(userId);
                if (refreshToken != null && refreshToken.equals(currentRefreshToken)) {
                    JwtAuthenticationToken authentication = new JwtAuthenticationToken(userId, null, null);
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    request.setAttribute("userId", userId);
                } else {
                    throw new ExpiredJwtException(null, null, "Refresh token is invalid or expired.");
                }
            } else {
                throw new ExpiredJwtException(null, null, "Access token is expired or invalid.");
            }
        } catch (ExpiredJwtException e) {
            handleJwtException(response, e.getMessage(), e);
            return;
        } catch (Exception e) {
            logger.error("JWT 토큰 처리 중 오류 발생: {}", e.getMessage(), e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid JWT token");
            return;
        }

        chain.doFilter(request, response);
    }

    private void handleJwtException(HttpServletResponse response, String message, Exception e) throws IOException {
        logger.warn("JWT 오류: {}", message, e);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(message);
    }
}
