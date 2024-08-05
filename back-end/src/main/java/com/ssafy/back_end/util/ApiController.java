package com.ssafy.back_end.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

// 서비스 내부의 api만 사용할거면 필요없음
@RestController
@RequestMapping ("/api")
public class ApiController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping ("/callExternalApi")
    public ResponseEntity<String> callExternalApi(@RequestHeader ("Authorization") String token) {
        String externalApiUrl = "https://api.example.com/data"; // 외부 API URL, 어떤 주소를 넣어야하지?

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        // 엔티티 생성
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // API 호출
        ResponseEntity<String> response = restTemplate.exchange(
                externalApiUrl,
                HttpMethod.GET,
                entity,
                String.class
        );

        // 응답 반환
        return ResponseEntity.ok(response.getBody());
    }
}