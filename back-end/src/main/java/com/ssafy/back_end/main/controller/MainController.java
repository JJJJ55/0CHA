package com.ssafy.back_end.main.controller;

import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineSummaryDto;
import com.ssafy.back_end.main.model.UserInfoDto;
import com.ssafy.back_end.main.model.UserPasswordDto;
import com.ssafy.back_end.main.service.MainService;
import com.ssafy.back_end.exercise.service.WorkoutRoutineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "메인페이지")
@RestController
@RequestMapping(value = "/api/main")
public class MainController {
    private final MainService mainService;
    private final WorkoutRoutineService workoutRoutineService;

    @Autowired
    public MainController(MainService mainService, WorkoutRoutineService workoutRoutineService) {
        this.mainService = mainService;
        this.workoutRoutineService = workoutRoutineService;
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

    @Operation(summary = "모든 사용자의 루틴 목록 조회", description = "모든 사용자의 루틴 목록을 조회합니다.")
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsersRoutines() {
        List<RoutineDto> routines = workoutRoutineService.getAllUsersRoutines();
        if (routines.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 목록이 비어 있습니다");
        }
        List<RoutineSummaryDto> summaryRoutines = routines.stream()
                .map(r -> new RoutineSummaryDto(r.getId(), r.getTitle(), r.getDueDate(), r.isLike()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(summaryRoutines);
    }

    @Operation(summary = "본인의 루틴 목록 조회", description = "사용자의 모든 루틴 목록을 조회합니다.")
    @GetMapping("/routines")
    public ResponseEntity<?> getAllRoutines(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");

        List<RoutineDto> routines = workoutRoutineService.getAllRoutines(userId);
        if (routines.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 목록이 비어 있습니다");
        }
        List<RoutineSummaryDto> summaryRoutines = routines.stream()
                .map(r -> new RoutineSummaryDto(r.getId(), r.getTitle(), r.getDueDate(), r.isLike()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(summaryRoutines);
    }
}
