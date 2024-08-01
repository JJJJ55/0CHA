package com.ssafy.back_end.auth.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.auth.service.UserLoginService;
import com.ssafy.back_end.util.JwtResponse;
import com.ssafy.back_end.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping (value = "/api/auth/login")
public class UserLoginController {

    private final UserLoginService userLoginService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserLoginController(UserLoginService userLoginService, JwtUtil jwtUtil) {
        this.userLoginService = userLoginService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping ("/")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        UserDto user = userLoginService.login(userDto);

        if (user != null) {
            String accessToken = jwtUtil.createAccessToken(user.getId());
            String refreshToken = jwtUtil.createRefreshToken(user.getId());

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + accessToken);

            System.out.println("AccessToken: " + accessToken);
            System.out.println("Headers: " + headers);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(new JwtResponse(accessToken, refreshToken));
//            return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken));
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인실패");
        }
    }

    @PostMapping ("/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody String refreshToken) {
        if (jwtUtil.validateToken(refreshToken, true)) {
            int userId = jwtUtil.getUserIdFromRefreshToken(refreshToken);
            String newAccessToken = jwtUtil.createAccessToken(userId);
            return ResponseEntity.ok(new JwtResponse(newAccessToken, refreshToken));
        }
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("유효하지 않은 리프레시 토큰");
        }
    }
}
