package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.exercise.model.RoutineDto;
import com.ssafy.back_end.exercise.service.WorkoutRoutineService;
import com.ssafy.back_end.sns.model.FeedDto;
import com.ssafy.back_end.sns.model.FeedInteractionDto;
import com.ssafy.back_end.sns.model.SnsRoutineDto;
import com.ssafy.back_end.sns.model.UserPageDto;
import com.ssafy.back_end.sns.service.SnsFeedServiceImpl;
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
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag (name = "SNS피드")
@RestController
@RequestMapping (value = "/api/sns/feed")
public class SnsFeedController {
    private static final Logger log = LoggerFactory.getLogger(SnsItemController.class);
    private final SnsFeedServiceImpl snsFeedService;
    private final WorkoutRoutineService workoutRoutineService;

    @Autowired
    public SnsFeedController(SnsFeedServiceImpl snsFeedService, WorkoutRoutineService workoutRoutineService) {
        this.snsFeedService = snsFeedService;
        this.workoutRoutineService = workoutRoutineService;
    }

    @Operation (summary = "전체or유저 피드 목록보기-완")
    @GetMapping ("/list")
    public ResponseEntity<?> getFeeds(HttpServletRequest request, @RequestParam (value = "user-id", defaultValue = "0") int userId,
                                      @RequestParam (value = "offset", defaultValue = "0") int offset,
                                      @RequestParam (value = "limit", defaultValue = "10") int limit) {
        int ID = (Integer)request.getAttribute("userId");
        List<FeedDto> feeds = snsFeedService.getFeeds(ID, userId, offset, limit);

        if (feeds != null) {
            if (feeds.isEmpty()) {
                return ResponseEntity.ok("피드 0개입니다");
            }
            return ResponseEntity.ok(feeds);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 조회 오류");
    }

    @Operation (summary = "오늘 내가 완료한 루틴 조회")
    @GetMapping ("/my-routine")
    public ResponseEntity<?> getMyRoutine(HttpServletRequest request) {
        int ID = (Integer)request.getAttribute("userId");

        SnsRoutineDto routine = snsFeedService.getMyRoutine(ID);   //유저아이디, 오늘날짜, 완료한 내 루틴의 아이디 조회 서비스

        if (routine != null) {
            return ResponseEntity.ok(routine);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("오늘 운동 안함");
    }

    @Operation (summary = "피드에서 루틴 자세히 보기")
    @GetMapping ("/{feedId}/routine")
    public ResponseEntity<?> getRoutine(@PathVariable int feedId) {

        SnsRoutineDto routine = snsFeedService.getRoutine(feedId);

        if (routine != null) {
            return ResponseEntity.ok(routine);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴 조회 실패");
    }

    @Operation (summary = "피드에서 루틴 저장하기")
    @PostMapping ("/{routineId}/routine")
    public ResponseEntity<?> saveRoutine(HttpServletRequest request, @PathVariable int routineId) {
        int ID = (Integer)request.getAttribute("userId");

        RoutineDto routine = workoutRoutineService.getRoutine(routineId);

        if (routine != null) {
            routine.setUserId(ID);
            LocalDateTime now = LocalDateTime.now();

            if (routine.getDueDate() != null && routine.getDueDate().isBefore(now.toLocalDate())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("루틴 마감일은 현재 날짜 이후로 설정해야 합니다.");
            }
            routine.setCreatedAt(Timestamp.valueOf(now));

            int result = workoutRoutineService.upsertRoutine(routine);

            if (result != 0) {
                return ResponseEntity.ok("루틴 저장 성공");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 저장 실패");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("루틴을 찾을 수 없습니다");
        }
    }

    @Operation (summary = "피드 글쓰기-완")
    @PostMapping ("/write")
    public ResponseEntity<?> writeFeed(HttpServletRequest request, @RequestPart("feed") FeedDto feedDto,
                                       @RequestPart ("image") MultipartFile image) {

        log.debug("[SnsFeedController] writeFeed - 시작");
        String imageUrl="";

        int ID = (Integer)request.getAttribute("userId");
        feedDto.setUserId(ID);

        snsFeedService.validateImages(1);

        log.debug("[SnsFeedController] feed 정보: {}", feedDto.toString());

//        int result = snsFeedService.writeFeed(feedDto);

        int feedId = snsFeedService.writeFeed(feedDto);
        log.debug("[SnsFeedController] feedId : {}", feedId);

        String uploadDir = "/home/ubuntu/images/feed/";
        File uploadDirectory = new File(uploadDir);

        // 디렉토리가 존재하지 않으면 생성
        if (!uploadDirectory.exists()) {
            log.debug("[SnsFeedController] 디렉토리 {} 가 존재하지 않음", uploadDirectory.getAbsolutePath());
            boolean isCreated = uploadDirectory.mkdirs();
            if (!isCreated) {
                log.debug("[SnsFeedController] 디렉토리 {} 생성 실패", uploadDirectory.getAbsolutePath());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("디렉토리 생성 실패");
            }
            else {
                log.debug("[SnsFeedController] 디렉토리 {} 생성 완료", uploadDirectory.getAbsolutePath());
            }
        }
        log.debug("[SnsFeedController] 디렉토리 {} 가 존재함", uploadDirectory.getAbsolutePath());


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
                String newFileName = ID + "-" + feedId + "-" + imageExtension;
                log.debug("[SnsFeedController] 새 파일 이름 생성: {}", newFileName);

                // 파일 저장
                image.transferTo(new File(uploadDir + newFileName));

                // 이미지 정보 DB에 저장
                imageUrl = uploadDir + newFileName;
                log.debug("[SnsFeedController] 이미지 저장 경로: {}", imageUrl);

                log.debug("[SnsFeedController] 이미지 업로드 성공: {}", newFileName);

            }
            catch (IOException e) {
                log.error("[SnsFeedController] 이미지 업로드 오류", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 오류");
            }
        }

        if (feedId > 0) {
            int result = snsFeedService.updateImage(feedId, imageUrl);
            snsFeedService.setUpload(feedDto.getRoutineId());

            if(result != 0) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "피드 작성 성공");
                response.put("itemID", feedId);
                log.debug("[SnsFeedController] 피드 작성 성공, feedId: {}", feedId);
                return ResponseEntity.ok(response);
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 작성 오류");
            }
        }
        log.debug("[SnsFeedController] 피드 작성 오류");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 작성 오류");
    }

    @Operation (summary = "피드 글수정-완")
    @PutMapping ("/{feedId}")
    public ResponseEntity<?> updateFeed(@PathVariable int feedId, @RequestBody FeedDto feedDto) {
        feedDto.setId(feedId);
        int result = snsFeedService.updateFeed(feedDto);

        if (result != 0) {
            return ResponseEntity.ok("피드 수정 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 수정 오류");
    }

    @Operation (summary = "피드 글삭제-완")
    @DeleteMapping ("/{feedId}")
    public ResponseEntity<?> deleteFeed(@PathVariable int feedId) {
        int result = snsFeedService.deleteFeed(feedId);

        if (result != 0) {
            return ResponseEntity.ok("피드 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 삭제 오류");
    }

    @Operation (summary = "피드 좋아요 목록보기-완")
    @GetMapping ("/{feedId}/like")
    public ResponseEntity<?> getListLikes(@PathVariable int feedId) {
        List<UserPageDto> likes = snsFeedService.getListLikes(feedId);

        if (likes != null) {
            if (likes.isEmpty()) {
                return ResponseEntity.ok("좋아요 0개입니다");
            }
            return ResponseEntity.ok(likes);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글 조회 오류");
    }

    @Operation (summary = "피드 좋아요-완")
    @PostMapping ("/{feedId}/like")
    public ResponseEntity<?> likeFeed(HttpServletRequest request, @PathVariable int feedId) {
        int ID = (Integer)request.getAttribute("userId");
        int isLike = snsFeedService.isLike(feedId, ID);

        if (isLike == 0) {   //좋아요 안눌려있음
            int result = snsFeedService.likeFeed(feedId, ID);
            if (result != 0) {
                return ResponseEntity.ok("좋아요성공");
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("좋아요 오류");
            }
        }
        else {
            return ResponseEntity.ok("이미 좋아요 되어 있음");
        }
    }

    @Operation (summary = "피드 좋아요 삭제-완")
    @DeleteMapping ("/{feedId}/like")
    public ResponseEntity<?> dislikeFeed(HttpServletRequest request, @PathVariable int feedId) {
        int ID = (Integer)request.getAttribute("userId");
        int isLike = snsFeedService.isLike(feedId, ID);

        if (isLike == 1) {   //좋아요 눌려있음
            int result = snsFeedService.dislikeFeed(feedId, ID);
            if (result != 0) {
                return ResponseEntity.ok("좋아요취소성공");
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("좋아요취소 오류");
            }
        }
        else {
            return ResponseEntity.ok("좋아요 안눌려 있음");
        }
    }

    @Operation (summary = "피드 댓글 목록보기-완")
    @GetMapping ("/{feedId}/comment")
    public ResponseEntity<?> getListComments(@PathVariable int feedId) {
        List<FeedInteractionDto> comments = snsFeedService.getListComments(feedId);

        if (comments != null) {
            if (comments.isEmpty()) {
                return ResponseEntity.ok("댓글 0개입니다");
            }
            return ResponseEntity.ok(comments);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글 조회 오류");
    }

    @Operation (summary = "피드 댓글 쓰기-완")
    @PostMapping ("/{feedId}/comment")
    public ResponseEntity<?> writeComment(HttpServletRequest request, @PathVariable int feedId, @RequestBody FeedInteractionDto feedInteractionDto) {
        int ID = (Integer)request.getAttribute("userId");
        feedInteractionDto.setUserId(ID);
        feedInteractionDto.setFeedId(feedId);
        int result = snsFeedService.writeComment(feedInteractionDto);

        if (result != 0) {
            return ResponseEntity.ok("댓글 작성 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글 작성 오류");
    }

    @Operation (summary = "피드 댓글 수정-완")
    @PutMapping ("/comment/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable int commentId, @RequestBody FeedInteractionDto feedInteractionDto) {
        feedInteractionDto.setId(commentId);
        int result = snsFeedService.updateComment(feedInteractionDto);

        if (result != 0) {
            return ResponseEntity.ok("댓글 수정 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글 수정 오류");
    }

    @Operation (summary = "피드 댓글 삭제-완")
    @DeleteMapping ("/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable int commentId) {
        int result = snsFeedService.deleteComment(commentId);

        if (result != 0) {
            return ResponseEntity.ok("댓글 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글 삭제 오류");
    }
}
