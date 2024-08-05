package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.model.UserPageDto;
import com.ssafy.back_end.sns.model.UserPageListDto;
import com.ssafy.back_end.sns.service.SnsSocialServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag (name = "SNS소셜")
@RestController
@RequestMapping (value = "/api/sns/social")
public class SnsSocialController {
    private final SnsSocialServiceImpl snsSocialService;

    @Autowired
    public SnsSocialController(SnsSocialServiceImpl snsSocialService) {
        this.snsSocialService = snsSocialService;
    }

    @Operation (summary = "유저페이지-완")
    @GetMapping ("/user-page/info")
    public ResponseEntity<?> getUserPageInfo(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        UserPageDto userInfo = snsSocialService.getUserPageInfo(userId);
        if (userInfo != null) {
            return ResponseEntity.ok(userInfo);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저페이지 조회 오류");
    }

    @Operation (summary = "유저 피드 간략히보기-완")
    @GetMapping ("/user-page/feeds")
    public ResponseEntity<?> getUserPageFeeds(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        List<UserPageListDto> feedList = snsSocialService.getUserPageFeeds(userId);

        if (feedList != null) {
            if (feedList.isEmpty()) {
                return ResponseEntity.ok("피드 0개입니다");
            }
            return ResponseEntity.ok(feedList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 조회 오류");
    }

    @Operation (summary = "유저 중고장터 간략히보기-완")
    @GetMapping ("/user-page/items")
    public ResponseEntity<?> getUserPageItems(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        List<UserPageListDto> itemList = snsSocialService.getUserPageItems(userId);

        if (itemList != null) {
            if (itemList.isEmpty()) {
                return ResponseEntity.ok("중고거래 0개입니다");
            }
            return ResponseEntity.ok(itemList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("중고거래 조회 오류");
    }

    @Operation (summary = "유저 팔로워 목록보기-완")
    @GetMapping ("/user-page/followers")
    public ResponseEntity<?> getUserPageFollowers(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        List<UserPageDto> follwerList = snsSocialService.getUserPageFollowers(userId);

        if (follwerList != null) {
            if (follwerList.isEmpty()) {
                return ResponseEntity.ok("팔로워 0명 입니다");
            }
            return ResponseEntity.ok(follwerList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("팔로워 조회 오류");
    }

    @Operation (summary = "유저 팔로잉 목록보기-완")
    @GetMapping ("/user-page/followings")
    public ResponseEntity<?> getUserPageFollowings(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        List<UserPageDto> follwingList = snsSocialService.getUserPageFollowings(userId);

        if (follwingList != null) {
            if (follwingList.isEmpty()) {
                return ResponseEntity.ok("팔로잉 0명 입니다");
            }
            return ResponseEntity.ok(follwingList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("팔로잉 조회 오류");
    }

    @Operation (summary = "팔로우-완")
    @PostMapping ("/follow")
    public ResponseEntity<?> follow(@RequestHeader ("ID") int ID, @RequestBody int targetId) {
        if(ID == targetId) {
            return ResponseEntity.ok("본인입니다.");
        }

        int isFollowing = snsSocialService.isFollowing(ID, targetId);

        if (isFollowing == 0) {   //팔로우 안되어 있음
            int result = snsSocialService.follow(ID, targetId);
            if (result != 0) {
                return ResponseEntity.ok("팔로우성공");
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("팔로우 오류");
            }
        }
        else {
            return ResponseEntity.ok("이미 팔로우 되어 있음");
        }
    }

    @Operation (summary = "팔로우 삭제-완")
    @DeleteMapping ("/follow")
    public ResponseEntity<?> unfollow(@RequestHeader ("ID") int ID, @RequestBody int targetId) {
        if(ID == targetId) {
            return ResponseEntity.ok("본인입니다.");
        }

        int isFollowing = snsSocialService.isFollowing(ID, targetId);

        if (isFollowing == 1) {   //팔로우 되어 있음
            int result = snsSocialService.unfollow(ID, targetId);
            if (result != 0) {
                return ResponseEntity.ok("팔로우취소성공");
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("팔로우취소 오류");
            }
        }
        else {
            return ResponseEntity.ok("팔로우 안되어 있음");
        }
    }
}