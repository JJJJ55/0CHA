package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.service.SnsSocialServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/sns/social")
public class SnsSocialController {
    private final SnsSocialServiceImpl snsSocialService;

    @Autowired
    public SnsSocialController(SnsSocialServiceImpl snsSocialService) {
        this.snsSocialService = snsSocialService;
    }
    getMypage
            getMyFeeds
    getMyItems
            getFollowers
    getFollowings
            follow
    unfollow



    @GetMapping("/mypage/info")
    public ResponseEntity<?> getMypage(@RequestHeader("Authorization") String token) {

    }

    @GetMapping("/mypage/feeds")
    public ResponseEntity<?> getMyFeeds(@RequestHeader("Authorization") String token) {
    }

    @GetMapping("/mypage/items")
    public ResponseEntity<?> getMyItems(@RequestHeader("Authorization") String token) {

    }

    @GetMapping("/followers")
    public ResponseEntity<?> getFollowers(@RequestHeader("Authorization") String token) {

    }

    @GetMapping("/followings")
    public ResponseEntity<?> getFollowings(@RequestHeader("Authorization") String token) {

    }

    @PostMapping("/follow")
    public ResponseEntity<?> follow(@RequestHeader("Authorization") String token, @RequestBody int targetId) {

    }

    @DeleteMapping("/follow")
    public ResponseEntity<?> unfollow(@RequestHeader("Authorization") String token, @RequestBody int targetId) {

    }

}

