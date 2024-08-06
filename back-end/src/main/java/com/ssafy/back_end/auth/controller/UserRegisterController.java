package com.ssafy.back_end.auth.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.auth.service.UserRegisterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@Tag (name = "AUTH회원가입")
@RestController
@RequestMapping (value = "/api/auth/register")
public class UserRegisterController {
    static int authCode;
    private final UserRegisterService userRegisterService;

    @Autowired
    public UserRegisterController(UserRegisterService userRegisterService) {
        this.userRegisterService = userRegisterService;
    }

    @Operation (summary = "회원가입")
    @PostMapping ("/signup")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        int ID = userRegisterService.register(userDto);

        if (ID > 0) {
            return ResponseEntity.ok(ID);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원가입실패");
        }
    }

    @Operation (summary = "회원가입 후 추가정보 기입")
    @PutMapping ("/user-info")
    public ResponseEntity<?> userInfo(@RequestBody UserDto userDto) {
        int result = userRegisterService.userInfo(userDto);

        if (result > 0) {
            return ResponseEntity.ok("추가정보 기입이 완료되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("추가정보 기입 실패");
        }
    }

    @Operation (summary = "이메일 중복검사&인증발송")
    @PostMapping ("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody String email) {
        int result = userRegisterService.checkEmail(email);

        if (result <= 0) {
            authCode = getRandomNumber();   //랜덤코드
            userRegisterService.sendEmail(email, authCode);
            return ResponseEntity.ok("이메일로 인증코드가 전송되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이메일이 유효하지 않습니다.");
        }
    }

    @Operation (summary = "이메일 인증확인")
    @PostMapping ("/check-email/verify")
    public ResponseEntity<?> verifyEmail(@RequestBody int code) {
        if (code == authCode) {
            authCode = 0;   //인증코드 초기화
            return ResponseEntity.ok("성공적으로 인증되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("코드가 일치하지 않습니다");
        }
    }

    @Operation (summary = "닉네임 중복검사")
    @PostMapping ("/check-nickname")
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