package com.ssafy.back_end.auth.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.auth.service.UserRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping (value = "/api/auth/register")
public class UserRegisterController {
    static int authCode;
    private final UserRegisterService userRegisterService;

    @Autowired
    public UserRegisterController(UserRegisterService userRegisterService) {
        this.userRegisterService = userRegisterService;
    }

    @PostMapping ("/signup")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        int result = userRegisterService.register(userDto);

        if (result > 0) {
            return ResponseEntity.ok("회원가입이 완료되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원가입실패");
        }
    }

    @PostMapping ("/check_email")
    public ResponseEntity<?> checkEmail(@RequestBody String email) {
        int result = userRegisterService.checkEmail(email);

        if (result <= 0) {
            authCode = getRandomNumber();   //랜덤코드
            return ResponseEntity.ok("이메일로 인증코드가 전송되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이메일이 유효하지 않습니다.");
        }
    }

    @PostMapping ("/check_email/verify")
    public ResponseEntity<?> verifyEmail(@RequestBody int code) {
        if (code == authCode) {
            authCode = 0;   //인증코드 초기화
            return ResponseEntity.ok("성공적으로 인증되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("코드가 일치하지 않습니다");
        }
    }

    @PostMapping ("/check_nickname")
    public ResponseEntity<?> checkNickname(@RequestBody String nickname) {
        int result = userRegisterService.checkNickname(nickname);

        if (result <= 0) {
            return ResponseEntity.ok("사용가능한 닉네임입니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용중인 닉네임입니다.");
        }
    }

    public static int getRandomNumber() {
        Random random = new Random();
        return 100000 + random.nextInt(900000);
    }
}