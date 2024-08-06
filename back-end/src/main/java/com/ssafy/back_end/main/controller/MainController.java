package com.ssafy.back_end.main.controller;

import com.ssafy.back_end.main.service.MainService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "메인페이지")
@RestController
@RequestMapping(value = "/api/main")
public class MainController {
    private final MainService mainService;

    @Autowired
    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

//    @Operation(summary = "유저 정보 조회")
//    @GetMapping("/user-info")
//    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
//        int ID = (Integer)request.getAttribute("userId");
//        UserInfoDto userInfoDto = mainService.getUserInfo(ID);
//
//        if (userInfoDto != null) {
//            return ResponseEntity.ok(userInfoDto);
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 정보 조회 오류");
//    }
//
//    @Operation(summary = "유저 프로필 수정")
//    @PutMapping("/profile")
//    public ResponseEntity<?> modifyProfile(HttpServletRequest request, @RequestBody UserInfoDto userInfoDto) {
//        int ID = (Integer)request.getAttribute("userId");
//        String nickname = userInfoDto.getNickname();
//        String profileImage = userInfoDto.getProfileImage();
//        int result = mainService.modifyProfile(nickname, profileImage, ID);
//
//        if (result != 0) {
//            return ResponseEntity.ok("유저 프로필 수정 완료");
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 프로필 수정 오류");
//    }
//
//    @Operation (summary = "닉네임 중복검사")
//    @PostMapping ("/profile/check-nickname")
//    public ResponseEntity<?> checkNickname(@RequestBody String nickname) {
//        int result = mainService.checkNickname(nickname);
//
//        if (result <= 0) {
//            return ResponseEntity.ok("사용가능한 닉네임입니다.");
//        }
//        else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용중인 닉네임입니다.");
//        }
//    }
//
//    @Operation(summary = "회원정보 수정")
//    @PutMapping("/profile/info")
//    public ResponseEntity<?> modifyUserInfo(HttpServletRequest request, @RequestBody UserInfoDto userInfoDto) {
//        int ID = (Integer)request.getAttribute("userId");
//        userInfoDto.setId(ID);
//        int result = mainService.modifyUserInfo(userInfoDto);
//
//        if (result != 0) {
//            return ResponseEntity.ok("회원정보 수정 완료");
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원정보 수정 오류");
//    }
}
//int modifyPassword(int id, String curPassword, String newPassword);   //패스워드 변경
//
//int deleteUser(int id, String password);   //비밀번호 변경