package com.ssafy.back_end.sns.controller;

import com.ssafy.back_end.sns.model.FeedDto;
import com.ssafy.back_end.sns.model.FeedInteractionDto;
import com.ssafy.back_end.sns.model.UserPageDto;
import com.ssafy.back_end.sns.service.SnsFeedServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping (value = "/api/sns/feed")
public class SnsFeedController {
    private final SnsFeedServiceImpl snsFeedService;

    @Autowired
    public SnsFeedController(SnsFeedServiceImpl snsFeedService) {
        this.snsFeedService = snsFeedService;
    }

    @GetMapping ("/")
    public ResponseEntity<?> getFeeds(@RequestParam ("user_id") int userId) {
        List<FeedDto> feeds = snsFeedService.getFeeds(userId);

        if (feeds != null) {
            if (feeds.isEmpty()) {
                return ResponseEntity.ok("피드 0개입니다");
            }
            return ResponseEntity.ok(feeds);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 조회 오류");
    }

    @PostMapping ("/")
    public ResponseEntity<?> writeFeed(@RequestBody FeedDto feedDto) {
        int result = snsFeedService.writeFeed(feedDto);

        if (result != 0) {
            return ResponseEntity.ok("피드 작성 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 작성 오류");
    }

    @PutMapping ("/{feedId}")
    public ResponseEntity<?> updateFeed(@PathVariable int feedId, @RequestBody FeedDto feedDto) {
        feedDto.setId(feedId);
        int result = snsFeedService.updateFeed(feedDto);

        if (result != 0) {
            return ResponseEntity.ok("피드 수정 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 수정 오류");
    }

    @DeleteMapping ("/{feedId}")
    public ResponseEntity<?> deleteFeed(@PathVariable int feedId) {
        int result = snsFeedService.deleteFeed(feedId);

        if (result != 0) {
            return ResponseEntity.ok("피드 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("피드 삭제 오류");
    }

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

    @PostMapping ("/{feedId}/like")
    public ResponseEntity<?> likeFeed(@PathVariable int feedId, @RequestParam int userId) {
        int isLike = snsFeedService.isLike(feedId, userId);

        if (isLike == 0) {   //좋아요 안눌려있음
            int result = snsFeedService.likeFeed(feedId, userId);
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

    @DeleteMapping ("/{feedId}/like")
    public ResponseEntity<?> dislikeFeed(@PathVariable int feedId, @RequestParam int userId) {
        int isLike = snsFeedService.isLike(feedId, userId);

        if (isLike == 1) {   //좋아요 눌려있음
            int result = snsFeedService.dislikeFeed(feedId, userId);
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

    @PostMapping ("/{feedId}/comment")
    public ResponseEntity<?> writeComment(@PathVariable int feedId, @RequestBody FeedInteractionDto feedInteractionDto) {
        feedInteractionDto.setFeedId(feedId);
        int result = snsFeedService.writeComment(feedInteractionDto);

        if (result != 0) {
            return ResponseEntity.ok("댓글 작성 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글 작성 오류");
    }

    @PutMapping ("/comment/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable int commentId, @RequestBody FeedInteractionDto feedInteractionDto) {
        feedInteractionDto.setId(commentId);
        int result = snsFeedService.updateComment(feedInteractionDto);

        if (result != 0) {
            return ResponseEntity.ok("댓글 수정 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글 수정 오류");
    }

    @DeleteMapping ("/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable int commentId) {
        int result = snsFeedService.deleteComment(commentId);

        if (result != 0) {
            return ResponseEntity.ok("댓글 삭제 성공");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("댓글 삭제 오류");
    }
}
