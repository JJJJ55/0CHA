package com.ssafy.back_end.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    //HS256(HMAC SHA-256) 알고리즘으로 키 생성
    private static final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final Key refreshKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    //토큰 만료시간 설정
    public final static long ACCESS_TOKEN_VALIDATION_SECOND = 1000L * 60 * 60; //액세스 1시간
    public static final long REFRESH_TOKEN_VALIDATION_SECOND = 1000L * 60 * 60 * 24 * 7; //리프레쉬 7일
    public static final String AUTHORIZATION_HEADER = "Authorization"; //헤더 이름

    // Access Token 생성 메서드
    public String createAccessToken(String email) {
        //토큰 만료 시간 설정
        Date now = new Date();
        Date expiration = new Date(now.getTime() + ACCESS_TOKEN_VALIDATION_SECOND);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(secretKey)
                .compact();
    }

    // Refresh Token 생성 메서드
    public String createRefreshToken(String email) {
        //토큰 만료 시간 설정
        Date now = new Date();
        Date expiration = new Date(now.getTime() + REFRESH_TOKEN_VALIDATION_SECOND);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(refreshKey)
                .compact();
    }

    //토큰 유효성 검증 메서드
    public boolean validateToken(String token, boolean isRefreshToken) {
        //토큰 파싱 후 발생하는 예외를 캐치하여 문제가 있으면 false, 정상이면 true 반환
        try {
            if (isRefreshToken) {
                Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(token);
            } else {
                Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            }
            return true;
        } catch (SignatureException e) {
            // 서명이 옳지 않을 때
            System.out.println("잘못된 토큰 서명입니다.");
        } catch (ExpiredJwtException e) {
            // 토큰이 만료됐을 때
            System.out.println("만료된 토큰입니다.");
        } catch (IllegalArgumentException | JwtException e) {
            // 토큰이 올바르게 구성되지 않았을 때 처리
            System.out.println("잘못된 토큰입니다.");
        }
        return false;
    }

    // Refresh Token에서 email 추출
    public String getEmailFromRefreshToken(String token) {
        return Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    // HttpServletRequest에서 Authorization Header를 통해 access token을 추출하는 메서드입니다.
    public String getAccessToken(HttpServletRequest httpServletRequest) {
        String bearerToken = httpServletRequest.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}