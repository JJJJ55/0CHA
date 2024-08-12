package com.ssafy.back_end.main.controller;

import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.model.RoutineSummaryDto;
import com.ssafy.back_end.exercise.service.WorkoutRoutineService;
import com.ssafy.back_end.main.model.UserInfoDto;
import com.ssafy.back_end.main.model.UserPasswordDto;
import com.ssafy.back_end.main.service.MainService;
import com.ssafy.back_end.sns.controller.SnsItemController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Tag (name = "메인페이지")
@RestController
@RequestMapping (value = "/api/main")
public class MainController {
    private static final Logger log = LoggerFactory.getLogger(SnsItemController.class);
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

    @Operation (summary = "유저 프로필 수정")
    @PutMapping ("/profile")
    public ResponseEntity<?> modifyProfile(HttpServletRequest request, @RequestPart ("nickname") String nickname,
                                           @RequestPart ("image") MultipartFile image) {
        int ID = (Integer)request.getAttribute("userId");
        String imageUrl = "";

        int result = mainService.checkNickname(nickname, ID);

        if (result <= 0) {

            String uploadDir = "/home/ubuntu/images/profile/";
            File uploadDirectory = new File(uploadDir);

            // 디렉토리가 존재하지 않으면 생성
            if (!uploadDirectory.exists()) {
                log.debug("[MainController] 디렉토리 {} 가 존재하지 않음", uploadDirectory.getAbsolutePath());
                boolean isCreated = uploadDirectory.mkdirs();
                if (!isCreated) {
                    log.debug("[MainController] 디렉토리 {} 생성 실패", uploadDirectory.getAbsolutePath());
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("디렉토리 생성 실패");
                }
                else {
                    log.debug("[MainController] 디렉토리 {} 생성 완료", uploadDirectory.getAbsolutePath());
                }
            }
            log.debug("[MainController] 디렉토리 {} 가 존재함", uploadDirectory.getAbsolutePath());

            if (!image.isEmpty()) {
                try {
                    String originalImageName = image.getOriginalFilename();
                    String imageExtension = "";

                    // 파일 확장자 추출
                    if (originalImageName != null && originalImageName.contains(".")) {
                        imageExtension = originalImageName.substring(originalImageName.lastIndexOf("."));
                    }

                    // 고유한 파일 이름 생성
                    // 사용자 ID-게시물 번호-해당 게시물에서 이미지 순서.확장자
                    String newFileName = ID + "-" + ID + "-" + imageExtension;
                    log.debug("[MainController] 새 파일 이름 생성: {}", newFileName);

                    // 파일 저장
                    image.transferTo(new File(uploadDir + newFileName));

                    // 이미지 정보 DB에 저장
                    imageUrl = uploadDir + newFileName;
                    log.debug("[MainController] 이미지 저장 경로: {}", imageUrl);

                    log.debug("[MainController] 이미지 업로드 성공: {}", newFileName);

                }
                catch (IOException e) {
                    log.error("[MainController] 이미지 업로드 오류", e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 오류");
                }
            }


            //등록 성공 시점

            String preImage = mainService.getImagePathsByUserId(ID);
            // 2. 각 이미지 파일을 호스트 디렉토리에서 삭제
            try {
                File file = new File(preImage);
                if (file.exists()) {
                    if (file.delete()) {
                        log.debug("이미지 파일 삭제 성공, {}", preImage);
                    }
                    else {
                        log.warn("이미지 파일 삭제 실패, {}", preImage);
                        throw new RuntimeException("이미지 파일 삭제 실패: " + preImage);
                    }
                }
                else {
                    log.warn("이미지 파일이 존재하지 않습니다, {}", preImage);
                    throw new RuntimeException("이미지 파일이 존재하지 않음: " + preImage);
                }
            }
            catch (Exception e) {
                log.error("게시물 삭제 중 오류 발생: {}", e.getMessage());
                throw e;  // 트랜잭션 롤백을 위해 예외를 다시 던짐
            }

            // 삭제 성공 시점

            result = mainService.modifyProfile(nickname, imageUrl, ID);
            if (result != 0) {
                return ResponseEntity.ok("유저 프로필 수정 완료");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 프로필 수정 오류");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용중인 닉네임입니다.");
        }
    }

//    @Operation (summary = "유저 닉네임 변경")
//    @PutMapping ("/profile/nickname")
//    public ResponseEntity<?> modifyNickname(HttpServletRequest request, @RequestBody String nickname) {
//        int ID = (Integer)request.getAttribute("userId");
//        int result = mainService.modifyNickname(nickname, ID);
//
//        if (result != 0) {
//            return ResponseEntity.ok("닉네임 변경 완료");
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("닉네임 변경 오류");
//    }

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

    @Operation (summary = "회원정보 수정")
    @PutMapping ("/profile/info")
    public ResponseEntity<?> modifyUserInfo(HttpServletRequest request, @RequestBody UserInfoDto userInfoDto) {
        int ID = (Integer)request.getAttribute("userId");
        userInfoDto.setId(ID);
        int result = mainService.modifyUserInfo(userInfoDto);

        if (result != 0) {
            return ResponseEntity.ok("회원정보 수정 완료");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원정보 수정 오류");
    }

    @Operation (summary = "패스워드 변경")
    @PutMapping ("/profile/password")
    public ResponseEntity<?> modifyPassword(HttpServletRequest request, @RequestBody UserPasswordDto userPasswordDto) {
        int ID = (Integer)request.getAttribute("userId");
        int result = mainService.modifyPassword(ID, userPasswordDto.getCurPassword(), userPasswordDto.getNewPassword());

        if (result != 0) {
            return ResponseEntity.ok("패스워드 변경 완료");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("패스워드 변경 오류");
    }

    @Operation (summary = "회원탈퇴")
    @DeleteMapping ("/profile")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        int ID = (Integer)request.getAttribute("userId");
        int result = mainService.deleteUser(ID);

        if (result != 0) {
            return ResponseEntity.ok("회원탈퇴 완료");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원탈퇴 오류");
    }

    @Operation (summary = "모든 사용자의 루틴 목록 조회", description = "모든 사용자의 루틴 목록을 조회합니다.")
    @GetMapping ("/all")
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

    @Operation (summary = "본인의 모든 루틴 목록 조회", description = "사용자의 모든 루틴 목록을 조회합니다.")
    @GetMapping ("/routines/all")
    public ResponseEntity<?> getAllRoutines(HttpServletRequest request) {
        int userId = (Integer)request.getAttribute("userId");

        List<RoutineDto> routines = workoutRoutineService.getAllRoutines(userId);
        if (routines.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 목록이 비어 있습니다");
        }
        List<RoutineSummaryDto> summaryRoutines = routines.stream()
                .map(r -> new RoutineSummaryDto(r.getId(), r.getTitle(), r.getDueDate(), r.isLike()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(summaryRoutines);
    }

    @Operation (summary = "본인의 최근 5개 루틴 목록 조회", description = "사용자의 최근 5개 루틴 목록을 조회합니다.")
    @GetMapping ("/routines")
    public ResponseEntity<?> getAllRoutinesLimit(HttpServletRequest request) {
        int userId = (Integer)request.getAttribute("userId");

        List<RoutineDto> routines = workoutRoutineService.getAllRoutinesLimit(userId);
        if (routines.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 목록이 비어 있습니다");
        }
        List<RoutineSummaryDto> summaryRoutines = routines.stream()
                .map(r -> new RoutineSummaryDto(r.getId(), r.getTitle(), r.getDueDate(), r.isLike()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(summaryRoutines);
    }
}