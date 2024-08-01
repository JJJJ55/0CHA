package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.model.UserPageDto;
import com.ssafy.back_end.sns.model.UserPageListDto;
import com.ssafy.back_end.sns.service.SnsSocialServiceImpl;
import com.ssafy.back_end.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping (value = "/api/sns/social")
public class SnsSocialController {
    private final SnsSocialServiceImpl snsSocialService;
    private final JwtUtil jwtUtil;

    @Autowired
    public SnsSocialController(SnsSocialServiceImpl snsSocialService, JwtUtil jwtUtil) {
        this.snsSocialService = snsSocialService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping ("/user-page/info")
    public ResponseEntity<?> getUserPageInfo(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        UserPageDto userInfo = snsSocialService.getUserPageInfo(userId);
        if (userInfo == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping ("/user-page/feeds")
    public ResponseEntity<?> getUserPageFeeds(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        List<UserPageListDto> feedList = snsSocialService.getUserPageFeeds(userId);
        return ResponseEntity.ok(feedList);
    }

    @GetMapping ("/user-page/items")
    public ResponseEntity<?> getUserPageItems(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        List<UserPageListDto> itemList = snsSocialService.getUserPageItems(userId);
        return ResponseEntity.ok(itemList);
    }

    @GetMapping ("/user-page/followers")
    public ResponseEntity<?> getUserPageFollowers(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        List<UserPageDto> follwerList = snsSocialService.getUserPageFollowers(userId);
        return ResponseEntity.ok(follwerList);
    }

    @GetMapping ("/user-page/followings")
    public ResponseEntity<?> getUserPageFollowings(@RequestHeader ("ID") int ID, @RequestParam ("user_id") int userId) {
        List<UserPageDto> follwingList = snsSocialService.getUserPageFollowings(userId);
        return ResponseEntity.ok(follwingList);
    }

    @PostMapping ("/follow")
    public ResponseEntity<?> follow(@RequestHeader ("ID") int ID, @RequestBody int targetId) {
        int isFollowing = snsSocialService.isFollowing(ID, targetId);

        if (isFollowing == 0) {   //팔로우 안되어 있음
            snsSocialService.follow(ID, targetId);
            return ResponseEntity.ok("팔로우성공");
        }
        else {
            return ResponseEntity.ok("이미 팔로우 되어 있음");
        }
    }

    @DeleteMapping ("/follow")
    public ResponseEntity<?> unfollow(@RequestHeader ("ID") int ID, @RequestBody int targetId) {
        int isFollowing = snsSocialService.isFollowing(ID, targetId);

        if (isFollowing == 1) {   //팔로우 되어 있음
            snsSocialService.unfollow(ID, targetId);
            return ResponseEntity.ok("팔로우취소 성공");
        }
        else {
            return ResponseEntity.ok("팔로우 안되어 있음");
        }
    }
}