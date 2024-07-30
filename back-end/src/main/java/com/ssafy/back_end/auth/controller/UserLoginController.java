package com.ssafy.back_end.auth.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.auth.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public UserLoginController(UserLoginService userLoginService) {
        this.userLoginService = userLoginService;
    }

    @PostMapping ("/")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        UserDto user = userLoginService.login(userDto);

        if (user != null) {
            return ResponseEntity.ok("로그인성공");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("로그인실패");
        }
    }
}
