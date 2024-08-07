package com.ssafy.back_end.main.controller;

import com.ssafy.back_end.main.model.UserInfoDto;
import com.ssafy.back_end.main.model.UserPasswordDto;
import com.ssafy.back_end.main.service.MainService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "메인페이지")
@RestController
@RequestMapping(value = "/api/main")
public class MainController {
    private final MainService mainService;

    @Autowired
    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    @Operation (summary = "유저 정보 조회")
    @GetMapping ("/profile/info")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        int ID = (Integer)request.getAttribute("userId");
        UserInfoDto userInfoDto = mainService.getUserInfo(ID);

        if (userInfoDto != null) {
            return ResponseEntity.ok(userInfoDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 정보 조회 오류");
    }

    @Operation(summary = "유저 프로필 수정")
    @PutMapping ("/profile")
    public ResponseEntity<?> modifyProfile(HttpServletRequest request, @RequestBody UserInfoDto userInfoDto) {
        int ID = (Integer)request.getAttribute("userId");
        String nickname = userInfoDto.getNickname();
        String profileImage = userInfoDto.getProfileImage();
        int result = mainService.modifyProfile(nickname, profileImage, ID);

        if (result != 0) {
            return ResponseEntity.ok("유저 프로필 수정 완료");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 프로필 수정 오류");
    }

    @Operation (summary = "닉네임 중복검사")
    @PostMapping ("/profile/check-nickname")
    public ResponseEntity<?> checkNickname(@RequestBody String nickname) {
        int result = mainService.checkNickname(nickname);

        if (result <= 0) {
            return ResponseEntity.ok("사용가능한 닉네임입니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용중인 닉네임입니다.");
        }
    }

    @Operation(summary = "회원정보 수정")
    @PutMapping("/profile/info")
    public ResponseEntity<?> modifyUserInfo(HttpServletRequest request, @RequestBody UserInfoDto userInfoDto) {
        int ID = (Integer)request.getAttribute("userId");
        userInfoDto.setId(ID);
        int result = mainService.modifyUserInfo(userInfoDto);

        if (result != 0) {
            return ResponseEntity.ok("회원정보 수정 완료");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원정보 수정 오류");
    }

    @Operation(summary = "패스워드 변경")
    @PutMapping("/profile/password")
    public ResponseEntity<?> modifyPassword(HttpServletRequest request, @RequestBody UserPasswordDto userPasswordDto) {
        int ID = (Integer)request.getAttribute("userId");
        int result = mainService.modifyPassword(ID, userPasswordDto.getCurPassword(), userPasswordDto.getNewPassword());

        if (result != 0) {
            return ResponseEntity.ok("패스워드 변경 완료");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("패스워드 변경 오류");
    }

    @Operation(summary = "회원탈퇴")
    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        int ID = (Integer)request.getAttribute("userId");
        int result = mainService.deleteUser(ID);

        if (result != 0) {
            return ResponseEntity.ok("회원탈퇴 완료");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원탈퇴 오류");
    }
}