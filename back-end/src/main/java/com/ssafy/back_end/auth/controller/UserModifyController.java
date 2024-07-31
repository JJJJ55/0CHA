package com.ssafy.back_end.auth.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.auth.service.UserModifyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping (value = "/api/auth/modify")
public class UserModifyController {
    static int authCode;
    private final UserModifyServiceImpl userModifyService;

    @Autowired
    public UserModifyController(UserModifyServiceImpl userModifyService) {
        this.userModifyService = userModifyService;
    }

    @PostMapping ("/find_email")
    public ResponseEntity<?> findEmail(@RequestBody UserDto userDto) {
        String email = userModifyService.findEmail(userDto);

        if (email != null) {
            return ResponseEntity.ok("이메일은 : " + email + " 입니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보를 찾을 수 없습니다");
        }
    }

    @PostMapping ("/find_password")
    public ResponseEntity<?> findPassword(@RequestBody UserDto userDto) {
        int result = userModifyService.findPassword(userDto);

        if (result > 0) {
            authCode = getRandomNumber();   //랜덤으로 이메일로 전송해줘야함
            return ResponseEntity.ok("이메일로 인증코드가 전송되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보를 찾을 수 없습니다");
        }
    }

    @PostMapping ("/find_password/verify")
    public ResponseEntity<?> verifyPassword(@RequestBody int code) {
        if (code == authCode) {
            authCode = 0;   //인증코드 초기화
            return ResponseEntity.ok("성공적으로 인증되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("코드가 일치하지 않습니다");
        }
    }

    @PutMapping ("/reset_password")
    public ResponseEntity<?> resetPassword(@RequestBody UserDto userDto) {
        int result = userModifyService.resetPassword(userDto);

        if (result > 0) {
            return ResponseEntity.ok("비밀번호가 변경되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("비밀번호 변경에 실패했습니다.");
        }
    }

    public static int getRandomNumber() {
        Random random = new Random();
        return 100000 + random.nextInt(900000);
    }
}
