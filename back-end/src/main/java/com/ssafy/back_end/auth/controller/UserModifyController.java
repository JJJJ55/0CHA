package com.ssafy.back_end.auth.controller;

import com.ssafy.back_end.auth.model.UserDto;
import com.ssafy.back_end.auth.service.UserModifyService;
import com.ssafy.back_end.auth.service.UserModifyServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Tag (name = "AUTH정보수정")
@RestController
@RequestMapping (value = "/api/auth/modify")
public class UserModifyController {
    private final UserModifyService userModifyService;
    private Map<String, Integer> authCode = new HashMap<>();

    @Autowired
    public UserModifyController(UserModifyServiceImpl userModifyService) {
        this.userModifyService = userModifyService;
    }

    @Operation (summary = "이메일 찾기")
    @PostMapping ("/find-email")
    public ResponseEntity<?> findEmail(@RequestBody UserDto userDto) {
        String email = userModifyService.findEmail(userDto);

        if (email != null) {
            return ResponseEntity.ok(email);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보를 찾을 수 없습니다");
        }
    }

    @Operation (summary = "비밀번호 찾기&인증발송")
    @PostMapping ("/find-password")
    public ResponseEntity<?> findPassword(@RequestBody UserDto userDto) {
        int result = userModifyService.findPassword(userDto);

        if (result > 0) {
            if(!authCode.containsKey(userDto.getEmail())) {
                authCode.put(userDto.getEmail(), getRandomNumber());   //랜덤으로 이메일로 전송해줘야함
            }
            userModifyService.sendEmail(userDto.getEmail(), authCode.get(userDto.getEmail()));
            return ResponseEntity.ok("이메일로 인증코드가 전송되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보를 찾을 수 없습니다");
        }
    }

    @Operation (summary = "비밀번호 인증확인")
    @PostMapping ("/find-password/verify")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");
        int code = (int) request.get("authCode");

        if(authCode.get(email) != null &&authCode.get(email) == code){
            authCode.remove(email);
            return ResponseEntity.ok("성공적으로 인증되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("코드가 일치하지 않습니다");
        }
    }

    @Operation (summary = "비밀번호 초기화")
    @PutMapping ("/reset-password")
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
