package com.ssafy.back_end.util;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
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


//    특정 문자열로부터 키 생성
//
//    Base64로 인코딩된 문자열을 바이트 배열로 변환하여 키 생성


    private static final String SECRET_KEY_STRING = "ad6fs78g6qw0er876das9f87g65sdf9876g5sd987g56sdf";
    private static final String REFRESH_KEY_STRING = "asd890fuyqw089efyasdfasfdasdfwa8efyaw98efhsaf";

    private static final Key secretKey = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());
    private static final Key refreshKey = Keys.hmacShaKeyFor(REFRESH_KEY_STRING.getBytes());
    //HS256(HMAC SHA-256) 알고리즘으로 키 생성
//    private static final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//    private static final Key refreshKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    //토큰 만료시간 설정
//    public final static long ACCESS_TOKEN_VALIDATION_SECOND = 1000L * 10; //액세스 10초
//    public static final long REFRESH_TOKEN_VALIDATION_SECOND = 1000L * 10*2; //리프레쉬 20초
    public final static long ACCESS_TOKEN_VALIDATION_SECOND = 1000L * 60 * 60; //액세스 1시간
    public static final long REFRESH_TOKEN_VALIDATION_SECOND = 1000L * 60 * 60 * 24 * 7; //리프레쉬 7일
    public static final String AUTHORIZATION_HEADER = "Authorization"; //헤더 이름
    public static final String REFRESH_HEADER = "RefreshToken"; //헤더 이름

    // Access Token 생성 메서드
    public String createAccessToken(int userId) {
        //토큰 만료 시간 설정
        Date now = new Date();
        Date expiration = new Date(now.getTime() + ACCESS_TOKEN_VALIDATION_SECOND);

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(secretKey)
                .compact();
    }

    // Refresh Token 생성 메서드
    public String createRefreshToken(int userId) {
        //토큰 만료 시간 설정
        Date now = new Date();
        Date expiration = new Date(now.getTime() + REFRESH_TOKEN_VALIDATION_SECOND);

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
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
            }
            else {
                Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            }
            return true;
        }
        catch (ExpiredJwtException e) {
            logger.info("토큰이 만료되었습니다.");
            throw e;  // 만료된 토큰일 경우 예외를 던짐
        }
        catch (SignatureException e) {
            System.out.println("잘못된 토큰 서명입니다.");
        }
        catch (IllegalArgumentException | JwtException e) {
            System.out.println("잘못된 토큰입니다.");
        }
        return false;
    }

    // Access Token에서 id 추출
    public int getUserIdFromAccessToken(String token) {
        return Integer.parseInt(Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject());
    }

    // Refresh Token에서 id 추출
    public int getUserIdFromRefreshToken(String token) {
        return Integer.parseInt(Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(token).getBody().getSubject());
    }

    // HttpServletRequest에서 Authorization Header를 통해 access token을 추출하는 메서드입니다.
    public String getAccessToken(HttpServletRequest httpServletRequest) {
        System.out.println("httpServletRequest: " + httpServletRequest);


        String bearerToken = httpServletRequest.getHeader(AUTHORIZATION_HEADER);
        System.out.println("accessToken: " + bearerToken);

        //
        String rt = httpServletRequest.getHeader(REFRESH_HEADER);
        System.out.println("refreshToken: " + rt);
        //

        if (StringUtils.hasText(bearerToken)) {
            return bearerToken;
        }

        return null;
    }

    // HttpServletRequest에서 Refresh Token을 추출하는 메서드
    public String getRefreshToken(HttpServletRequest httpServletRequest) {
        return httpServletRequest.getHeader(REFRESH_HEADER);
    }

    public boolean isRefreshTokenExpired(String refreshToken) {
        try {
            Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(refreshToken);
            return false;
        }
        catch (ExpiredJwtException e) {
            return true;
        }
        catch (JwtException e) {
            return false;
        }
    }
}
