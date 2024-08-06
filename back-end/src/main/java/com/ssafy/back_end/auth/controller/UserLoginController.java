package com.ssafy.back_end.auth.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.auth.service.UserLoginService;
import com.ssafy.back_end.util.JwtResponse;
import com.ssafy.back_end.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag (name = "AUTH로그인")
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

    @Operation (summary = "로그인")
    @PostMapping ("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        UserDto user = userLoginService.login(userDto);

        if (user != null) {
            String accessToken = jwtUtil.createAccessToken(user.getId());
            String refreshToken = jwtUtil.createRefreshToken(user.getId());
            userLoginService.storeRefreshToken(user.getId(), refreshToken);

            return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken));
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인실패");
        }
    }

    @Operation (summary = "액세스 토큰 재발급")
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

    @Operation (summary = "로그아웃")
    @PostMapping ("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        int ID = (Integer)request.getAttribute("userId");
        userLoginService.invalidateRefreshToken(ID);
        return ResponseEntity.ok("로그아웃 성공");
    }
}
